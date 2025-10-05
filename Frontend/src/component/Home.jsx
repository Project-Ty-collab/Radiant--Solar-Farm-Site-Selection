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
    <div className="relative w-full bg-fuchsia-50 ">
      {/* Image Container */}
      <div className="relative w-full h-screen" style={{ height: '75vh' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${solarImage})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
        />
        <div className="relative z-10 flex flex-col h-full px-8 md:px-16 lg:px-24 pt-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl pt-35 pb-5 font-bold text-[#f2c707] mb-2 max-w-3xl leading-tight flex flex-wrap">
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
        <div className="bg-[#e8e8e4] rounded-lg shadow-2xl p-8 max-w-4xl w-full mx-8 z-20">
          <p className="text-black text-center font-semibold text-lg leading-relaxed">
            Discover the best locations for solar farms with data-driven insights. Our
            tool analyzes sunlight, terrain, and land use to help you make smart,
            sustainable decisions.
          </p>
        </div>
      </div>

      {/* Map Image + Text Section */}
      <div className="w-full flex justify-center pt-30 pb-5 bg-gradient-to-b from-fuchsia-50 to-[#fefefe]">
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
            <h2 className="text-xl font-bold text-yellow-600 mb-3">
              Region of Analysis: <br /> Nashik District
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Our analysis focuses on identifying the most suitable sites within Nashik
              to maximize energy output and efficiency.
            </p>
          </motion.div>
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

      {/* Pie Chart Section */}
      <motion.div
        className="w-full bg-[#FFFF] mx-auto py-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ height: 450 }}
      >
        <h2 className="text-4xl font-bold text-center mb-6">
          Land Suitability for Solar Farms in Nashik
        </h2>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <ResponsiveContainer width="60%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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
              <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                <div style={{
                  width: 18,
                  height: 18,
                  backgroundColor: COLORS[index % COLORS.length],
                  marginRight: 8,
                  borderRadius: 4
                }}></div>
                <span>{entry.name}: {entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Contact Form */}
      <form className="flex flex-col items-center bg-fuchsia-50 py-15 text-sm">
        <p className="text-lg text-[#e0b723] font-medium pb-2">Contact Us</p>
        <h1 className="text-4xl font-semibold text-slate-700 pb-4">Get in touch with us</h1>
        <p className="text-sm text-gray-500 text-center pb-10">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
          Lorem Ipsum has been the industry's standard dummy text.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
          <div className="w-full">
            <label className="text-black/70" htmlFor="name">Your Name</label>
            <input className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300" type="text" required />
          </div>
          <div className="w-full">
            <label className="text-black/70" htmlFor="name">Your Email</label>
            <input className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300" type="email" required />
          </div>
        </div>

        <div className="mt-6 w-[350px] md:w-[700px]">
          <label className="text-black/70" htmlFor="name">Message</label>
          <textarea className="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded resize-none outline-none focus:border-indigo-300" required></textarea>
        </div>

        <button type="submit" className="mt-5 bg-[#e0b723] hover:bg-yellow-500 text-white h-12 w-56 px-4 rounded active:scale-95 transition">Send Message</button>
      </form>
    </div>
  )
}

export default Home;
