import express from "express";
import bodyParser from "body-parser";
import {sequelize} from "./db/index.js";
import router from "./routers/cityWeathers.js";
import cors from 'cors';

const app = express(); // node.js framwork designed to build APIs

app.use(bodyParser.json()); // used to process data sent in HTTP request body

const corsOpts = { // specifies methods, origin, allowedHeaders
    origin: '*',
    methods: [
      'GET',
      'POST',
    ],
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
app.use(cors(corsOpts)); // allows API to receive resources from a specific origin, in this case, any

app.use("/weather", router);

const port = 3020;

sequelize.sync() // syncs Sequelize model with DB
.then((result) => {
    console.log(result)
}) .catch((err) => {
    console.log(err)
});

app.listen(port, (req, res) => {
    console.log(`Server is running on ${port}`)
});

