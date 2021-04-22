import { Request, Response, NextFunction } from "express";
import pool from "../config/database";
import roles from '../models/rolesModel';

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userCode = res.locals.jwtPayload.userCode;
  pool.query('SELECT * FROM user_view WHERE userCode = ? AND roleShort = ?', [userCode, roles.ADMIN], (err: any, rows: any) => {
    if ( err ) res.status(500).json({ err, message: "Ha ocurrido un error en su petición" });
    if( rows.length > 0) {
      if (rows[0].roleShort !== roles.ADMIN) {
        res.locals.jwtPayload.userProvince = rows[0].personProvince;
      }
      next(); }
    else res.status(403).json({ err, message: "El usuario no posee los privilegios necesarios para realizar esta acción." });
  }); 
}


export const isUserOrAdvanced = async (req: Request, res: Response, next: NextFunction) => {
  const userCode = res.locals.jwtPayload.userCode;
  pool.query('SELECT * FROM user_view WHERE userCode = ? AND (roleShort = ? OR roleShort = ? OR roleShort = ?)', [userCode, roles.ADMIN, roles.ADVANCED, roles.USER], (err: any, rows: any) => {
    if ( err ) res.status(500).json({ err, message: "Ha ocurrido un error en su petición" });
    if( rows.length > 0) {
      if (rows[0].roleShort !== roles.ADMIN) {
        res.locals.jwtPayload.userProvince = rows[0].personProvince;
      }
      next(); }
    else res.status(403).json({ err, message: "El usuario no posee los privilegios necesarios para realizar esta acción." });
  });
}

export const isUser = async (req: Request, res: Response, next: NextFunction) => {
  const userCode = res.locals.jwtPayload.userCode;
  pool.query('SELECT * FROM user_view WHERE userCode = ? AND (roleShort = ? OR roleShort = ?)', [userCode, roles.ADMIN, roles.USER], (err: any, rows: any) => {
    if ( err ) res.status(500).json({ err, message: "Ha ocurrido un error en su petición" });
    if( rows.length > 0) {
      if (rows[0].roleShort !== roles.ADMIN) {
        res.locals.jwtPayload.userProvince = rows[0].personProvince;
      }
      next(); }
    else res.status(403).json({ err, message: "El usuario no posee los privilegios necesarios para realizar esta acción." });
  });
}


