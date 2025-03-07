import jwt from "jsonwebtoken";

export const sendToken = (user) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
   /* res.status(statusCode).json({
      success: true,
      token,
      message,
    });*/
  };