import User from "../models/user.js";
import { userLoginSchema, userRegistrationSchema } from "../validations/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userController = {};


userController.register = async (req, res) => {
  let validatedData;
  try {
    validatedData = await userRegistrationSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ errors: error.details });
  }

  const { email, password } = validatedData

  try {
    let user = new User({ email });

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    user.password = hash;

    user = await user.save();

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

userController.login = async (req, res) => {
  let validatedData;

  try {
    validatedData = await userLoginSchema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ errors: error.details });
  }
  console.log(validatedData);
  
  try {
    const user = await User.findOne({ email: validatedData.email });

    if (!user) {
      return res.status(404).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);

    if (!isPasswordValid) {
      return res.status(404).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return res.json({ token });
  } catch (error) {
      console.log(error);
      res.status(500).json({ errors: 'Something went wrong' });
  }
}

export default userController;