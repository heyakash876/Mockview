import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      {/* Left Section - Image */}
      <div className="hidden md:flex w-1/2 h-full items-center justify-center">
      <img src="https://img.freepik.com/free-vector/interview-concept-illustration_114360-1678.jpg" alt="AI Interview" width="1200" height="900" layout="fill" objectfit="cover"/>

      </div>

      {/* Right Section - Sign Up */}
      <div className="flex w-full md:w-1/2 h-full items-center justify-center bg-white dark:bg-gray-800 p-6 shadow-lg">
        <SignUp
          appearance={{
            elements: {
              rootBox: "shadow-xl border border-gray-200 dark:border-gray-700 rounded-lg p-8",
              card: "bg-white dark:bg-gray-800",
              headerTitle: "text-2xl font-semibold text-gray-900 dark:text-white",
              headerSubtitle: "text-sm text-gray-600 dark:text-gray-400",
              socialButtonsBlockButton:
                "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white",
              formFieldInput:
                "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
              formButtonPrimary:
                "bg-blue-600 hover:bg-blue-700 text-white font-semibold",
            },
          }}
        />
      </div>
    </div>
  );
}
