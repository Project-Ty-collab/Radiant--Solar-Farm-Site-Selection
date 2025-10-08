import React from 'react'
import solarImage from '../assets/image.png';
import mapImg from '../assets/map.png';
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router-dom";

function extractYouTubeID(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/map"); // Navigate to MapComponent
  };

  const heading = "Find the Perfect Location for Your Solar Farm";
  const youtubeUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  const videoId = extractYouTubeID(youtubeUrl);
  if (!videoId) return <p>Invalid YouTube URL</p>;

  const data = [
    { name: "Most Suitable", value: 25 },
    { name: "Moderately Suitable", value: 35 },
    { name: "Low Suitable", value: 25 },
    { name: "Not Suitable", value: 15 },
  ];

  const COLORS = ["#f2c707", "#ffb84d", "#ffc966", "#d9d9d9"];

  return (
    <div className="relative w-full bg-[#F2EBD8] ">
      {/* Image Container */}
      <div className="relative w-full h-screen" style={{ height: '72vh' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${solarImage})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
        />
        <div className="relative z-10 flex flex-col h-full px-8 md:px-16 lg:px-24 pt-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl pt-25 pb-5 font-bold text-[#f2c707] mb-2 max-w-3xl leading-tight flex flex-wrap">
            {heading.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>

          {/* Explore Button */}
          <button
            onClick={handleGetStarted}
            className="bg-[#e0b723] hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded transition-colors duration-200 w-fit"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Info Card */}
      <div className="relative flex justify-center " style={{ marginTop: '-55px' }}>
        <div className="bg-[#ffffff] rounded-lg shadow-2xl p-8 max-w-4xl w-full mx-8 z-20">
          <p className="text-black text-center font-semibold text-lg leading-relaxed">
            Discover the best locations for solar farms with data-driven insights. Our
            tool analyzes sunlight, terrain, and land use to help you make smart,
            sustainable decisions.
          </p>
        </div>
      </div>

      {/* Map Image + Text Section */}
      <div className="w-full flex justify-center pt-15 pb-5 bg-gradient-to-b bg-[#F2EBD8] to-[#fefefe]">
        <div className="bg-white shadow-lg rounded-xl flex flex-col md:flex-row max-w-6xl w-full overflow-hidden">
          <motion.div
            className="w-full p-4 md:w-1/2"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img src={mapImg} alt="Nashik Map" className="w-full h-auto object-cover rounded-lg" />
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 p-6 flex flex-col justify-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-yellow-600 mb-3">
              Region of Analysis: <br /> Nashik District
            </h2>
         <p className="text-gray-700 text-base leading-relaxed">
  Our analysis focuses on identifying the most suitable sites within Nashik to maximize solar energy output and efficiency.
  <br />  <br />
  Parameters such as <strong>NDVI</strong> and <strong>slope</strong> are analyzed to ensure optimal site selection — NDVI helps exclude densely vegetated areas, while slope ensures land suitability for solar panel installation.
  
</p>

          </motion.div>
        </div>
      </div>

   
      {/* Pie Chart Section */}
      <div className="w-full bg-[#FFFF] mx-auto py-10" style={{ height: 450 }}>
        <h2 className="text-4xl font-bold text-center mb-6">
          Land Suitability for Solar Farms in Nashik
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <ResponsiveContainer width="60%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>

          <div style={{ display: "flex", flexDirection: "column", marginLeft: 20 }}>
            {data.map((entry, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    backgroundColor: COLORS[index % COLORS.length],
                    marginRight: 8,
                    borderRadius: 4,
                  }}
                ></div>
                <span>
                  {entry.name}: {entry.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

         {/* YouTube Video */}
      <div className="relative w-full bg-[#ffffff]">
        <div className="w-full flex justify-center py-10">
          <div className="relative w-full max-w-5xl" style={{ paddingTop: "40%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>



      <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full">
        <div className="flex flex-col md:flex-row items-start justify-center gap-10 py-10 border-b border-gray-500/30">

          <div className="max-w-96">
            <p className="text-3xl font-bold">Radiant</p>                    <p className="mt-6 text-sm text-gray-500">
              A platform to analyze and select the most suitable land for solar farm installation.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <a href="#">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.167 2.5a9.1 9.1 0 0 1-2.617 1.275 3.733 3.733 0 0 0-6.55 2.5v.833a8.88 8.88 0 0 1-7.5-3.775s-3.333 7.5 4.167 10.833a9.7 9.7 0 0 1-5.834 1.667C8.333 20 17.5 15.833 17.5 6.25q0-.35-.067-.692A6.43 6.43 0 0 0 19.167 2.5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 15.833c-4.167 1.25-4.167-2.084-5.833-2.5m11.666 5v-3.225a2.8 2.8 0 0 0-.783-2.175c2.616-.292 5.366-1.283 5.366-5.833a4.53 4.53 0 0 0-1.25-3.125 4.22 4.22 0 0 0-.075-3.142s-.983-.292-3.258 1.233a11.15 11.15 0 0 0-5.833 0C5.225.541 4.242.833 4.242.833a4.22 4.22 0 0 0-.075 3.142 4.53 4.53 0 0 0-1.25 3.15c0 4.516 2.75 5.508 5.366 5.833a2.8 2.8 0 0 0-.783 2.15v3.225" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.333 6.667a5 5 0 0 1 5 5V17.5H15v-5.833a1.667 1.667 0 0 0-3.334 0V17.5H8.333v-5.833a5 5 0 0 1 5-5M5 7.5H1.667v10H5zM3.333 5a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          <div className="w-1/2 flex flex-wrap md:flex-nowrap justify-between">
            <div>
              <h2 className="font-semibold text-gray-900 mb-5">RESOURCES</h2>
              <ul className="text-sm text-gray-500 space-y-2 list-none">
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Tutorials</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Community</a></li>
              </ul>
            </div>
            <div>

              <div className="text-sm text-gray-500 space-y-2 list-none">
                <li><a href="#">About</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
              </div>
            </div>
          </div>

        </div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-500">
          Copyright 2024 © <a href="https://prebuiltui.com">PrebuiltUI</a>. All Right Reserved.
        </p>
      </footer>
    </div>
  )
}

export default Home;
