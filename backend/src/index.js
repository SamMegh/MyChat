import express from 'express';
import dotenv from 'dotenv';

import {connect} from './lib/connect.db.js';
import authRoutes from "./route/auth.routes.js";
const app = express();
dotenv.config();
const Port= process.env.Port;
app.use(express.json());



app.use("/api/auth", authRoutes);


app.listen(Port, () => {
  console.log('Server is running on port port:'+Port);
  connect();
});