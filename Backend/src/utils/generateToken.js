import jwt from "jsonwebtoken";

export const generateToken = (_id, res) => {
  const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookies("token", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
};

export const generateRefreshToken = () => {
  const refresh = jwt.sign({ _id }, process.env.REFRESH_TOKEN, {
    expireId: "10d",
  });
  res.cookies("refreshToken", refresh, {
    maxAge: 10 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
};
