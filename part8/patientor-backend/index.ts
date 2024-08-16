import express from "express";
import cors from "cors";

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_request, response) => {
  console.log("someone pinged here");
  response.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
