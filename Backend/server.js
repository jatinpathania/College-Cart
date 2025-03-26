const express = require("express");
const app = express();
const signupRoute = require("./Routes/user");
const connectMongdb = require("./db/db");
require('dotenv').config();
const PORT = process.env.PORT ?? 3000;
const forgotPassword = require("./Routes/forgotpassword");
const productRoute = require("./Routes/productAddRoute");
const cartProduct = require("./Routes/cartProductAdd");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const joinRoomIdRouter = require("./Routes/joinRoom");
const messageRouter = require("./Routes/message");
const exchangeBookRoute = require("./Routes/exchangeBook")

const allowedOrigins = [process.env.FRONTEND_URL, process.env.FRONTEND_DEPLOY_URL, process.env.FRONTEND_DEPLOY_URL_VERCEL];

app.get("/", (req, res) => {
    return res.send("Hello world");
});

connectMongdb();

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", signupRoute);
app.use("/api", forgotPassword);
app.use("/api", productRoute);
app.use("/api", cartProduct);
app.use("/api", joinRoomIdRouter);
app.use("/api", messageRouter);
app.use("/api", exchangeBookRoute);

app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`);
});