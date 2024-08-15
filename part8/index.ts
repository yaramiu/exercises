import express from "express";

const app = express();

app.get("/hello", (_request, response) => {
  response.send("Hello Full Stack!");
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
