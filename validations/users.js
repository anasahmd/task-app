import Joi from "joi";
import User from "../models/user.js";

const isUserRegistered = async (value) => {
  const user = await User.findOne({ email: value });

  if (user) {
    throw new Error('Email is already registered');
  }

  return value;
}

export const userRegistrationSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required().external(isUserRegistered).messages({
		'string.email': 'Please enter a valid email address',
    'string.empty': 'Email cannot be empty',
		'any.required': 'Email is required',
  }),
   
  password: Joi.string().trim().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/).required().messages({
		'any.required': 'Password is required',
    'string.empty': 'Password cannot be empty',
    'string.pattern.base': 'Password must be at least 6 characters and contain at least one letter, one number, and one special character.'
	}),
}).required().messages({
  'any.required': 'No data provided'
});

export const userLoginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required().messages({
		'string.email': 'Please enter a valid email address',
    'string.empty': 'Email cannot be empty',
		'any.required': 'Email is required',
  }),
   
  password: Joi.string().trim().required().messages({
		'any.required': 'Password is required',
    'string.empty': 'Password cannot be empty',
	}),
}).required().messages({
  'any.required': 'No data provided'
});

