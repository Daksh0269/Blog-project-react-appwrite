import React from 'react';
import { FaGithub, FaEnvelope } from 'react-icons/fa';

function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-6 sm:px-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 sm:p-12 transition-all duration-300">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">About Me</h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-6 text-center">
          Hey there! I'm <span className="font-semibold text-gray-800">Daksh</span>, a passionate full-stack developer building production-ready apps using React, Appwrite, and other modern tools. I love turning ideas into beautifully crafted interfaces and solving real-world problems through code.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
          <a
            href="https://github.com/Daksh0269" // replace with your actual GitHub
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-black border border-gray-300 hover:border-black transition px-4 py-2 rounded-lg"
          >
            <FaGithub className="text-xl" />
            <span className="text-sm sm:text-base">GitHub</span>
          </a>

          <a
            href="mailto:daksh@example.com" // replace with your actual email
            className="flex items-center gap-2 text-gray-700 hover:text-black border border-gray-300 hover:border-black transition px-4 py-2 rounded-lg"
          >
            <FaEnvelope className="text-xl" />
            <span className="text-sm sm:text-base">daksh.webdev.x@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
