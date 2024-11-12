import jwt from "jsonwebtoken";

export async function generateToken(id, res) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
  res.cookie("jwt", token, {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
}
