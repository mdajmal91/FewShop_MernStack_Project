const User = require("../model/User"); // Corrected path to match actual file location
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || "secret123",
    {
      expiresIn: "30d",
    }
  );
};

// ==========================
// Register User
// POST /api/auth/register
// ==========================
exports.registerUser =
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
      } = req.body;

      // Check user exists
      const userExists =
        await User.findOne({
          email,
        });

      if (userExists) {
        return res
          .status(400)
          .json({
            message:
              "User already exists",
          });
      }

      // Hash password
      const salt =
        await bcrypt.genSalt(
          10
        );

      const hashedPassword =
        await bcrypt.hash(
          password,
          salt
        );

      // Create user
      const user =
        await User.create({
          name,
          email,
          password:
            hashedPassword,
        });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token:
            generateToken(
              user._id
            ),
        });
      } else {
        res
          .status(400)
          .json({
            message:
              "Invalid user data",
          });
      }
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// ==========================
// Login User
// POST /api/auth/login
// ==========================
exports.loginUser =
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        return res
          .status(401)
          .json({
            message:
              "Invalid password",
          });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token:
          generateToken(
            user._id
          ),
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

// ==========================
// Login With Email
// POST /api/auth/login-with-email
// ==========================
exports.loginWithEmail =
  async (req, res) => {
    try {
      const { email } =
        req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "Email not registered",
          });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token:
          generateToken(
            user._id
          ),
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };


exports.updateUserProfile =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User nahi mila",
          });
      }

      user.name =
        req.body.name ||
        user.name;

      user.email =
        req.body.email ||
        user.email;

      // Update Password
      if (
        req.body.password
      ) {
        const salt =
          await bcrypt.genSalt(
            10
          );

        user.password =
          await bcrypt.hash(
            req.body.password,
            salt
          );
      }

      const updatedUser =
        await user.save();

      res.json({
        _id:
          updatedUser._id,
        name:
          updatedUser.name,
        email:
          updatedUser.email,
        isAdmin:
          updatedUser.isAdmin,
        token:
          generateToken(
            updatedUser._id
          ),
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };