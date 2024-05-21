const http = require("http");
const app = require("./app");
const httpServer = http.createServer(app)
const dotenv = require("dotenv")

//environmental variables configuration
dotenv.config();

const PORT = process.env.PORT ;

const startServer = async () => {
httpServer.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`);
});
};

startServer();