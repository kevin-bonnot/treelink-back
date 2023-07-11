import {Router} from "express";
import {Profile} from "../models/Profile";

const router = Router();

router.get<{}, Profile[]>('/', (req, res) => {
  res.json([{
    id: 1,
    name: 'renchglad',
  }, {
    id: 2,
    name: 'dobixitox',
  }])
});

export default  router;