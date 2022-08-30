import express from "express";
import bodyParser from "body-parser";
import {sequelize} from "./db/index.js";
import router from "./routers/cityWeathers.js"

const app = express();

app.use(bodyParser.json());

app.use("/weather", router)

const port = 3020;

sequelize.sync()
.then((result) => {
    console.log(result)
}) .catch((err) => {
    console.log(err)
});

// app.use(cors({
//     origin: 'http://localhost:3003/'
// }));

app.listen(port, (req, res) => {
    console.log(`Server be running on ${port}`)
});

