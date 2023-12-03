import * as yup from "yup";

export const schema = yup.object().shape({
    name: yup.string().required("Name is a required field").matches(/^[A-Z]/, "Name must start with an uppercase letter"),
    age: yup.number().required("Age is a required field").positive("Age must be a positive number"),
    gmail: yup.string().email("Invalid email format").required("Gmail is a required field"),
    gender: yup
        .mixed()
        .oneOf(['male', 'female'] as const)
        .required("Gender is a required field"),
    password: yup.string()
        .required("Password is a required field")
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),

    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'The passwords dont match '),
    acceptTerms: yup.boolean().oneOf([true], "You must accept the Terms and Conditions"),
    image: yup
        .string()
        .required("Image is a required field")
        .test("fileSize", "File size is too large", (value) => {
            if (!value) return true;
            const maxSize = 5 * 1024 * 1024;
            const base64Size = (value.length * (3 / 4)) - 2;
            return base64Size <= maxSize;
        })
        .test("fileType", "Invalid file type. Only PNG and JPEG are allowed", (value) => {
            if (!value) return true;
            const validTypes = ["image/png", "image/jpeg"];
            const base64Type = value.split(",")[0].split(":")[1].split(";")[0];
            return validTypes.includes(base64Type);
        }),
    country: yup.string().required("Country is a required field"),
});