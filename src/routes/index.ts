import { Router } from "express";
import path from "path";

const router = Router();

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
