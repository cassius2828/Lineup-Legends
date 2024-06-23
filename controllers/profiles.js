const UserModel = require("../models/user");

const crypto = require("crypto");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const getUserProfile = async (req, res) => {
  const userId = req.session.user._id;

  const currentUser = await UserModel.findById(userId);

  res.render("profile/index.ejs", { user: currentUser });
};

const updateBio = async (req, res) => {
  const { bio } = req.body;
  if (bio.length > 250) {
    return res.status(500).send("Character limit exceeded");
  }
  try {
    const userId = req.session.user._id;
    const currentUser = await UserModel.findByIdAndUpdate(
      userId,
      { bio }, // Ensure `req.body.bio` contains the bio text
      { new: true }
    );

    return res.redirect(`/profiles/${userId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Unable to update bio");
  }
};

const updateUsername = async (req, res) => {
  const { username } = req.body;

  try {
    const usersWithCurrentUsername = await UserModel.find({ username });
    if (usersWithCurrentUsername.length > 0) {
      return res.status(500).send("username is already taken");
    } else {
      const userId = req.session.user._id;
      const currentUser = await UserModel.findByIdAndUpdate(
        userId,
        { username }, // Ensure `req.body.bio` contains the bio text
        { new: true }
      );
      console.log(`Updated username to ${username}`);
      return res.redirect(`/profiles/${userId}`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Unable to update username");
  }
};

const updateEmailStepOne = async (req, res) => {
  // this will send a confirmation email to the email address specified
  const { email } = req.body;
  const userId = req.session.user._id;
  const currentUser = await UserModel.findById(userId);
  const duplicateEmail = await UserModel.find({ email });
  if (duplicateEmail.length > 0) {
    return res
      .status(500)
      .send(
        "This email already belongs to another user. Please enter a new one"
      );
  }
  currentUser.newEmail = email;
  let token = generateToken();
  currentUser.emailConfirmationToken = token
  currentUser.save();
  sendConfirmationEmail(currentUser, token);
  res.send(`confirmation email sent to ${email}`);
};
const updateEmailStepTwo = async (req, res) => {
  const { token } = req.query;

  const user = await UserModel.findOne({ emailConfirmationToken: token });
  if (!user) {
    return res.status(400).send("invalid token");
  }
  user.email = user.newEmail;
  user.newEmail = null;
  user.emailConfirmationToken = null;
  await user.save();

  res.send("Email address updated successfully.");
};
const addNewFieldsToUsers = async () => {
  try {
    const result = await UserModel.updateMany(
      {},
      {
        $set: {
          newEmail: "",
          emailConfirmationToken: "",
        },
      }
    );
    console.log(`${result.nModified} users updated with new fields.`);
  } catch (error) {
    console.error("Error updating users:", error);
  }
};

module.exports = {
  getUserProfile,
  updateBio,
  updateUsername,
  addNewFieldsToUsers,
  updateEmailStepTwo,
  updateEmailStepOne,
};
 
const generateToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});


const sendConfirmationEmail = (user, token) => {
  const url = `${process.env.DEV_MAIL_BASE_URL}${token}`;

  transporter.sendMail({
    to: user.newEmail,
    subject: "Confirm your email address",
    html: `Please click this link to confirm your email address: <a href="${url}">${url}</a>`,
  });
};
