import express from 'express';
import { getusers, getmessages, sendmessage } from '../control/message.control.js';
import { protect } from '../middlelayer/midway.middlelayer.js';
const router = express.Router();

router.get("/users",protect , getusers);
router.get("/:id",protect , getmessages);
router.post("/send/:id",protect , sendmessage);
