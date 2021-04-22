import pool from '../config/database';
import * as bcrypt from "bcryptjs";
import { IResponse } from './../models/responseModel';
import { sqlHelper } from '../helpers/sqlHelper';
import { IError } from '../models/errorModel';
import { sharedService } from '../services/sharedService';
import { Request, Response } from 'express';
import { EXPIRED_PASS, jwtSecret } from '../config/env';
import * as jwt from "jsonwebtoken";
import { UserData, IUserData, IUser, IPersonData, IUserPerson, IUserRole, UpdateUser, User} from '../models/userModel';
import { Table, userTable, personTable, View } from '../helpers/tableHelper';


class UserController{

    public async read(req: Request, res: Response): Promise<void>{

        const response: IResponse = { result: null, err: null, message: null};
        try {
            const resultUser: IUserData[] = await sqlHelper.selectAll<IUserData>(Table.userTable);
            const result: IUser[] = [];
            for (let index = 0; index < resultUser.length; index++) {
                const element: IUserData = resultUser[index];
                const personData = await sharedService.getPersonData(element.userCode);
                result.push(personData);
            } 
            response.result = result;
            res.status(200).json(response);
        } catch (err) {
            response.message = err;
            res.status(500).json(response);
        }
    }

    public async item(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const response: IResponse = { result: null, err: null, message: null};
        try {
            const [result]: IUserData[] = await sqlHelper.selectBy<IUserData>(Table.userTable, userTable.userCode, id);
            response.result = result;
            res.status(200).json(response);
        } catch (err) {
            response.err = err;
            response.message = err.message;
            res.status(500).json(response);
        }
    } 


  /**
   * @summary Chequea que el usuario no esté en uso
   * @param req 
   * @param res 
   * @return  res boolean => true: válido | false = inválido
   */
  public async isUsedUser(req: Request, res: Response): Promise<any>{
        const username: string = req.params.username;
        const logInCheck = (username: string) =>
            new Promise<void>((resolve, reject) => {
                if (!username) {
                    console.log('No user');
                    
                    reject(false); 
                }
                resolve(); 
            });
        
        const usernameCheck = (username: string) =>
            new Promise<boolean>((resolve, reject) => {
                pool.query('SELECT * FROM ?? WHERE username = ?', [Table.userTable, username],
                (err: any, rows: any) => {
                    if (err) {
                        console.log(err);
                        reject(false); }
                    if (rows && rows.length < 1) {
                        console.log(rows);
                        reject(false); } 
                    resolve(true); 
                });
            });

        try {
            await logInCheck(username);
            await usernameCheck(username);
            res.json(true);
         } catch (err) {
            res.json(err);
         }

    }

    public async create(req: Request, res: Response)  {
        const user: IUserPerson = req.body.addValue;

        pool.beginTransaction(async (err: any) => {
            if (err) { throw err; }

            const usernameCheck = (username: string) =>
                new Promise<void>((resolve, reject) => {
                    pool.query('SELECT * FROM ?? WHERE username = ?', [Table.userTable, username],
                    (err: any, rows: any) => {
                        if (err) reject(err.message); 
                        if (rows && rows.length > 0) {
                            const error: IError = { body: rows, status: 406, message: 'El Usuario esta en Uso.'};
                            reject(error); } 
                        resolve(); 
                    });
                });
    
            const passwordCheck = () =>
                new Promise<void>((resolve, reject) => {
                    if (!(user.password)) {
                        const error: IError = { body: null, status: 406, message: 'La contraseña es necesaria.'};
                        reject(error); }
                    resolve(); 
                });

            const personInsert = () =>
                new Promise<any>(async (resolve, reject) => { 
                    const personData = { 
                        firstName: user.firstName,
                        lastname: user.lastName,
                        personCI: user.personCI,
                        personDir: user.personDir,
                        personMunicipalite: user.personMunicipalite,
                        personProvince: user.personProvince,
                        personEmail: user.personEmail,
                        personPhone: user.personPhone,
                    };
                    const resultPerson: any = await sqlHelper.create<any>(Table.personTable, personData);
                    resolve(resultPerson.insertId);
                });

            const userInsert = (userCode: any) =>
                new Promise<IUserData>(async (resolve, reject) => { 
                    const currentDate = new Date(Date.now());
                    const expiredAt = new Date();
                    expiredAt.setDate(currentDate.getDate() + EXPIRED_PASS);
                    const userData: IUserData = { 
                        userCode: userCode, 
                        username: user.username, 
                        password: user.password,
                        expiredAt: expiredAt,
                        enableUser: true
                    };
                    const userResult = new UserData(userData);
                    await userResult.hashPassword();
                    await sqlHelper.create<IUserData>(Table.userTable, userResult);
                    resolve(userResult);
                });

            const insertOldPassword = (newUser: IUserData) =>
                new Promise<void>(async (resolve, reject) => { 
                    const userData = { 
                        userCode: newUser.userCode, 
                        oldPassword: newUser.password
                    };
                    await sqlHelper.create<any>(Table.passTable, userData);
                    resolve();
                });

            const roleInsert = (userCode: any) =>
                new Promise<void>(async (resolve, reject) => { 
                    const userRole: IUserRole = { 
                        userCode: userCode, 
                        roleCode: user.roleCode, 
                    };
                    await sqlHelper.create<any>(Table.userRoleTable, userRole);
                    resolve();
                });

            try {
                await usernameCheck(user.username);
                await passwordCheck();
                const userCode = await personInsert();
                const userData = await userInsert(userCode);
                await insertOldPassword(userData);
                await roleInsert(userCode);
                pool.commit(() => {
                    res.status(200).json({ result: user, err: false, message: 'Usuario Creado Correctamente.' });
                });
            } catch (err) {
                pool.rollback(() => {
                    res.status(err.status).json({ result: false, err: err, message: err.message });
                });
            } 
        });
    }

