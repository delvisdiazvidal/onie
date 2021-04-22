import { Request, Response } from 'express';
import pool from '../config/database';
import * as jwt from "jsonwebtoken";
import { jwtSecret } from "../config/env";
import { HISTORY_PASS } from '../config/env'
import errorMessage from '../config/errors';
import { IError } from '../models/errorModel';
import { sqlHelper } from '../helpers/sqlHelper';
import { Table, View } from '../helpers/tableHelper';

import { User, ILogInUser, IUserRole, IUserData } from '../models/userModel';
import { UserData } from './../models/userModel';
import { sharedService } from '../services/sharedService';
import { userTable } from './../helpers/tableHelper';

class AuthController{

    public async login(req: Request, res: Response): Promise<any>{
        let logIn: ILogInUser = req.body.logInValue;

        const logInCheck = (logIn: ILogInUser) =>
            new Promise<void>((resolve, reject) => {
                if (!(logIn.username && logIn.password)) {
                    const error: IError = { body: 'PASSWORD_NOT_FOUND', status: 400, message: 'La contraseña es necesaria.'};
                    reject(error); 
                }
                resolve(); 
            });

        const usernameCheck = (username: string) =>
            new Promise<any>((resolve, reject) => {
                username = username.toLowerCase();
                pool.query('SELECT * FROM ?? WHERE username = ?', [Table.userTable, username],
                (err: any, rows: any) => {
                    if (err) {
                        const error: IError = { body: err, status: 500, message: errorMessage(err) };
                        reject(error); }
                    if (rows && rows.length < 1) {
                        const error: IError = { body: 'USER_NOT_FOUND', status: 404, message: 'Usuario inexistente.'}; 
                        reject(error); } 
                    resolve(rows); 
                });
            });

        const enableUser = (booleanResult: boolean | any) =>
            new Promise<void>((resolve, reject) => {
                if (!booleanResult) {
                    const error: IError = { body: 'USER_DISABLE', status: 401, message: 'Su Usuario está Deshabilitado. Póngase en contacto con el administrador.'}; 
                    reject(error);
                } else resolve();
            });

        const passwordCheck = (booleanResult: boolean) =>
            new Promise<void>((resolve, reject) => {
                if (!booleanResult) {
                    const error: IError = { body: 'INCORRECT_PASSWORD', status: 400, message: 'Contraseña Incorrecta.'}; 
                    reject(error);
                } else resolve();
            }); 

        const expiredPasswordCheck = (expiredAt: Date | any) =>
            new Promise<void>((resolve, reject) => {
                if (expiredAt) {
                    const currentDate = new Date(Date.now());
                    const passExpired = new Date(expiredAt);
                    if (currentDate > passExpired) {
                        const error: IError = { body: 'PASSWORD_EXPIRED', status: 403, message: 'Su Contraseña ha Expirado. Póngase en contacto con el administrador.'}; 
                        reject(error);
                    } else resolve();
                } else resolve();
            }); 

        const createToken = (user: User) =>
            new Promise<any>((resolve, reject) => {
                const jwToken = jwt.sign(
                    {   userCode: user.userCode, username: user.username }, 
                        jwtSecret, 
                    {   expiresIn: "1h" }
                  );
                  user.userToken = jwToken;
                  resolve(user);
            });

        try {
            await logInCheck(logIn);
            const [userResult] = await usernameCheck(logIn.username);
            const userData = new UserData(userResult);
            const [userRol] = await sqlHelper.selectBy<IUserRole>(Table.userRoleTable, userTable.userCode, Number(userData.userCode));
            if (userRol.roleCode !== 50) {
                await enableUser(userData.enableUser);
                await expiredPasswordCheck(userData.expiredAt);
            }
            const booleanResult = await userData.checkIfUnencryptedPasswordIsValid(logIn.password);
            await passwordCheck(booleanResult);
            const user = await sharedService.getPersonData(userResult.userCode);
            await createToken(user);
            const completeName = user.firstName +' '+ user.lastName;
            res.status(200).header("authjwtoken", user.userToken).json({ result: user, err: null, message: ':: Usuario ' + completeName + ' Logeado Correctamente.' });
         } catch (err) {
            res.status(err.status).json({ result: false, err: err, message: err.message });
         }

    }

    public async isValidPassword(req: Request, res: Response): Promise<any>{
        const username = res.locals.jwtPayload.username;
        const password: string = req.params.password;

        const logInCheck = (username: string, password: string) =>
            new Promise<void>((resolve, reject) => {
                if (!(username && password)) {
                    reject(false); 
                }
                resolve(); 
            });
        
        const usernameCheck = (username: string) =>
            new Promise<any>((resolve, reject) => {
                pool.query('SELECT * FROM ?? WHERE username = ?', [Table.userTable, username],
                (err: any, rows: any) => {
                    if (err) {
                        reject(false); }
                    if (rows && rows.length < 1) {
                        reject(false); } 
                    resolve(rows); 
                });
            });

        const passwordCheck = (booleanResult: boolean) =>
            new Promise<void>((resolve, reject) => {
                if (!booleanResult) {
                    reject(false);
                } else resolve();
            }); 


        try {
            await logInCheck(username, password);
            const [userResult] = await usernameCheck(username);
            const userData = new UserData(userResult);
            const booleanResult = await userData.checkIfUnencryptedPasswordIsValid(password);
            await passwordCheck(booleanResult);
            res.json(booleanResult);
         } catch (err) {
            res.json(err);
         }

    }

    public async isUsedPassword(req: Request, res: Response): Promise<any>{
        const username = res.locals.jwtPayload.username;
        const password: string = req.params.password;

        const logInCheck = (username: string, password: string) =>
            new Promise<void>((resolve, reject) => {
                if (!(username && password)) {
                    reject(false); 
                }
                resolve(); 
            });
        try {
            await logInCheck(username, password);
            const [userResult] = await sqlHelper.selectBy<any>(Table.userTable, 'username', username);
            const passResult = (await sqlHelper.selectBy<any>(View.oldPassView, 'userCode', userResult.userCode))
                                                    .map((a: any) => {
                                                        const newUser = {
                                                            userCode: a.userCode,
                                                            username: userResult.username,
                                                            password: a.oldPassword,
                                                        }
                                                        return a = new UserData(newUser); });
            let validPass: any = '';
            for (let index = 0; index < HISTORY_PASS; index++) {
                const element = passResult[index];
                console.log(element);
                
                if(await element.checkIfUnencryptedPasswordIsValid(password) === true) {
                    validPass = element;
                }
            }  
            const result = validPass ? true : false; 
            res.json(result);
         } catch (err) {
            res.json(false);
         }

    }

    public async disabledUser(req: Request, res: Response)  {
        const username = req.body.username;
        pool.beginTransaction(async (err: any) => {
            if (err) { throw err; }
            const disableUser = (user: IUserData) =>
                new Promise<void>(async (resolve, reject) => { 
                    await sqlHelper.update<any>(Table.userTable, userTable.userCode, Number(user.userCode), { enableUser: false });
                    resolve();
                });

            try {
                const [user] = await sqlHelper.selectBy<IUserData>(Table.userTable, 'username', username);
                await disableUser(user);
                pool.commit(() => {
                    res.status(200).json({ result: user, err: false, message: 'Alcanzó el límite de intentos. Su cuenta ha sido Deshabilitada. Póngase en contacto con su administrador.' });
                });

            } catch (err) {
                pool.rollback(() => {
                    res.status(500).json({ result: false, err: true, message: err });
                });
            }
        });
    }
};
    
export const authController = new AuthController();