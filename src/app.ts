import server from "./server";
import cache from "./common/cache";

const port = 3001;
const app = server.listen(port, () =>
  console.log(`server running in localhost:${port}.`)
);

// clean cache(redis) when server close
app.on("close", () => cache.close());
process.addListener("SIGINT", () => app.close());

export { app };
