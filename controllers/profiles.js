const UserModel = require("../models/user");

const getUserProfile = async (req, res) => {
  const userId = req.session.user._id;

  const currentUser = await UserModel.findById(userId);

  res.render("profile/index.ejs", { user: currentUser });
};

const updateBio = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const currentUser = await UserModel.findByIdAndUpdate(
      userId,
      { bio: req.body.bio }, // Ensure `req.body.bio` contains the bio text
      { new: true }
    );

    return res.redirect(`/profiles/${userId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Unable to update bio");
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
};
