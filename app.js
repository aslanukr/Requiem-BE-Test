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
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from "swagger-ui-dist";
import usersRouter from "./routes/api/users.js";
import "./config/passport-setup.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

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
      secure: true,
      sameSite: "none", //CHANGE BEFORE DEPLOY (because it blocks POST Http requests)
    },
    store: MongoStore.create({
      mongoUrl: DB_HOST,
    }),
  })
);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

app.use(cors({ credentials: true, origin: true })); //CHANGE BEFORE DEPLOY (with origin URL)
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

// Test pages for localhost testing ONLY - REMOVE BEFORE DEPLOY

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "views", "home.ejs"), { user: req.user });
});

app.get("/login", (req, res) => {
  res.render(path.join(__dirname, "views", "login.ejs"));
});

app.get("/register", (req, res) => {
  res.render(path.join(__dirname, "views", "register.ejs"));
});

//Routing
app.use(
  "/api/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.7/swagger-ui.min.css",
  })
);

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
