import { Application, Request , Response} from "express"

export = (app:Application) =>{
    app.get('/', (req: Request, res: Response) => {
        res.json({ message: 'hello world with Typescript' })
      })
}

