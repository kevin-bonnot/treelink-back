import {Router} from "express";
import profiles from "./profiles";

const router = Router();

router.get<{}, string[]>('/', (req, res) => {
  res.json([
    'profile - les profiles'
  ])
})

router.use('/profile', profiles);

export default router;