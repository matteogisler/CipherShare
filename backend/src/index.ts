import express from "express";
import dotenv from "dotenv";
import aclRoutes from "./routes/acl";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/acl", aclRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
