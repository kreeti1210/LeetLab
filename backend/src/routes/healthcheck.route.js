import express from "express";

const healthcheckRoutes = express.Router();

healthcheckRoutes.get("/", (req, res) => {
    res.status(200).json({ message: "Healthy", data: { status: "ok", timestamp: Date.now() }});
});

export default healthcheckRoutes;
