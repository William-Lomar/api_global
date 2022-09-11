import { HTTP_ERRORS } from './../../../express';
import  createError  from 'http-errors';
import { CampeaoInterface } from './campeoes.model';
import { Application, Request, Response, NextFunction } from 'express';
import { RiotAPI } from '@fightmegg/riot-api';
require('dotenv').config();

const rAPI = new RiotAPI(<string>process.env.KEY_LOL);

export = (app:Application) => { 
    /**
     * @description Pegar todos os campeões de LOL 
     * @return Array de campeões [{nome:string, img:string}]
     */
    app.get('/private/campeoes',(req:Request,res:Response,next:NextFunction)=>{
        let campeoes:CampeaoInterface[] = [];

        rAPI.ddragon.champion.all().then((champs)=>{
            Object.values(champs.data).map((champ)=>{
                campeoes.push({
                    nome: champ.name,
                    //@ts-ignore
                    img: `http://ddragon.leagueoflegends.com/cdn/${champ.version}/img/champion/${champ.image.full}`
                })
            })

            res.json(campeoes);
        }).catch((e)=>{
            next(createError(HTTP_ERRORS.ERRO_API_EXTERNA,'Erro ao solicitar campeões da API do LoL: ',e))
        })
    })
}