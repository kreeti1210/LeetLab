import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - no token provided" });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Unauthorized - no token provided at decoded level" });
    }
    const user = await db.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        email: true,
        image: true,
        role: true,
        name: true,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Some error occured" });
  }
};
