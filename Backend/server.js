const express = require('express')
const cors = require('cors')
const { GoogleGenerativeAI } = require("@google/generative-ai")
require('dotenv').config()

console.log(process.env.API);

const genAI = new GoogleGenerativeAI(process.env.API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

const app = express()
const port = 3000
app.use(cors())
app.use(express.json())

console.log(process.env)

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.post('/chat', async (req, res) => {
    try {
        const msg = req.body.message;
        const history = req.body.history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.parts }]
        }));

        const chat = model.startChat({
            history: history
        });

        const result = await chat.sendMessage(msg);
        const response = result.response;
        const text = response.text();
        console.log(response);
        res.json({ message: text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})