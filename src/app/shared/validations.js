import React, { useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
export const Validator = () => {
  return useRef(
    new SimpleReactValidator({
      validators: {
        email: {
          message: "email is wrong",
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val, /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/);
          },
          messageReplace: (message, params) => message.replace("", this.helpers.toSentence(params)),
          required: true,
        },
        password: {
          message: "password is wrong",
          rule: (val, params, validator) => {
            return validator.helpers.testRegex(val, /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,16}$/);
          },
          messageReplace: (message, params) => message.replace("", this.helpers.toSentence(params)),
          required: true,
        },
        element: (message) => <span className="error-message">{message}</span>,
      },
    }),
  );
};