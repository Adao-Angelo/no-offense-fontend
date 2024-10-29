import * as Yup from "yup";

export const UserSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Email must be valid")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  avatar: Yup.string().url("Avatar URL must be valid").optional(),
});

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Email must be valid")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const PublicationSchema = Yup.object({
  userId: Yup.string().required("user id is required"),
  imageUrl: Yup.string().required("imageUrl is required"),
  imageDescription: Yup.string(),
  text: Yup.string().required("text is required"),
});
