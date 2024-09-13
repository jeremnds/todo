import { CustomValidator } from "express-validator";

const passwordValidator: CustomValidator = (value, { req }) => {
  if (value !== req.body.password) {
    throw new Error("Passwords do not match");
  }
  return true;
};

export const registerSchema = {
  username: {
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "Your email cannot be empty",
    },
    isEmail: {
      errorMessage: "Invalid email",
    },
    normalizeEmail: true,
  },
  password: {
    notEmpty: {
      errorMessage: "Your password cannot be empty!",
    },
    isString: {
      errorMessage: "Your password must be a string",
    },
    isLength: {
      options: {
        min: 5,
      },
      errorMessage: "Your password must be 5 characters minimum",
    },
  },
  passwordValidation: {
    notEmpty: {
      errorMessage: "Validation password cannot be empty!",
    },
    custom: {
      options: passwordValidator,
    },
  },
};

export const loginSchema = {
  identifier: {
    notEmpty: {
      errorMessage: "Username or email cannot be empty",
    },
    isString: {
      errorMessage: "Identifier must be a string",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Your password cannot be empty!",
    },
    isString: {
      errorMessage: "Your password must be a string",
    },
    isLength: {
      options: {
        min: 5,
      },
      errorMessage: "Your password must be 5 characters minimum",
    },
  },
};
