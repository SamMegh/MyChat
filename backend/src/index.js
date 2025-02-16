import express from 'express';
import dotenv from 'dotenv';
import cookie from 'cookie-parser';
import cors from 'cors';

import {connect} from './lib/connect.db.js';
import authRoutes from "./route/auth.routes.js";
import messageRoutes from "./route/message.routes.js";
import { app , server} from './lib/socketio.lib.js';

app

dotenv.config();
const Port= process.env.Port;
app.use(express.json());
app.use(cookie()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes)


server.listen(Port, () => {
  console.log('Server is running on port port:'+Port);
  connect();
});