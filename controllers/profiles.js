const UserModel = require("../models/user");

const getUserProfile = async (req, res) => {
  const userId = req.session.user._id;

  const currentUser = await UserModel.findById(userId);

  res.render("profile/index.ejs", { user: currentUser });
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
};
