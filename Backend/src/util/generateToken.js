import jwt from "jsonwebtoken";

export const generateToken = async (userId) => {
  try {
    const accessToken = jwt.sign(userId, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  } catch (error) {}
};
