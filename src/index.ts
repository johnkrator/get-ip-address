import express, {Application, Request, Response} from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

app.get("/", (_req: Request, res: Response) => {
    res.send("Hello World!");
});

app.get("/api/hello", async (req: Request, res: Response) => {
    const visitorName = req.query.visitor_name || "Guest";
    const clientIp = "8.8.8.8";

    try {
        const geoResponse = await axios.get(`https://ipapi.co/${clientIp}/json/`);
        const {city, latitude, longitude} = geoResponse.data;

        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=03f36c6af426d9b0ee4ee3bda74bce68&units=metric`);
        const temperature = weatherResponse.data.main.temp;

        res.json({
            client_ip: clientIp,
            location: city,
            greeting: `Hello, ${visitorName}! The temperature is ${temperature} degrees Celsius in ${city}`
        });
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({error: "An error occurred while processing your request", details: error.message});
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
