const content =
  "<!DOCTYPE html>" +
  "<html>" +
  "    <head>" +
  '        <meta charset="utf-8" />' +
  "        <title>ECE AST</title>" +
  "    </head>" +
  "    <body>" +
  "       <p>Hello World!</p>" +
  "    </body>" +
  "</html>";

const http = require("http");
const url = require("url");
const qs = require("querystring");
const fs = require("fs");

const serverHandle = function (req, res) {
  const route = url.parse(req.url);
  const path = route.pathname;
  const params = qs.parse(route.query);

  if (path === "/") {
    // Route: /
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("To learn how /hello works, go to /hello");
  } else if (path === "/hello") {
    if ("name" in params) {
      const name = params.name;
      if (name === "YourName") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello, I am YourName. Nice to meet you!");
      } else {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(`Hello, ${name}!`);
      }
    } else {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Please provide a name in the query parameter.");
    }
  } else if (path === "/about") {
    fs.readFile("about.json", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Not Found");
  }
};

module.exports = {
  serverHandle,
};