    public async changePassword(req: Request, res: Response)  {
        const updateUser: IUserData = req.body.passValue;

        pool.beginTransaction(async (err: any) => {
            if (err) { throw err; }

            const passwordCheck = () =>
                new Promise<void>((resolve, reject) => {
                    if (!(updateUser.password)) reject('La contraseña es necesaria.'); 
                    resolve(); 
                });

            const passwordUpdate = (user: IUserData) =>
                new Promise<void>(async (resolve, reject) => { 
                    const passDate = new Date(Date.now());
                    const passExpired = new Date();
                    passExpired.setDate(passDate.getDate() + EXPIRED_PASS);

                    const updateUser: UpdateUser = {
                        userCode: Number(user.userCode),
                        username: user.username,
                        password: user.password,
                        modifyAt: passDate,
                        expiredAt: passExpired,
                    };
                    await sqlHelper.update<UpdateUser>(Table.userTable, userTable.userCode, Number(user.userCode), updateUser);
                    resolve();
                });

            const insertOldPassword = (user: IUserData) =>
                new Promise<void>(async (resolve, reject) => { 
                    const userData = { 
                        userCode: user.userCode, 
                        oldPassword: user.password
                    };
                    await sqlHelper.create<any>(Table.passTable, userData);
                    resolve();
                });

            try {
                await sqlHelper.selectBy<any>(Table.userTable, 'username', updateUser.username);
                await passwordCheck();
                const salt = await bcrypt.genSalt(10);
                updateUser.password = bcrypt.hashSync(updateUser.password, salt);
                
                await passwordUpdate(updateUser);
                await insertOldPassword(updateUser);
                pool.commit(() => {
                    res.status(200).json({ result: updateUser, err: false, message: 'Contraseña Actualizada Correctamente.' });
                });
                
            } catch (err) {
                pool.rollback(() => {
                    res.status(500).json({ result: false, err: true, message: err });
                });
            }
        });
    }

    public async profile(req: Request, res: Response): Promise<void> {
        let { id } = req.params;
        const newData: IPersonData = req.body.editValue;

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
            await sqlHelper.update<IPersonData>(Table.personTable, personTable.personCode, id, newData);
            const user = await sharedService.getPersonData(id);
            await createToken(user);
            res.status(200).json({result: user, err: null, message: ':: Has Editado tu Perfil Correctamente' });
        } catch (err) {
            res.status(500).json({ result: null, err: err, message: "No se pudo actualizar el Perfil." });
        } 
    }

    public async update(req: Request, res: Response): Promise<void> {
        let { id } = req.params;
        const newData: IUser = req.body.editValue;
        
        const personUpdate = () =>
            new Promise<void>((resolve, reject) => { 
                const personData = { 
                    personCode: id,
                    firstName: newData.firstName,
                    lastname: newData.lastName,
                    personCI: newData.personCI,
                    personDir: newData.personDir,
                    personMunicipalite: newData.personMunicipalite.municipaliteCode,
                    personProvince: newData.personProvince.provinceCode,
                    personEmail: newData.personEmail,
                    personPhone: newData.personPhone
                };
                pool.query('UPDATE ?? set ? WHERE personCode = ?', [Table.personTable, personData, id], (err: any) => {
                    if (err) reject(err.message); 
                    resolve();
                });
            });

        const roleUpdate = () =>
            new Promise<void>((resolve, reject) => { 
                const userRole = { 
                    userCode: id, 
                    roleCode: newData.userRol.roleCode, 
                };
                pool.query(`UPDATE ?? set ? WHERE userCode = ?`, [Table.userRoleTable, userRole, id], (err: any) => {
                    if (err) reject(err.message); 
                    resolve(); 
                });
            });


        try {
            await personUpdate();
            await roleUpdate();
            const [result]: IUser[] = await sqlHelper.selectBy<IUser>(View.userView, userTable.userCode, id);
            res.status(200).json({result: result, err: null, message: ':: Has Editado el Perfil Correctamente' });
        } catch (err) {
            res.status(500).json({ result: null, err: err, message: "No se pudo actualizar el Perfil." });
        } 
    }
};
    
export const userController = new UserController();