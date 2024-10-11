const UserModel = require("../models/user");
const LineupModel = require("../models/lineup");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { getRelativeTime } = require("./lineups");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
dotenv.config();
///////////////////////////
// GET | get user profile | lineups default
///////////////////////////
const getUserProfile = async (req, res) => {
  const { userId } = req.params;
  const signedInUserId = req.session.user._id;
  let userLineups = await LineupModel.find({ owner: userId });

  let featuredLineups = await LineupModel.aggregate([
    {
      $match: { owner: new mongoose.Types.ObjectId(userId), featured: true },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);
  featuredLineups = await LineupModel.populate(featuredLineups, [
    { path: "pg" },
    { path: "sg" },
    { path: "sf" },
    { path: "pf" },
    { path: "c" },
    { path: "owner" },
  ]);

  const currentUser = await UserModel.findById(signedInUserId).populate(
    "friends"
  );
  const currentlyViewedUserProfile = await UserModel.findById(userId).populate(
    "friends"
  );
  const friendsOfCurrentlyViewedUser = await UserModel.find({
    _id: { $in: currentlyViewedUserProfile.friends },
  });
  console.log(friendsOfCurrentlyViewedUser, " <-- friends of user");
  userLineups = await getRelativeTime(userLineups);
  res.render("profile/index.ejs", {
    user: currentUser,
    viewedUser:currentlyViewedUserProfile,
    showLineups: true,
    showCollection: false,
    showSocials: false,
    lineups: userLineups,
    featuredLineups,
    friends: friendsOfCurrentlyViewedUser,
  });
};
///////////////////////////
// GET | get user profile | card collection
///////////////////////////
const getUserProfileCardCollection = async (req, res) => {
  // const userId = req.session.user._id;
  const { userId } = req.params;
  const signedInUserId = req.session.user._id;

  let userLineups = await LineupModel.find({ owner: userId }).populate("owner");

  const currentUser = await UserModel.findById(signedInUserId).populate(
    "friends"
  );
  const currentlyViewedUserProfile = await UserModel.findById(userId).populate(
    "friends"
  );
  const friendsOfCurrentlyViewedUser = await UserModel.find({
    _id: { $in: currentlyViewedUserProfile.friends },
  });
  res.render("profile/index.ejs", {
    user: currentUser,
    viewedUser:currentlyViewedUserProfile,
    showLineups: false,
    showCollection: true,
    showSocials: false,
    lineups: userLineups,
    friends: friendsOfCurrentlyViewedUser,
  });
};

///////////////////////////
// GET | get user profile | social media
///////////////////////////
const getUserProfileSocialMedia = async (req, res) => {
  const { userId } = req.params;
  const signedInUserId = req.session.user._id;

  let userLineups = await LineupModel.find({ owner: userId }).populate("owner");

  const currentUser = await UserModel.findById(signedInUserId).populate(
    "friends"
  );
  const currentlyViewedUserProfile = await UserModel.findById(userId).populate(
    "friends"
  );
  const friendsOfCurrentlyViewedUser = await UserModel.find({
    _id: { $in: currentlyViewedUserProfile.friends },
  });
  res.render("profile/index.ejs", {
    user: currentUser,
    viewedUser:currentlyViewedUserProfile,
    showLineups: false,
    showCollection: false,
    showSocials: true,
    lineups: userLineups,
    friends: friendsOfCurrentlyViewedUser,
  });
};

///////////////////////////
// GET | get edit user profile
///////////////////////////
const getEditUserProfile = async (req, res) => {
  const userId = req.session.user._id;

  const currentUser = await UserModel.findById(userId);

  res.render("profile/edit.ejs", { user: currentUser });
};

///////////////////////////
// * PUT | add profile img
///////////////////////////
// initalize the s3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION,
});

