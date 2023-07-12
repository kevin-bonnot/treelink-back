import {Router} from "express";
import {Profile} from "../models/Profile";
import pool from "../db/db";
import CustomError from "../models/CustomError";

const router = Router();

router.get<{}, Profile[] | CustomError>('/', (req, res) => {
  pool.query('select * from users', (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'exécution de la requète : ', err);
      res.status(500).json({error: 'Erreur'})
    } else {
      res.json(result.rows);
    }
  })
});

export default  router;