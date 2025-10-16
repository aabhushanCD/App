import Friend from "../model/Friend.model.js";
export const sendRequest = async (req, res) => {
  try {
    const fromId = req.userId;
    let { toId } = req.params;

    if (!fromId || !toId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid sender or receiver" });
    }

    let sender = await Friend.findOne({ userId: fromId });
    let receiver = await Friend.findOne({ userId: toId });

    if (!sender) sender = await Friend.create({ userId: fromId });
    if (!receiver) receiver = await Friend.create({ userId: toId });

    // Already sent?
    if (sender.sentRequest.some((id) => id.toString() === toId)) {
      return res
        .status(400)
        .json({ success: false, message: "Already sent request" });
    }

    // Already friends?
    if (sender.allFriends.some((id) => id.toString() === toId)) {
      return res
        .status(400)
        .json({ success: false, message: "Already friends" });
    }
    sender.sentRequest.push(toId);
    receiver.receivedRequest.push(fromId);

    await sender.save();
    await receiver.save();

    return res
      .status(200)
      .json({ success: true, message: "Friend request sent successfully" });
  } catch (error) {
    console.error("Send request  error", error);
    return res.status(500).json({
      success: false,
      message: "Server error while sending request, Try again",
    });
  }
};

export const getAllRequests = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized request. Please log in again.",
      });
    }

    let friend = await Friend.findOne({ userId }).populate(
      "receivedRequest",
      "name email imageUrl"
    );
    if (!friend) friend = await Friend.create({ userId });

    return res
      .status(200)
      .json({ success: true, receivedRequest: friend.receivedRequest });
  } catch (error) {
    console.error("Server problem in getting friend request", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error for getting all friends requests",
    });
  }
};

export const getAllFriends = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized request. Please log in again.",
      });
    }
    let friend = await Friend.findOne({ userId }).populate(
      "allFriends",
      "name email imageUrl"
    );
    return res.status(200).json({ success: false, friend: friend.allFriends });
  } catch (error) {
    console.error("Server Error in getting all friends".error.message);
    return res
      .status(500)
      .json({ success: false, message: "Server error while getting friends" });
  }
};

export const acceptRequest = async (req, res) => {
  try {
    const userId = req.userId;
    const { friendId } = req.params;
    if (!userId) {
      return res
        .status(403)
        .json({ success: false, message: "UnAuthorized user" });
    }
    if (!friendId) {
      return res
        .status(400)
        .json({ success: false, message: "invalid no friends Id" });
    }
    const myFriend = await Friend.findOne({ userId });
    const friend = await Friend.findOne({ userId: friendId });
    if (!myFriend || !friend) {
      return res.status(404).json({
        success: false,
        message: "Friend record not found",
      });
    }

    // 🧠 Check if already friends
    if (myFriend.allFriends.includes(friendId)) {
      return res.status(400).json({
        success: false,
        message: "Already friends",
      });
    }

    myFriend.allFriends.push(friendId);
    friend.allFriends.push(userId);

    //  Remove the pending requests
    myFriend.receivedRequest = myFriend.receivedRequest.filter(
      (id) => id.toString() !== friendId.toString()
    );
    myFriend.sentRequest = myFriend.sentRequest.filter(
      (id) => id.toString() !== friendId.toString()
    );

    friend.sentRequest = friend.sentRequest.filter(
      (id) => id.toString() !== userId.toString()
    );
    friend.receivedRequest = friend.receivedRequest.filter(
      (id) => id.toString() !== userId.toString()
    );

    await myFriend.save();
    await friend.save();
    return res
      .status(200)
      .json({ success: true, message: "Friend request accepted successfully" });
  } catch (error) {
    console.error("Error in acceptRequest:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while accepting request",
    });
  }
};
