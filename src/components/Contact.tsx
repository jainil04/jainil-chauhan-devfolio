"use client";

import { PiLinkedinLogoThin, PiGithubLogoThin } from "react-icons/pi";
import { CiMail } from "react-icons/ci";

const Contact = () => {
  const iconSize = "text-3xl md:text-4xl lg:text-5xl";
  const iconBaseStyle =
    "transition-all duration-200 transform hover:scale-110 hover:-translate-y-1";

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <h2 className="text-2xl font-semibold text-black dark:text-white">Let&#39;s Connect</h2>

      <div className="flex items-center gap-8">
        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/jainil-chauhan-04041994"
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconSize} ${iconBaseStyle} text-blue-700 dark:text-white hover:text-blue-500 dark:hover:text-blue-400`}
        >
          <PiLinkedinLogoThin />
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/jainil04"
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconSize} ${iconBaseStyle} text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300`}
        >
          <PiGithubLogoThin />
        </a>

        {/* Gmail */}
        <a
          href="mailto:jainil04@gmail.com"
          className={`${iconSize} ${iconBaseStyle} text-red-600 dark:text-white hover:text-red-400 dark:hover:text-red-300`}
        >
          <CiMail />
        </a>
      </div>
    </div>
  );
};

export default Contact;
