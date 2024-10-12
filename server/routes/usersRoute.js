const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");


// Initialize Google OAuth2 client with your Google Client ID
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//register a new user
router.post("/register", async (req, res) => {
  try {
    //check if user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "user already exists",
      });
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //save a new user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "Registration Successfull, Please login",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//login a user
router.post("/login", async (req, res) => {
  try {
    //check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist",
      });
    }

    //check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.send({
        success: false,
        message: "Invalid Password",
      });
    }

    //create and assign a token
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });

    res.send({
      success: true,
      message: "User logged in successfully",
      data: token,
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Google Login API
router.post("/google-login", async (req, res) => {
  const { credential } = req.body; 
  
  if (!credential) {
    return res.status(400).send({
      success: false,
      message: "Token ID is required",
    });
  }
  
  try {
    // Verify the Google credential (idToken)
    const ticket = await client.verifyIdToken({
      idToken: credential, // Using credential here as the idToken
      audience: process.env.GOOGLE_CLIENT_ID, // Ensure this matches your Google Client ID
    });
    
    const { email, name } = ticket.getPayload(); // Get user info from token

    // Check if user already exists in the database
    let user = await User.findOne({ email });
    if (!user) {
      // If the user doesn't exist, create a new one
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(email + process.env.jwt_secret, salt); // Creating a password based on email

      user = new User({
        name,
        email,
        password,
        isGoogleUser: true, // A flag to track Google-authenticated users
      });

      await user.save(); // Save new user to the database
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });

    // Send success response with the token
    res.send({
      success: true,
      message: "User logged in successfully via Google",
      data: token,
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      success: false,
      message: "Google Login failed: " + error.message,
    });
  }
});

router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).select("-password");
    res.send({
      success: true,
      message: "User details fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//send the mail for forgot-password
router.post("/forgot-password", async (req, res) => {
  try {
    //check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist",
      });
    }

    //create and assign a token
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.adminUsername,
        pass: process.env.adminPassword,
      },
    });

    var mailOptions = {
      from: process.env.adminUsername,
      to: req.body.email,
      subject: "Reset your Password",
      text: `https://ticket-ghar.netlify.app/reset-password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send({
      success: true,
      message: "Please check your mail to reset your password!",
      data: token,
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//reset-password
router.post("/reset-password/:id/:token", async (req, res) => {
  try {
    const { id, token } = req.params;

    jwt.verify(token, process.env.jwt_secret, async (err, decoded) => {
      if (err) {
        res.send({
          success: false,
          message: "Token is not matching",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword })
          .then((u) =>
            res.send({
              success: true,
              message: "Passwaord has been reset successfully!",
            })
          )
          .catch((err) =>
            res.send({
              success: false,
              message: "Passwaord reset failed!",
            })
          );
      }
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
