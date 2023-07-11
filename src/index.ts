import express, {Application, Request, Response} from "express";
import routes from "./routes";

const app: Application = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello world !</h1>')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/api', routes)
