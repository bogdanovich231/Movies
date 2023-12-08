import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is a required field")
    .matches(/^[A-Z]/, "Name must start with an uppercase letter"),
  age: yup
    .number()
    .required("Age is a required field")
    .positive("Age must be a positive number"),
  gmail: yup
    .string()
    .email("Invalid email format")
    .required("Gmail is a required field"),
  gender: yup
    .mixed()
    .oneOf(["male", "female"] as const)
    .required("Gender is a required field"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters")
    .test('password-complexity', function (value: string = ''):
      | true
      | yup.ValidationError {
      const lowercaseRegex = /[a-z]/;
      const uppercaseRegex = /[A-Z]/;
      const numberRegex = /[0-9]/;
      const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]/;

      const errors = [];

      if (!lowercaseRegex.test(value))
        errors.push('one lowercase letter in latin');
      if (!uppercaseRegex.test(value))
        errors.push('one capital letter in latin');
      if (!numberRegex.test(value)) errors.push('one digit');
      if (!symbolRegex.test(value)) errors.push('one special character');

      if (errors.length > 0) {
        return this.createError({
          message: `password complexity - ${4 - errors.length
            }/4: password must contain at least ${errors.join(', ')}`,
        });
      }
      return true;
    }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "The passwords dont match "),
  acceptTerms: yup
    .boolean()
    .oneOf([true], "You must accept the Terms and Conditions"),
  image: yup
    .string()
    .required("Image is a required field")
    .test("fileSize", "File size is too large", (value) => {
      if (!value) return true;
      const maxSize = 5 * 1024 * 1024;
      const base64Size = value.length * (3 / 4) - 2;
      return base64Size <= maxSize;
    })
    .test(
      "fileType",
      "Invalid file type. Only PNG and JPEG are allowed",
      (value) => {
        if (!value) return true;
        const validTypes = ["image/png", "image/jpeg"];
        const base64Type = value.split(",")[0].split(":")[1].split(";")[0];
        return validTypes.includes(base64Type);
      },
    ),
  country: yup.string().required("Country is a required field"),
});
