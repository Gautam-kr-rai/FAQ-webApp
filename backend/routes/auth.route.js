import express from "express"

import {getProfile, login, logout, refreshToken, singup} from "../controllers/auth.controllers.js"
const router = express.Router();

router.post("/singup",singup);
router.post("/login",login);
router.post("/logout",logout);
router.post("/refresh-token",refreshToken);
router.get("/Profile",getProfile);

export default router