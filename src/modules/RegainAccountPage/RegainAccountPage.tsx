import React from 'react';
import Link from 'next/link';
import { Input } from '../../components/ui/Input/Input';
import { Button } from '../../components/ui/Button/Button';
import { IoArrowBack } from "react-icons/io5";
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

const RegainAccountPage: React.FC = () => {

    // const formik = useFormik({
    //     initialValues: {
    //         email: '',
    //         password: '',
    //     },
    //     validationSchema: Yup.object({
    //         email: Yup.string().email('Invalid email address').required('Email is required'),
    //         password: Yup.string().required('Password is required'),
    //     }),
    //     onSubmit: (values) => {
    //         // Add logic for login here (match against saved users)
    //     },
    // });

    // // Helper functions to check requirements
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

            <div className="bg-white shadow-sm border-2 mt-12 rounded-lg p-8 lg:w-full w-[90%] max-w-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Regain Account</h1>

                <form className="space-y-6" >
                    <p className="text-xs text-gray-800 mt-1">
                        We will send you a one time link at the email address you used for your account to regain your password
                    </p>
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

                    <div className="flex items-center my-2">
                        <div className="flex-grow border-t border-black"></div>
                        <span className="mx-4 text-gray-700 text-xs">Or</span>
                        <div className="flex-grow border-t border-black"></div>
                    </div>

                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-800">
                            Display name
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
                            Send regain link
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default RegainAccountPage;