"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { Upload, Trash2 } from "lucide-react";
import Image from "next/image";
import Section from "../../common/Section/Section";

export default function ProfileSettings() {
  // State for form fields
  const [formData, setFormData] = useState({
    displayName: "",
    firstName: "",
    familyName: "",
    fullName: "",
    cardNumber: "",
    cardCvv: "",
    phoneNumber: "",
    oldPassword: "",
    newPassword: "",
    bio: "",
  });

  // State for profile picture
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle profile picture upload
  const handleProfilePictureUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile picture delete
  const handleProfilePictureDelete = () => {
    setProfilePicture(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    alert("Changes saved successfully!");
  };

  return (
    <Section className="pt-32 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
          Save changes
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left sidebar navigation */}
        <div className="w-full md:w-36">
          <nav className="flex flex-col space-y-4">
            <a href="#name" className="font-medium">
              Name
            </a>
            <a href="#contact" className="font-medium">
              Contact
            </a>
            <a href="#payment" className="font-medium">
              Payment details
            </a>
            <a href="#password" className="font-medium">
              Password
            </a>
          </nav>
        </div>

        {/* Main content area */}
        <div className="w-full md:w-2/4 space-y-8">
          {/* Name section */}
          <div
            id="name"
            className="bg-white p-8 rounded-xl border border-gray-300 shadow-md">
            <h2 className="text-xl font-bold mb-4">Name</h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="displayName"
                  className="block mb-1 font-semibold">
                  Display name
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  placeholder="Type here"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-600 rounded-md"
                />
                <p className="text-sm text-gray-500 mt-1">
                  What name do you want the hosts to see?
                </p>
              </div>

              <div>
                <label htmlFor="firstName" className="block mb-1 font-semibold">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Type here"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-600 rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="familyName"
                  className="block mb-1 font-semibold">
                  Family name
                </label>
                <input
                  type="text"
                  id="familyName"
                  name="familyName"
                  placeholder="Type here"
                  value={formData.familyName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-600 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Contact details section */}
          <div
            id="contact"
            className="bg-white p-8 rounded-xl border border-gray-300 shadow-md">
            <h2 className="text-xl font-bold mb-4">Contact details</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block mb-1 font-semibold">
                  Full name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Type your as spelled in your passport."
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-600 rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block mb-1 font-semibold">
                  Phone number
                </label>
                <div className="flex">
                  <select className="p-2 border border-gray-600 rounded-l-md w-24">
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+91">🇮🇳 +91</option>
                  </select>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="000-000-0000"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-600 rounded-r-md border-l-0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment details placeholder */}
          <div
            id="payment"
            className="bg-white p-8 rounded-xl border border-gray-300 shadow-md space-y-4">
            <h2 className="text-xl font-bold mb-4">Payment details</h2>
            <div>
              <label htmlFor="fullName" className="block mb-1 font-semibold">
                Name on card
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Type name here"
                value={formData.fullName}
                onChange={handleInputChange}
                maxLength={23}
                className="w-full p-2 border border-gray-600 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="cardNumber" className="block mb-1 font-semibold">
                Card number
              </label>
              <input
                type="tel"
                id="cardNumber"
                name="cardNumber"
                placeholder="09353-8245-3452-1254"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-600 rounded-md"
              />
            </div>
            <div className="flex items-center gap-8">
              <div className="flex-1">
                <label htmlFor="fullName" className="block mb-1 font-semibold">
                  Expiry date
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-600 rounded-md"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="fullName" className="block mb-1 font-semibold">
                  CVV <span className="text-gray-700 cursor-help">ⓘ</span>
                </label>
                <input
                  type="text"
                  id="cardCvv"
                  name="cardCvv"
                  placeholder="***"
                  maxLength={5}
                  value={formData.cardCvv}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-600 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Password placeholder */}
          <div
            id="ChangePassword"
            className="bg-white p-8 rounded-xl border border-gray-300 shadow-md space-y-4">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <div>
              <label htmlFor="fullName" className="block mb-1 font-semibold">
                Old password
              </label>
              <input
                type="text"
                id="oldPassword"
                name="oldPassword"
                placeholder="****************"
                value={formData.oldPassword}
                onChange={handleInputChange}
                maxLength={23}
                className="w-full p-2 border border-gray-600 rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="fullName" className="block mb-1 font-semibold">
                New password
              </label>
              <input
                type="text"
                id="newPassword"
                name="newPassword"
                placeholder="****************"
                value={formData.newPassword}
                onChange={handleInputChange}
                maxLength={23}
                className="w-full p-2 border border-gray-600 rounded-md"
              />

              <p className="text-sm text-gray-600">
                Minimum 8 characters and combine capital,small,numerical and
                special characters.
              </p>
            </div>
          </div>
        </div>

        {/* Right side panel */}
        <div className="w-full md:w-2/5">
          <div className="bg-white p-8 rounded-xl border border-gray-300 shadow-md">
            <h2 className="text-xl font-bold mb-4">Profile picture</h2>

            <div className="flex justify-center mb-4">
              <div className="relative w-48 h-48 bg-gray-100 flex items-center justify-center">
                {profilePicture ? (
                  <Image
                    src={profilePicture || "/placeholder.svg"}
                    alt="Profile"
                    fill
                    className="object-cover text-gray-800"
                  />
                ) : (
                  <div className="text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleProfilePictureUpload}
                accept="image/*"
                className="hidden"
                id="profile-picture-upload"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 border border-gray-600 rounded-md"
                aria-label="Upload profile picture">
                <Upload size={20} />
              </button>
              <button
                onClick={handleProfilePictureDelete}
                className="p-2 border border-gray-600 rounded-md"
                aria-label="Delete profile picture"
                disabled={!profilePicture}>
                <Trash2
                  size={20}
                  className={!profilePicture ? "text-gray-600" : ""}
                />
              </button>
            </div>

            <div className="mt-6">
              <label htmlFor="bio" className="block mb-1 font-semibold">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                placeholder="Type here"
                value={formData.bio}
                onChange={handleInputChange}
                maxLength={600}
                rows={5}
                className="w-full p-2 border border-gray-600 rounded-md resize-none"
              />
              <p className="text-sm text-gray-500 text-right mt-1">
                Max. {600 - formData.bio.length} characters
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10 mx-auto flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
          Save changes
        </button>
      </div>
    </Section>
  );
}
