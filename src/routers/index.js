import express from "express";
import readfileRouters from "./readInput.routers";

const routes = express();

routes.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome!",
  });
});

routes.use("/file", readfileRouters);

routes.get("*", (req, res) => {
  res.status(404).json({
    message: "Page not found, try again",
  });
});

export default routes;
