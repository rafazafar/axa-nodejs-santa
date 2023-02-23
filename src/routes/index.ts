import express from "express";
import { addRequestToQueue } from "../controllers/santa";
import path from "path";

const router = express.Router();

router.post("/wish", addRequestToQueue);

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.get("/sent", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/sent.html"));
});
router.get("/error", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/error.html"));
});

export default router;
