import React from "react";
import heroImage from "../assets/LandingPage/landing-page-hero.png";
import aboutImage from "../assets/LandingPage/landing-page-about_1.png";
function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center py-40 px-6 lg:px-0 gap-10">
          {/* Left: Text & Buttons */}
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-bold text-maintextblack">
              Connect. Collaborate. Grow Your Skills.
            </h1>
            <div className="flex gap-4">
              <button className="bg-primaryblue text-white px-6 py-3 rounded-lg font-semibold hover:bg-accentpink transition-colors duration-200">
                Get Started
              </button>
              <button className="bg-white border border-primaryblue text-primaryblue px-6 py-3 rounded-lg font-semibold hover:bg-primaryblue hover:text-white transition-colors duration-200">
                Login
              </button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex-1">
            <img src={heroImage} alt="Hero Graphic" className="w-full max-w-md mx-auto" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className=" bg-black md:py-[312px]">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 px-6 lg:px-0">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-4">About Skill Link</h2>
            <p className="text-xl text-white">
              Skill Link is your community to connect, create, and collaborate. From sharing your work to teaming up on new ideas, it's a space that helps you turn curiosity into skill and skill into impact. Join a network of learners who love to build, explore, and grow together.
            </p>
          </div>
          <div className="flex-1">
            <img src={aboutImage} alt="About Graphic" className="w-full max-w-md mx-auto" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 lg:px-0">
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <img src="/assets/connect.png" alt="Connect" className="w-20 h-20 mb-4" />
            <h3 className="text-lg font-semibold text-maintextblack">Connect with peers</h3>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <img src="/assets/projects.png" alt="Projects" className="w-20 h-20 mb-4" />
            <h3 className="text-lg font-semibold text-maintextblack">Showcase projects</h3>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <img src="/assets/collaborate.png" alt="Collaborate" className="w-20 h-20 mb-4" />
            <h3 className="text-lg font-semibold text-maintextblack">Collaborate on skills</h3>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
            <img src="/assets/learn.png" alt="Learn" className="w-20 h-20 mb-4" />
            <h3 className="text-lg font-semibold text-maintextblack">Learn together</h3>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primaryblue text-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 px-6 lg:px-0">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="mb-6">
              Join Skill Link today and start connecting with like-minded peers to grow your skills and projects.
            </p>
            <button className="bg-white text-primaryblue px-6 py-3 rounded-lg font-semibold hover:bg-accentpink hover:text-white transition-colors duration-200">
              Create an Account
            </button>
          </div>
          <div className="flex-1">
            <img src="/assets/cta-image.png" alt="CTA Graphic" className="w-full max-w-md mx-auto" />
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
