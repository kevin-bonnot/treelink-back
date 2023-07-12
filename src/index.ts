import express, {Application} from "express";
import routes from "./routes";
import session, {SessionOptions} from 'express-session';
import {initializeAuth} from "./routes/auth";

const app: Application = express();
const port: number = 3000;

const sessionOptions: SessionOptions = {
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET',
  store: new session.MemoryStore(),
}

app.use(session(sessionOptions));
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.get('/', (req, res) => {
  res.render('pages/auth');
});

app.use('/api', routes);

initializeAuth(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
