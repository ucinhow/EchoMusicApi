import server from "./server";
const port = 3001;
const app = server.listen(port, () =>
  console.log(`server running in localhost:${port}.`)
);

process.addListener("SIGINT", () => {
  app.close();
});
