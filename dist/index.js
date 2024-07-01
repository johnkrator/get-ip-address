"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set("trust proxy", true);
app.get("/", (_req, res) => {
    res.send("Hello World!");
});
app.get("/api/hello", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            const geoResponse = yield axios_1.default.get(`https://ipapi.co/${clientIp}/json/`);
            if (geoResponse.data.city && geoResponse.data.latitude && geoResponse.data.longitude) {
                city = geoResponse.data.city;
                latitude = geoResponse.data.latitude;
                longitude = geoResponse.data.longitude;
            }
            else {
                console.log(`Using default location. IP geolocation failed for IP: ${clientIp}`);
            }
        }
        else {
            console.log("Local IP detected. Using default location.");
        }
        const weatherApiKey = process.env.weatherApiKey;
        const weatherResponse = yield axios_1.default.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}&units=metric`);
        const temperature = weatherResponse.data.main.temp;
        res.json({
            client_ip: clientIp,
            location: city,
            greeting: `Hello, ${visitorName}! The temperature is ${temperature} degrees Celsius in ${city}`
        });
    }
    catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: "An error occurred while processing your request", details: error.message });
    }
}));
const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
//# sourceMappingURL=index.js.map