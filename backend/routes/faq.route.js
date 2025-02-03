import express from "express"
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { createFaq, deleteFaq, getAllQuestions, updateFaq } from "../controllers/faq.controllers.js";

const router = express();

router.get("/",protectRoute, getAllQuestions);
router.post("/addfaq", protectRoute, adminRoute, createFaq);
router.delete("/:id", protectRoute, adminRoute, deleteFaq);
router.put("/:id", protectRoute, adminRoute, updateFaq);

export default router;