import pool from '../config/database';
import { IError } from 'models/errorModel';
import errorMessage from '../config/errors';

class SQLHelper {

    public async selectAll<TResult>(table: string): Promise<TResult[]> {
        const result = new Promise<TResult[]>((resolve, reject) => {
            pool.query("SELECT * FROM ??", [table],
            (err: any, rows: any) => {
                if (err) {
                    
                    const error: IError = { body: err, status: 500, message: errorMessage(err)};
                    reject(error); 
                }
                resolve(rows as TResult[]); 
            });
        });
        return result;
    }

    public async selectBy<TResult>(table: string, key: string, param: number | string): Promise<TResult[]> {
        const result = new Promise<TResult[]>((resolve, reject) => {
            pool.query(`SELECT * FROM ${table} WHERE ${key} = ?`, [param],
            (err: any, rows: any) => {
                if (err) {
                    const error: IError = { body: err, status: 500, message: errorMessage(err)};
                    reject(error);} 
                if (rows && rows.length < 1) {
                    const error: IError = { body: rows, status: 404, message: 'El item no existe.'};
                    reject(error); } 
                resolve(rows as TResult[]); 
            });
        });
        return result;
    }

    public async filterBy<TResult>(table: string, key: string, param: number | string): Promise<TResult[]> {
        const result = new Promise<TResult[]>((resolve, reject) => {
            
            pool.query(`SELECT * FROM ${table} WHERE ${key} = ?`, [param],
            (err: any, rows: any) => {
                if (err) {
                    const error: IError = { body: err, status: 500, message: errorMessage(err)};
                    reject(error);} 
                resolve(rows as TResult[]); 
            });
        });
        return result;
    }


    public async selectLastBy<TResult>(table: string, key: string, param: number | string): Promise<TResult> {
        const result = new Promise<TResult>((resolve, reject) => {
            pool.query(`SELECT * FROM ${table} WHERE ${key} = ?`, [param],
            (err: any, rows: any) => {
                if (err) {
                    const error: IError = { body: err, status: 500, message: errorMessage(err)};
                    reject(error);} 
                if (rows && rows.length < 1) {
                    const error: IError = { body: param, status: 404, message: 'No se pudo obtener la última entrada.'};
                    reject(error); } 
                rows as TResult[];
                resolve(rows.pop());
            });
        });
        return result;
    }

    public async create<TResult>(table: string, param: TResult): Promise<TResult> {
        const result = new Promise<TResult>((resolve, reject) => {
            pool.query(`INSERT INTO ?? set ? `, [table, param],
            (err: any, rows: any) => {
                if (err) {
                    const error: IError = { body: err, status: 500, message: errorMessage(err)};
                    reject(error); }
                resolve(rows as TResult);
            });
        });
        return result;
    }

    public async update<TResult>(table: string, key: string, param: number | string, newItem: TResult): Promise<TResult> {
        const result = new Promise<TResult>((resolve, reject) => {
            pool.query(`SELECT * FROM ${table} WHERE ${key} = ?`, [param],
            (err: any, rows: any) => {
                if (err) {
                    const error: IError = { body: err, status: 500, message: errorMessage(err)};
                    reject(error); }
                if (rows && rows.length < 1) {
                    const err: IError = { body: rows, status: 400, message: 'Item inexiste. No se pudo actualizar.'};
                    reject(err); }
                    pool.query(`UPDATE ${table} set ? WHERE ${key} = ?`, [newItem, param],
                    (err: any) => {
                        if (err) {
                            const error: IError = { body: err, status: 500, message: errorMessage(err)};
                            reject(error); }
                        resolve(newItem as TResult);
                    });
            });
        });
        return result;
    }

}

export const sqlHelper = new SQLHelper();