import User from "../model/User.model.js";

export const Search = async (req, res) => {
  try {
    const text = req.body.text?.trim();
    const userId = req.userId;

    if (!text) {
      return res
        .status(400)
        .json({ message: "Please enter something", success: false });
    }

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized user!", success: false });
    }

    // Search users by name or username, case-insensitive
    const users = await User.find({
      $and: [
        { _id: { $ne: userId } }, // exclude self
        {
          $or: [
            { name: { $regex: text, $options: "i" } },
            { username: { $regex: text, $options: "i" } },
          ],
        },
      ],
    }).select("name  profileImage");

    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found", success: false });
    }

    return res
      .status(200)
      .json({ message: "Users found", success: true, data: users });
  } catch (error) {
    console.error("Search Error:", error.message);
    return res
      .status(500)
      .json({ message: "Server Error! Cannot perform search", success: false });
  }
};
