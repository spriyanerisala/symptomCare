import express from "express";
import cors from "cors";
import {connectDB }from "./config/db.js";

import symptomRoutes from "./routes/symptomRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

await connectDB();
app.get('/health',(req,res)=>{
    res.send("healthcare API is running ")
})
app.use("/api/symptoms", symptomRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
