import React, { useState } from 'react';
import Link from 'next/link';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import { IoArrowBack } from "react-icons/io5";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const ResetPasswordPage: React.FC = () => {

      const [passwordVisible, setPasswordVisible] = useState(false);
      const [passwordFocused, setPasswordFocused] = useState(false);
    
      const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: Yup.object({
          email: Yup.string().email('Invalid email address').required('Email is required'),
          password: Yup.string().required('Password is required'),
        }),
        onSubmit: (values) => {
          console.log('Login credentials:', values);
        },
      });
    
      // Helper functions to check requirements
      const hasUppercase = /[A-Z]/.test(formik.values.password);
      const hasLowercase = /[a-z]/.test(formik.values.password);
      const hasNumber = /\d/.test(formik.values.password);
      const hasSpecialChar = /[@#$!%&*?]/.test(formik.values.password);
      const isLongEnough = formik.values.password.length >= 8;
    return (
        <div className="min-h-screen pt-2 pb-12 bg-gray-100 flex flex-col items-center">
            <div className="w-full lg:px-12 px-6 py-6">
                <Link href="/">
                    <button className="text-gray-700 flex items-center gap-3 font-medium">
                        <IoArrowBack />
                        <span className="text-primary font-semibold">Back</span>
                    </button>
                </Link>
            </div>

            <div className="bg-white shadow-sm border-2 mt-12 rounded-lg p-8 lg:w-full w-[90%] max-w-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Reset Password</h1>

                <form className="space-y-6" >
                    {/* <p className="text-xs text-gray-800 mt-1">
                        We will send you a one time link at the email address you used for your account to regain your password
                    </p> */}
                    
                    <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800">
              Password
            </label>
            <div className="mt-1 flex justify-between pr-4 items-center border border-black rounded-md relative">
              <Input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  setPasswordFocused(false); // Remove focus state when input is blurred
                }}
                onFocus={() => setPasswordFocused(true)} // Set focus state when input is focused
                placeholder="********"
              />
              <div
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-2 top-2 cursor-pointer">
                {passwordVisible ? (
                  <EyeOff size={25} />
                ) : (
                  <Eye size={25} />
                )}
              </div>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}

            {/* Show password requirements only if password field is focused */}
            {passwordFocused && (
              <div className="mt-2 space-y-1 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <span
                    className={
                      isLongEnough ? "text-green-500" : "text-red-500"
                    }>
                    Minimum 8 characters
                  </span>
                  {isLongEnough && (
                    <AiOutlineCheckCircle
                      size={18}
                      className="text-green-500"
                    />
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={
                      hasUppercase ? "text-green-500" : "text-red-500"
                    }>
                    At least one uppercase letter
                  </span>
                  {hasUppercase && (
                    <AiOutlineCheckCircle
                      size={18}
                      className="text-green-500"
                    />
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={hasNumber ? "text-green-500" : "text-red-500"}>
                    At least one number
                  </span>
                  {hasNumber && (
                    <AiOutlineCheckCircle
                      size={18}
                      className="text-green-500"
                    />
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={
                      hasSpecialChar ? "text-green-500" : "text-red-500"
                    }>
                    At least one special character
                  </span>
                  {hasSpecialChar && (
                    <AiOutlineCheckCircle
                      size={18}
                      className="text-green-500"
                    />
                  )}
                </div>
              </div>
            )}
          </div>

                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-800">
                            Confirm Password
                        </label>
                        <div className="mt-1 border border-black rounded-md">
                            <Input
                                id="email"
                                name="email"
                            // value={formik.values.email}
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            // placeholder="username@gmail.com"
                            />
                        </div>
                        {/* {formik.touched.email && formik.errors.email && (
                            <p className="text-sm text-red-500">{formik.errors.email}</p>
                        )} */}
                    </div>


                    <div className="text-center">
                        <Button type="submit" className="w-2/3 bg-[#A69880] text-white py-3">
                            Reset password
                        </Button>
                    <div className="text-center py-4">
                        <Button type="submit" className="w-2/3 bg-white text-gray-800 py-3">
                            Login
                        </Button>
                    </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;