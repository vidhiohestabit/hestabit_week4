import createApp from "./loaders/app.js";

const startServer = async () => {
  const app = await createApp();

  app.listen(4000, () => {
    console.log("Server started on port 4000");
  });
};

startServer();