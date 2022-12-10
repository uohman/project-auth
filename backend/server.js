import express, { response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import User from './models/UserSchema'

dotenv.config() 

const mongoUrl = process.env.MONGO_URL //"mongodb://localhost/project-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  console.log(req.body)
  const { username, password } = req.body;
  // npm i bcrypt
  try {
    const salt = bcrypt.genSaltSync();
    if (password.length < 1) {
      res.status(400).json({
        success: false,
        response: "Password must be at least 8 characters long"
      });
    } else {
      const userExist = await User.findOne({ username })
      if (userExist) {
        return res.status(400).json({ success: false, response: "User already registered."})
      }
      const newUser = await new User({username: username, password: bcrypt.hashSync(password, salt)}).save();
      const token = jwt.sign({ username }, process.env.TOKEN_KEY, { expiresIn: "2h"} ) // token creation sending to fronted, username setup with time limit

      res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          accessToken: token,
          id: newUser._id
        }
      })
    }
  } catch(error) {
    console.log(error)
    res.status(400).json({
      success: false,
      response: error
    })
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({username});
    if (user && bcrypt.compareSync(password, user.password)) {                      
      const token = jwt.sign({ username } , process.env.TOKEN_KEY, { expiresIn: "2h" }) // hashing the username, will be stored to the database, time expiration
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          id: user._id,
          accessToken: token
        }
      });
  } else {
    res.status(400).json({
    success: false,
    response: "Credentials didn't match"
  });
  }
} catch (error) {
  res.status(400).json({
    success: false,
    response: error
  });
}
});

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    if (!accessToken) {  /*** Authorization of the user during the Authentication process ***/
      return res.status(401).json({ success: false, response: "No token"})     // token validation
    }
    const deCodeUsername = jwt.verify( accessToken , process.env.TOKEN_KEY ) //verifying the integrity of the token
    const user = await User.findOne({ username: deCodeUsername.username})   //the query, pushing this to database
    if (user) {
      req.user = user //fetching the actual data through the token
      next();
    } else {
      res.status(401).json({
        response: "Please log in",
        success: false
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      response: error,
      success: false
    })
  }
}

app.get("/authenticate", authenticateUser , (req, res) => {
  res.status(200).json({
    success: true,
    response: req.user.username // if login succesfull getting the username
  })
});


// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello user!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
