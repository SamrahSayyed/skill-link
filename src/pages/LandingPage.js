import React from "react";
import heroImage from "../assets/LandingPage/landing-page-hero.png";
import aboutImage from "../assets/LandingPage/landing-page-about_1.png";
import feature1 from "../assets/LandingPage/landing-page-features_1.png";
import feature2 from "../assets/LandingPage/landing-page-features_2.png";
import feature3 from "../assets/LandingPage/landing-page-features_3.png";
import feature4 from "../assets/LandingPage/landing-page-features_4.png";
import cta from "../assets/LandingPage/landing-page-cta.png";
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
      <section className="py-40 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-0 text-center">
      {/* Section Title */}
      <h2 className="text-5xl font-bold text-maintextblack mb-40">Features</h2>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
        <img src={feature1} alt="Connect" className="md:w-[310px] md:h-[200px] mb-4" />
        <h3 className="text-lg font-semibold text-maintextblack">Collaborate on Skills</h3>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
        <img src={feature2} alt="Projects" className="md:w-[310px] md:h-[200px] mb-4" />
        <h3 className="text-lg font-semibold text-maintextblack">Learn Together</h3>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
        <img src={feature3} alt="Collaborate" className="md:w-[310px] md:h-[200px] mb-4" />
        <h3 className="text-lg font-semibold text-maintextblack">Showcase Projects</h3>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
        <img src={feature4} alt="Learn" className="md:w-[310px] md:h-[200px] mb-4" />
        <h3 className="text-lg font-semibold text-maintextblack">Connect with peers</h3>
      </div>
    </div>
  </div>
</section>


      {/* CTA Section */}
      <section className="relative bg-white py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 lg:px-12">
        
        {/* LEFT SIDE – Text */}
        <div className="text-center md:text-left flex-[0.7] z-10">
          <p className="text-lg text-black">
            Join the Skill Link community!
          </p>
          <p className="text-lg text-black mb-8">
            Meet awesome people, explore new projects, and grow your skills together. Collaboration starts with one click - ready to dive in?
            </p> 
            
          
        </div>

        {/* RIGHT SIDE – Gradient Shape + Image + Button */}
        <div className="relative flex-1 mt-16 md:mt-0">
          {/* Gradient Rectangle (tilted background) */}
          <div
            className="absolute right-[-50%] top-1/2 transform -translate-y-1/2 rotate-[30deg] w-[900px] h-[1300px] bg-gradient-to-br from-primaryblue to-accentpink rounded-3xl opacity-90"
          ></div>

          {/* Image + CTA Button on top */}
          <div className="relative z-10 flex flex-col items-center justify-center md:ml-[200px]">
            <img
              src={cta}
              alt="CTA Illustration"
              className="w-[300px] md:w-[400px] object-contain mb-6"
            />
            <button className="bg-gray-100 hover:bg-white text-black px-8 py-3 rounded-2xl text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default LandingPage;
