const express = require("express");
const app = express();

const promBundle = require("express-prom-bundle");
const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
});
app.use(metricsMiddleware);

app.get("/api", (req, res) => {
  res.status(200).send("api works");
});

app.get("/api/fast", (req, res) => {
  res.status(200).send("fast response");
});

app.get("/api/slow", (req, res) => {
  setTimeout(() => {
    res.status(200).send("Slow response...");
  }, 1000);
});

app.get("/api/error", (req, res) => {
  res.status(500).send("Something broke...");
});

app.get("/api/list:listId", (req, res) => {
  res.status(200).send(`Retrivied list ${req.params.listId}`);
});

app.listen(4000, () => console.log("Server is running on port 4000"));
