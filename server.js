import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, model } = req.body;

    const completion = await client.chat.completions.create({
      model: model || "gpt-4.1-mini",
      messages: [
        { role: "system", content: "You are MiniGPT, an AI assistant made by the user. Always refer to yourself as MiniGPT." },
        { role: "user", content: message }
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});