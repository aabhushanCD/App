import { Notification } from "../model/Notification.model.js";

// ✅ Get all notifications for a user
export const getNotifications = async (req, res) => {
  try {
    const userId = req.userId;

    const notifications = await Notification.find({ receiverId: userId })
      .populate("senderId", "name imageUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// ✅ Mark a notification as read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, receiverId: userId },
      { isRead: true },
      { new: true }
    );

    if (!notification)
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });

    res.status(200).json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete a specific notification
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const notification = await Notification.findOneAndDelete({
      _id: id,
      receiverId: userId,
    });

    if (!notification)
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });

    res.status(200).json({ success: true, message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Clear all notifications for a user
export const clearAllNotifications = async (req, res) => {
  try {
    const userId = req.userId;
    await Notification.deleteMany({ receiverId: userId });
    res
      .status(200)
      .json({ success: true, message: "All notifications cleared" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
