import React, { useState } from "react";
import Link from "next/link";
import { Input } from "../../components/ui/Input/Input";
import { Button } from "../../components/ui/Button/Button";
import { IoArrowBack } from "react-icons/io5";
// import { BiHide } from "react-icons/bi";
// import { FaRegEye, FaCheck } from "react-icons/fa";
import { CircleCheck, EyeOff, Eye } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { saveUser } from "../../data/data";

const RegisterPage: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false); // Track if password field is focused
  const router = useRouter(); // For navigation

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      terms: false,
      notifications: false,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(24, "Password must be less than 24 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(
          /[@#$!%&*?]/,
          "Password must contain at least one special character"
        ),
      terms: Yup.boolean().oneOf(
        [true],
        "You must accept the terms and conditions"
      ),
    }),
    onSubmit: (values) => {
      // Save user data to mock "database"
      saveUser({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });

      // Redirect to login page after registration
      router.push("/login");
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full lg:px-12 px-8 py-6">
        <Link href="/">
          <button className="text-gray-700 flex items-center gap-2 font-medium">
            <IoArrowBack />
            <span className="text-primary">Back</span>
          </button>
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-sm border-2 mt-8 lg:mt-0 p-8 w-[90%] lg:w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="full-name"
              className="block text-sm font-medium text-gray-700">
              Full name
            </label>
            <div className="mt-1 border border-black rounded-md">
              <Input
                id="full-name"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Type your name as spelled in your passport."
              />
            </div>
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-sm text-red-500">{formik.errors.fullName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800">
              Email address
            </label>
            <div className="mt-1 border border-black rounded-md">
              <Input
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="username@gmail.com"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}
            <p className="text-xs text-gray-800 mt-1">
              Your email will be used to verify your account and keep it safe.
            </p>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800">
              Create a password
            </label>
            <div className="mt-1 flex justify-between pr-4 items-center border border-black rounded-md relative">
              <Input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onFocus={() => setPasswordFocused(true)} // Set focus
                // onBlur={() => setPasswordFocused(false)}  // Unset focus
                placeholder="********"
              />
              <div
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-2 top-2 cursor-pointer">
                {passwordVisible ? <EyeOff size={25} /> : <Eye size={25} />}
              </div>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}

            {/* Password validation text and checkmarks only shown when field is focused */}
            {passwordFocused && (
              <div className="mt-2 space-y-1 text-sm text-gray-500">
                <div
                  className={
                    formik.values.password.length >= 8
                      ? "text-green-500"
                      : "text-red-500"
                  }>
                  {formik.values.password.length >= 8 && (
                    <CircleCheck className="inline text-green-500 mr-2" />
                  )}
                  Minimum 8 characters
                </div>
                <div
                  className={
                    /[A-Z]/.test(formik.values.password)
                      ? "text-green-500"
                      : "text-red-500"
                  }>
                  {/[A-Z]/.test(formik.values.password) && (
                    <CircleCheck className="inline text-green-500 mr-2" />
                  )}
                  At least one uppercase letter
                </div>
                <div
                  className={
                    /\d/.test(formik.values.password)
                      ? "text-green-500"
                      : "text-red-500"
                  }>
                  {/\d/.test(formik.values.password) && (
                    <CircleCheck className="inline text-green-500 mr-2" />
                  )}
                  At least one number
                </div>
                <div
                  className={
                    /[@#$!%&*?]/.test(formik.values.password)
                      ? "text-green-500"
                      : "text-red-500"
                  }>
                  {/[@#$!%&*?]/.test(formik.values.password) && (
                    <CircleCheck className="inline text-green-500 mr-2" />
                  )}
                  At least one special character
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formik.values.terms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="h-4 w-4 text-primary border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="ml-2 text-sm font-semibold text-gray-800">
                Agree with our{" "}
                <a href="#" className="text-primary underline">
                  Terms and Conditions
                </a>
              </label>
            </div>
            {formik.touched.terms && formik.errors.terms && (
              <p className="text-sm text-red-500">{formik.errors.terms}</p>
            )}

            <div className="flex items-start">
              <input
                id="notifications"
                name="notifications"
                type="checkbox"
                checked={formik.values.notifications}
                onChange={formik.handleChange}
                className="h-4 w-4 text-primary border-gray-300 rounded"
              />
              <label
                htmlFor="notifications"
                className="ml-2 text-sm font-semibold text-gray-800">
                I want to be notified about news and offers by bnbme
              </label>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <Button type="submit" className="w-3/5 bg-black text-white py-3">
              Register
            </Button>
          </div>

          <p className="text-center text-sm text-gray-600">
            I already have an account.{" "}
            <Link href="/login">
              <span className="text-primary underline">Log in</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
