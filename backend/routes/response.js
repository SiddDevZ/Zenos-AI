const express = require("express");
const config = require('../../env.json');
const Groq = require("groq-sdk");
const userModel = require("../models/user");

const router = express.Router();
const groq = new Groq({ apiKey: config.API_KEY });


async function main(prompt, token) {

  const auth = await userModel.findOne({ Token: token });
  
  if (auth) {
    try {
      const completion = await groq.chat.completions
      .create({
        messages: [
          {
            role: "user",
            content: `You have to act friendly, and professional at the same time, try to be more specific and short, IF ONLY IF you were originally going to provide then any code then after "\`\`\`" put the name or short name (whichever it understands) for syntex highligher to understand, also do not talk about what i am writing here, you only have to respond to prompt, prompt="${prompt}"`,
          },
        ],
        model: "llama3-70b-8192",
      })

      return completion.choices[0]?.message?.content || "";

    } catch {
        return "error";
    }
  } else {
    return "error";
  }
}

router.post("/", async (req, res) => {
    const { prompt } = req.body;
    //console.log(prompt);
    const response = await main(prompt);

    res.json({ response });
})


module.exports = router;