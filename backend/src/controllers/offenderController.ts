import { Request, Response } from 'express';

import { IResponse } from 'models/responseModel';
import { penaltyTable, Table, View } from '../helpers/tableHelper';
import { sqlHelper } from '../helpers/sqlHelper';
import { IPenalty, IPenaltyList, IOffender } from 'models/penaltyModel';

class OffenderController {

    public async read(req: Request, res: Response): Promise<void>{
        
        const response: IResponse = { result: null, err: null, message: null};
        try {
            const result: any[] = await sqlHelper.selectAll<any>(View.penaltyView);
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
            const [result]: any = await sqlHelper.selectBy<any>(View.penaltyView, penaltyTable.penaltyCode, id);
            response.result = result;
            res.status(200).json(response);
        } catch (err) {
            response.err = err;
            response.message = err.message;
            res.status(500).json(response);
        }
    } 

    public async getOffenderByCI(req: Request, res: Response): Promise<any> {
        const { personCI } = req.params;
        const response: IResponse = { result: null, err: null, message: null};
        try {
            const result = await sqlHelper.selectBy<any>(View.penaltyView, penaltyTable.penaltyPersonCI, personCI);
            const penaltyList: IPenaltyList[] = [];
            result.forEach(element => {
                const penalty: IPenaltyList = {
                    penaltyCode: element.penaltyCode,
                    penaltyTicket: element.penaltyTicket,
                    penaltyAmount: element.penaltyAmount,
                    offenseResolution: element.offenseResolution, 
                    offenseArticle: element.offenseArticle, 
                    offenseIncised: element.offenseIncised, 
                    penaltyDate: element.penaltyDate,
                    inspectorCode: element.penaltyInspector,
                    inspectorName: element.firstName + ' ' + element.lastName,
                    penaltyObservations: element.penaltyObservations
                };
                penaltyList.push(penalty);
            });
             const offender: IOffender = {
                offenderName: result[0].penaltyPersonName,
                offenderCI: result[0].penaltyPersonCI,
                offenderDir: result[0].penaltyPersonDir,
                offenderMunicipalite: result[0].penaltyPersonMunicipalite,
                offenderProvince: result[0].penaltyPersonProvince,
                offenderPenalty: penaltyList
            }; 
            response.result = offender;
            res.status(200).json(response);
        } catch (err) {
            response.err = err;
            response.message = err.message;
            res.status(200).json(response);
        }
    } 

    public async create(req: Request, res: Response)  {
        const response: IResponse = { result: null, err: null, message: null};
        const { penalty } = req.body;
        
         try {
           
            const currentDate = new Date(Date.now());
            const penaltyData: IPenalty = {
                penaltyTicket: penalty.penaltyTicket,
                penaltyAmount: penalty.penaltyAmount,
                penaltyOffense: penalty.penaltyOffense,
                penaltyDate: currentDate,
                penaltyPersonName: penalty.penaltyPersonName,
                penaltyPersonCI: penalty.penaltyPersonCI,
                penaltyPersonDir: penalty.penaltyPersonDir,
                penaltyPersonMunicipalite: penalty.penaltyPersonMunicipalite,
                penaltyPersonProvince: penalty.penaltyPersonProvince,
                penaltyInspector: res.locals.jwtPayload.userCode,
                penaltyObservations: penalty.penaltyObservations
            };
            const result: any = await sqlHelper.create<any>(Table.penaltyTable, penaltyData);
            response.result = result;
            response.message = 'La Infracción ' + penaltyData.penaltyTicket + ' ha sido Adicionada Satisfactoriamente.';
            res.status(200).json(response);
        } catch (err) {
            console.error(err);
            response.err = err;
            response.message = err.message;
            res.status(500).json(response);
        } 
    }

}

export const offenderController = new OffenderController();