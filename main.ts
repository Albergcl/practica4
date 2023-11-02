import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";  //estas dos lineas leen el archivo .env y lo cargan en la varaible env
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
    console.log("No mongo URL found");
    Deno.exit(1);
  }
  
await mongoose.connect(MONGO_URL); //Conectarse a mongo
const app = express();


app.listen(3000);