import express, {Application} from "express";

const app: Application = express();

app.get("/", (_req, res) => {
    res.send("Hello World!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
