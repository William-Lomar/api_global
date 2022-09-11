import { HTTP_ERRORS } from './../../../express';
import  createError  from 'http-errors';
import { CampeaoInterface } from './../campeoes/campeoes.model';
import { Application, Request, NextFunction, Response} from 'express';
import { MatchupInterface, ResultadoMatchupInterface } from './matchup.model';
import axios from 'axios';
import { load } from 'cheerio';

export = (app:Application) => {
    app.post('/private/matchup',(req:Request,res:Response,next:NextFunction)=>{
        let matchup:MatchupInterface = req.body;
        let matchupPromises:Promise<ResultadoMatchupInterface>[] = [];
        let elo = matchup.elo == 'platina' ? '' : matchup.elo;

        matchup.campeoes.forEach((campeao)=>{
            matchupPromises.push(realizarMatchup(campeao,matchup.oponente,elo,matchup.rota));
        })

        Promise.all(matchupPromises).then((resultados:ResultadoMatchupInterface[])=>{
            let resultadosOrdanado = resultados.sort((a,b)=>{
                if(a.percent > b.percent){
                  return -1;
                }
                if(a.percent < b.percent){
                  return 1;
                }
                return 0;
              })

              res.json(resultadosOrdanado);
        }).catch((e:any)=>{
            next(createError(HTTP_ERRORS.ERRO_API_EXTERNA,'Erro ao se conectar à API externa do LOL'))
        })
    })
}  

function realizarMatchup(campeao:CampeaoInterface,oponente:CampeaoInterface,elo:string,rota:string):Promise<ResultadoMatchupInterface> {
    let urlLolalytics = `https://lolalytics.com/lol/${campeao.nome.toLowerCase()}/vs/${oponente.nome.toLowerCase()}/build/?lane=${rota}&tier=${elo}`;
    let urlMatchup = `https://www.leagueofgraphs.com/pt/champions/builds/${campeao.nome.toLowerCase()}/${rota}/vs-${oponente.nome.toLowerCase()}/${elo}`;

    return new Promise((resolve,reject)=>{
        axios.get(urlMatchup,{
            headers:{
                'User-Agent':' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
              }
        }).then((response)=>{
            const $ = load(response.data);
            let resultadoPercentString:string = $('#graphDD2').text().replace(/\s+/g, '')
            let resultadoPercent:number = Number(resultadoPercentString.replace('%',''));

            let resultadoMatchup = {
            campeao:campeao.nome,
            campeaoImg:campeao.img,
            oponente:oponente.nome.toLowerCase(),
            oponenteImg:oponente.img,
            percent:resultadoPercent,
            elo:elo,
            rota:rota,
            linkLeagueOfGraphs: urlMatchup,
            linkLolalytics:urlLolalytics
            }

            resolve(resultadoMatchup);
        }).catch((e:any)=>{
            reject(e);
        })
    })
}