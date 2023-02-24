import { Router } from "express";
import { addRequestToQueue } from "../controllers/santa";

const router = Router();

router.post("/wish", addRequestToQueue);

export default router;
