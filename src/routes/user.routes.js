import express from "express";
import { validate } from "../middlewares/validate.js";
import { userSchema } from "../validations/user.schema.js";
import { createUser, getUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", validate(userSchema), createUser);
router.get("/", getUsers);

export default router;