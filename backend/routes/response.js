const express = require("express");
const config = require('../../config.json');
const Groq = require("groq-sdk");


const router = express.Router();
const groq = new Groq({ apiKey: "" });

async function main(prompt) {
    try {
        const completion = await groq.chat.completions
        .create({
          messages: [
            {
              role: "user",
              content: `You have to act friendly, and professional at the same time, try to be more specific and short, prompt="${prompt}"`,
            },
          ],
          model: "llama3-70b-8192",
        })

        return completion.choices[0]?.message?.content || "";
    } catch {
        return "error";
    }
}

main();

router.post("/", async (req, res) => {
    const { prompt } = req.body;
    //console.log(prompt);
    const response = await main(prompt);

    res.json({ response });
})


module.exports = router;