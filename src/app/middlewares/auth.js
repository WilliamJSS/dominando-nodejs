import jwt from "jsonwebtoken";
import { promisify } from "util";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log({ authHeader });

  if (!authHeader) {
    return res.status(401).json({ error: "Token was not provide." });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET);

    req.userId = decoded.id;

    console.log({ decoded });

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid." });
  }
};
