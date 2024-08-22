/*
import * as Sentry from "@sentry/node";
import "dotenv/config";
import express from "express";
import login from "../src/routes/login.js";
import users from "../src/routes/users.js";
import bookings from "../src/routes/bookings.js";
import reviews from "../src/routes/reviews.js";
import properties from "../src/routes/properties.js";
import amenities from "../src/routes/amenities.js";
import hosts from "../src/routes/hosts.js";
import logger from "../src/middleware/logAll.js";
import errorHandler from "../src/middleware/errorHandler.js";

const app = express();
app.use(express.json());
app.use(logger);

// Sentry hier maar geplaatst na lang genoeg gestoeid te hebben met de config.. :)
Sentry.init({
  dsn: "https://af5e3bc9c3eef6c71592ac5cbd6427d3@o4507255710351360.ingest.de.sentry.io/4507302717423696",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  tracesSampleRate: 1.0,
});

// Trace incoming requests
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());

app.use("/login", login);
app.use("/users", users);
app.use("/bookings", bookings);
app.use("/reviews", reviews);
app.use("/properties", properties);
app.use("/amenities", amenities);
app.use("/hosts", hosts);

app.use(errorHandler);

app.get("/", (req, res) => {
  //res.send("Hello world!");
  res.sendFile('HyperBubbles.html');
  //just wondering how this will go down :)
});

//this.testje(); for creating error in sentry

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
*/
import * as http from "node:http";
import * as fs from "fs";

console.log("Herro! Smee again!");
fs.readFile("/HyperBubbles.html", function (err, html) {
  if (err) {
    throw err;
  }
  http
    .createServer(function (request, response) {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(html);
      response.end();
    })
    .listen(4000);
});
