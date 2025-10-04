import { app } from "./app.js";
import { config } from "./config/index.js";

app.listen(config.api.port, () => {
  console.log(`Server is running on http://localhost:${config.api.port}`);
});

process.on("SIGINT", async () => {
  console.log("Shutting down...");
  process.exit();
});