const addProfileImg = async (req, res) => {
  const profileImgFile = req.file; // Multer stores single file as req.file
  console.log(req.file, " <-- req.file"); // Debugging to check if file is correctly received

  try {
    const user = await UserModel.findById(req.session.user._id);
    if (!user) {
      return res.status(400).json({ error: "No user was found" });
    }

    const uploadToS3 = async (file, folder) => {
      const filePath = `${folder}/${uuidv4()}-${file.originalname}`;
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: filePath,
        Body: file.buffer,
      };
      const command = new PutObjectCommand(params);
      await s3.send(command);
      return `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${filePath}`;
    };

    if (profileImgFile) {
      user.profileImg = await uploadToS3(
        profileImgFile,
        "lineup-legends/profile-imgs"
      );
      await user.save();
      if (user.profileImg.length === 0) {
        return res
          .status(500)
          .json({ error: "No user profile was able to be saved" });
      }
    }

    res.redirect(`/profiles/${req.session.user._id}`);
  } catch (err) {
    res.status(500).json({ error: "Unable to update user profile image" });
  }
};

///////////////////////////
// ! DELETE | remove profile img
///////////////////////////

const removeProfileImg = async (req, res) => {
  try {
    const user = await UserModel.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({ error: "Cannot find user" });
    }

    user.profileImg = "";
    await user.save();
    res.redirect(`/profiles/${req.session.user._id}`);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Unable to remove profile picture for user" });
  }
};
///////////////////////////
// * PUT | update bio
///////////////////////////
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
///////////////////////////
// * PUT | update username
///////////////////////////
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
///////////////////////////
// * PUT | update email step 1
///////////////////////////
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
  currentUser.emailConfirmationToken = token;
  currentUser.save();
  sendConfirmationEmail(currentUser, token);
  res.send(`confirmation email sent to ${email}`);
};
///////////////////////////
// * PUT | update email step 2
///////////////////////////
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

///////////////////////////
// * PUT | update password
///////////////////////////
const updatePassowrd = async (req, res) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  console.log(req.body);
  try {
    const userId = req.session.user._id;
    const currentUser = await UserModel.findById(userId);
    // see if the current password entered matches the password in the db
    const isValid = bcrypt.compareSync(currentPassword, currentUser.password);
    console.log(isValid);
    if (!isValid) {
      return res
        .status(400)
        .send("Current password entered does not match this user's password");
    }
    if (newPassword !== confirmNewPassword) {
      console.log(
        `New Password is ${newPassword}, while confirm new password is ${confirmNewPassword}`
      );
      return res.status(400).send("new passwords do not match");
    }
    // store the value of the update password function to a var
    const newPasswordValue = handleUpdatePassword(
      newPassword,
      confirmNewPassword,
      currentUser.password,
      currentPassword
    );
    // check if the new password value is different from the old password value
    if (newPasswordValue !== currentUser.password) {
      currentUser.password = newPasswordValue;
      await currentUser.save();
      console.log("Password successfully changed!");
      res.redirect(`/profiles/${userId}`);
    } else {
      // if it is not different, then let the user know something went wrong and the password did not update
      console.log(
        "Password unabled to be changed, it is still the previous value"
      );
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Could not update password");
  }
};
///////////////////////////
// utitlity to add new fileds to user collections
///////////////////////////
const addNewFieldsToUsers = async () => {
  try {
    const result = await UserModel.updateMany(
      {},
      {
        $set: {
          friends: [],
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
  updatePassowrd,
  getEditUserProfile,
  getUserProfileCardCollection,
  getUserProfileSocialMedia,
  addProfileImg,removeProfileImg
};
//  generate email token
const generateToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

// transport email
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

// send confirmation email
const sendConfirmationEmail = (user, token) => {
  const url = `${process.env.DEV_MAIL_BASE_URL}${token}`;

  transporter.sendMail({
    to: user.newEmail,
    subject: "Confirm your email address",
    html: `Please click this link to confirm your email address: <a href="${url}">${url}</a>`,
  });
};

const handleUpdatePassword = (
  newPassword,
  confirmNewPassword,
  oldPassword,
  currentPassword
) => {
  // Compare the current password with the stored old password
  const validPassword = bcrypt.compareSync(currentPassword, oldPassword);

  if (validPassword) {
    // Check if the new password matches the confirmation password
    if (newPassword === confirmNewPassword) {
      // Hash and return the new password
      return bcrypt.hashSync(newPassword, 10);
    } else {
      // If new passwords don't match, return an error or old password (if intended)
      // This part should ideally handle the error appropriately
      throw new Error("New passwords do not match.");
    }
  } else {
    // If the old password is not valid, return an error
    throw new Error("Current password is incorrect.");
  }
};
