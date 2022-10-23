import jwt from "jsonwebtoken";
import User from "../models/User";

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    // Verifica se o usuario existe
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Verifica se a senha esta correta
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: "Password don't match." });
    }

    const { id, name } = user;

    return res.status(200).json({
      user: { id, name, email },
      token: jwt.sign({ id }, process.env.SECRET, { expiresIn: "7d" }),
    });
  }
}

export default new SessionsController();
