import express from "express";
import { registerUser, loginUser , userData} from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginUser);
router.get("/userdata", isAuthenticated, userData);

export default router;
