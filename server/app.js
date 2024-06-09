const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "Hello world" });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
