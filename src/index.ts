import express, {Application, Request, Response} from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
app.set("trust proxy", true);

app.get("/", (_req: Request, res: Response) => {
    res.send("Hello World!");
});

app.get("/api/hello", async (req: Request, res: Response) => {
    const visitorName = req.query.visitor_name || "Guest";
    let clientIp = req.ip || req.socket.remoteAddress || "127.0.0.1";

    // Remove the IPv6 prefix if present
    clientIp = clientIp.replace(/^::ffff:/, "");

    // Default location (New York City)
    let city = "New York";
    let latitude = 40.7128;
    let longitude = -74.0060;

    try {
        if (clientIp !== "127.0.0.1") {
            const geoResponse = await axios.get(`https://ipapi.co/${clientIp}/json/`);
            if (geoResponse.data.city && geoResponse.data.latitude && geoResponse.data.longitude) {
                city = geoResponse.data.city;
                latitude = geoResponse.data.latitude;
                longitude = geoResponse.data.longitude;
            } else {
                console.log(`Using default location. IP geolocation failed for IP: ${clientIp}`);
            }
        } else {
            console.log("Local IP detected. Using default location.");
        }

        const weatherApiKey = process.env.weatherApiKey;
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`);
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

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
