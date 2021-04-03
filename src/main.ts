import bootstrap from "./infrastructure/config/bootstrap";
import WebServer from "./infrastructure/webserver/WebServer";

const start = async () => {
  try {
    await bootstrap.execute();
    WebServer.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
