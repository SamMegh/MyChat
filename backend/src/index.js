import express from 'express';
import dotenv from 'dotenv';

import {connect} from './lib/connect.db.js';
import authRoutes from "./route/auth.routes.js";
const app = express();
const Port= process.env.PORT;


dotenv.config();


app.use("/api/auth", authRoutes);
app.use(express.json());


app.listen(Port, () => {
  console.log('Server is running on port 8080');
  connect();
});