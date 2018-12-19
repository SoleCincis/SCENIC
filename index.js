const express = require("express");
const app = express();

const compression = require("compression");
const db = require("./db");

app.use(compression());
app.use(express.static("./public"));

if (process.env.NODE_ENV != "production") {
  app.use(
    "/bundle.js",
    require("http-proxy-middleware")({
      target: "http://localhost:8081/"
    })
  );
} else {
  app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//__________prendi la scena dal db__________
app.get("/scene/:id", (req, res) => {
  db.getScene(req.params.id)
    .then(result => res.json(result.rows))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.post("/sceneTitle/:id", (req, res) => {
  db.getSceneId(req.params.id);
});

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
  console.log("I'm listening.");
});
