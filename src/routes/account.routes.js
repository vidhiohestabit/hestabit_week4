import express from "express";
import accountRepository from "../repositories/account.repository.js";

const router = express.Router();

// ✅ Create test account
router.get("/seed", async (req, res) => {
  try {
    const account = await accountRepository.create({
      email: "test@gmail.com",
      password: "123456"
    });

    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Find account by email
router.get("/:email", async (req, res) => {
  try {
    const account = await accountRepository.findByEmail(req.params.email);
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;