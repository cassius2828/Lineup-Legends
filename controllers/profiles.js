const UserModel = require("../models/user");

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
console.log(`Updated username to ${username}`)
      return res.redirect(`/profiles/${userId}`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Unable to update username");
  }
};

// const addNewFieldsToUsers = async () => {
//   try {
//     const result = await UserModel.updateMany(
//       {},
//       {
//         $set: {
//           bio: ''
//         },
//       }
//     );
//     console.log(`${result.nModified} users updated with new fields.`);
//   } catch (error) {
//     console.error('Error updating users:', error);
//   }
// };

module.exports = {
  getUserProfile,
  updateBio,
  updateUsername,
};
