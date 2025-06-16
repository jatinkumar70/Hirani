import { useFormik } from "formik";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState, useCallback } from "react";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBack } from "react-icons/io5";
import * as Yup from "yup";
import { Button } from "../../components/ui/Button/Button";
import { Input } from "../../components/ui/Input/Input";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";
import { useRouter } from "next/router";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { login, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible((prev) => !prev);
  }, []);

  const formik = useFormik({
    initialValues: { emailOrUsername: "", password: "" },
    validationSchema: Yup.object({
      emailOrUsername: Yup.string().required("Email or Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setError(null);
      try {
        await login(values.emailOrUsername, values.password, rememberMe);
        router.push("/my-account");
      } catch (err: any) {
        setError(err.message);
      }
    },
  });

  return (
    <div className="min-h-screen pt-2 pb-12 bg-gray-100 flex flex-col items-center">
      <div className="w-full px-6 lg:px-12 py-6">
        <Link href="/">
          <button className="text-gray-700 flex items-center gap-3 font-medium">
            <IoArrowBack />
            <span className="text-primary font-semibold">Back</span>
          </button>
        </Link>
      </div>

      <div className="bg-white shadow-sm border-2 rounded-lg p-8 w-[90%] lg:w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        {/* {error && <p className="text-center text-red-500 mb-4">{error}</p>} */}

        <form className="space-y-6" onSubmit={formik.handleSubmit} noValidate>
          <div>
            <label
              htmlFor="emailOrUsername"
              className="block text-sm font-medium text-gray-800">
              Email or Username
            </label>
            <div className="mt-1 border border-black rounded-md">
              <Input
                id="emailOrUsername"
                name="emailOrUsername"
                value={formik.values.emailOrUsername}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter email or username"
                autoComplete="username"
              />
            </div>
            {formik.touched.emailOrUsername &&
              formik.errors.emailOrUsername && (
                <p className="text-sm text-red-500">
                  {formik.errors.emailOrUsername}
                </p>
              )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-800">
              Password
            </label>
            <div className="mt-1 flex pr-4 items-center border border-black rounded-md relative">
              <Input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="********"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-2">
                {passwordVisible ? <EyeOff size={25} /> : <Eye size={25} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>

          <div className="flex items-start">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 text-primary border-gray-300 rounded"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 font-semibold text-sm text-gray-800">
              Remember me on this device
            </label>
          </div>

          <div className="text-center">
            <Button
              type="submit"
              className="w-1/2 bg-[#A69880] text-white py-3"
              disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2 text-base font-medium">
                  <Loader2 className="animate-spin" size={20} /> Please wait
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </div>

          <p className="text-center text-sm text-gray-800">
            <Link href="#">
              <span className="text-primary font-semibold">
                I forgot my email or password
              </span>
            </Link>
          </p>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-black"></div>
            <span className="mx-4 text-gray-700 text-xs">Or</span>
            <div className="flex-grow border-t border-black"></div>
          </div>

          <div className="space-y-4 text-center">
            <Button
              type="button"
              className="w-2/3 gap-4 shadow-lg bg-white text-gray-500 font-semibold py-3">
              <FcGoogle size={20} /> Continue with Google
            </Button>
            <Button
              type="button"
              className="w-2/3 gap-4 shadow-lg bg-blue-600 text-white py-3">
              <FaFacebook size={20} /> Continue with Facebook
            </Button>
            <Button
              type="button"
              className="w-2/3 gap-4 shadow-lg bg-black text-white py-3">
              <FaApple size={20} /> Continue with Apple
            </Button>
          </div>

          <p className="text-center text-sm text-gray-800">
            Don&apos;t have an account?{" "}
            <Link href="/register">
              <span className="text-primary underline">Register</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
