import "dotenv/config";

import { Server } from "./models/index.js";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const server = new Server();

server.listen();
