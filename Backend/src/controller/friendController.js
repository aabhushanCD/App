import Friend from "../model/Friend.model.js";
export const sendRequest = async (req, res) => {
  try {
    const fromId = req.userId;
    const { toId } = req.params;

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
    return res.status(200).json({
      success: false,
      message: "Server error while sending request, Try again",
    });
  }
};
