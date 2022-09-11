import { CampeaoInterface } from "../campeoes/campeoes.model";

export interface MatchupInterface{
    campeoes:Array<CampeaoInterface>;
    oponente:CampeaoInterface;
    rota:string;
    elo:string;
}

export interface ResultadoMatchupInterface{
    campeao:string;
    campeaoImg:string;
    oponente:string;
    oponenteImg:string;
    percent:number;
    elo:string;
    rota:string;
    linkLeagueOfGraphs: string;
    linkLolalytics:string;
}