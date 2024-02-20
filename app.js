import "dotenv/config";
import express from "express";
import session from "express-session";
import passport from "passport";
import logger from "morgan";
import cors from "cors";
import MongoStore from "connect-mongo";
import path from "path";
import fs from "fs/promises";
import swaggerUi from "swagger-ui-express";
import usersRouter from "./routes/api/users.js";
import "./config/passport-setup.js";

const { DB_HOST, SESSION_SECRET } = process.env;

const swaggerPath = path.resolve("", "swagger.json");
const swaggerDocument = JSON.parse(await fs.readFile(swaggerPath));

const app = express();

app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
      // sameSite: "lax", //CHANGE BEFORE DEPLOY (because it blocks POST Http requests)
    },
    store: MongoStore.create({
      mongoUrl: DB_HOST,
    }),
  })
);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors()); //CHANGE BEFORE DEPLOY (with origin URL)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

// Test pages - REMOVE BEFORE DEPLOY
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

//Routing
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Auth routes
app.use("/api/auth", usersRouter);

//Error handlers routes
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  console.log(err);
  res.status(status).json({ message });
});

export default app;
