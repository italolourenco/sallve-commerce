import bootstrap from "./infrastructure/config/bootstrap";
import WebServer from "./infrastructure/webserver/WebServer";

const start = async () => {
  try {
    await bootstrap.execute();
    WebServer.start();
    console.log("🚀 started");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
