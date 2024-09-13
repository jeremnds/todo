export const todoSchema = {
  title: {
    notEmpty: {
      errorMessage: "Title cannot be empty",
    },

    isString: {
      errorMessage: "Title must be a string",
    },
  },
  completed: {
    optional: { options: { nullable: true } },
    isBoolean: {
      errorMessage: "Completed must be a boolean",
    },
  },
};
