const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/avatar/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const avatarUrl = `https://api.multiavatar.com/${id}.svg`;
        const response = await axios.get(avatarUrl, { responseType: "arraybuffer" });
        res.set("Content-Type", "image/svg+xml");
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch avatar" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Proxy Server running on port ${PORT}`));
