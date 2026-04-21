import { Routes, Route, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Products from "./pages/Products";
import Login from "./pages/Login";

function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: "⚡",
      title: "Fast Backend",
      desc: "Spring Boot APIs with optimized performance and clean architecture.",
    },
    {
      icon: "🔐",
      title: "Secure Auth",
      desc: "JWT-based authentication with role-based access control.",
    },
    {
      icon: "✦",
      title: "Modern UI",
      desc: "Minimal, responsive interface built with React and Tailwind.",
    },
  ];

  return (
    <div className="bg-[#080808] text-white min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* NAVBAR */}
      <nav className="relative z-10 flex justify-between items-center px-8 md:px-16 py-5 border-b border-white/5 backdrop-blur-sm bg-[#080808]/80 sticky top-0">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg font-bold tracking-[0.3em] text-yellow-400"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          VELORA
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-8 text-sm text-gray-500"
        >
          <button onClick={() => navigate("/products")} className="hover:text-yellow-400 transition-colors duration-200 tracking-wide">
            Products
          </button>
          <button className="hover:text-yellow-400 transition-colors duration-200 tracking-wide">Features</button>
          <button className="hover:text-yellow-400 transition-colors duration-200 tracking-wide">Contact</button>
          <button
            onClick={() => navigate("/login")}
            className="border border-yellow-500/50 text-yellow-400 px-5 py-2 rounded-full text-xs tracking-widest hover:bg-yellow-400 hover:text-black transition-all duration-300"
          >
            LOGIN
          </button>
        </motion.div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-36">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-xs tracking-[0.4em] text-yellow-500/70 uppercase"
        >
          Premium Collection 2026
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-light max-w-4xl leading-[1.1] tracking-tight mb-8"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          A Premium Ecommerce{" "}
          <span className="italic text-yellow-400">Experience</span>{" "}
          Built for Modern Users
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-500 max-w-md text-base leading-relaxed mb-12 tracking-wide"
        >
          End your search, satiate your soul.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex gap-4"
        >
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-3.5 bg-yellow-400 text-black rounded-full text-sm font-semibold tracking-widest hover:bg-yellow-300 hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-400/20"
          >
            GET STARTED
          </button>
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-3.5 border border-white/10 text-gray-400 rounded-full text-sm tracking-widest hover:border-yellow-400/50 hover:text-yellow-400 transition-all duration-300"
          >
            EXPLORE
          </button>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 w-px h-16 bg-gradient-to-b from-yellow-400/50 to-transparent mx-auto"
        />
      </section>

      {/* FEATURES */}
      <section className="relative z-10 px-8 md:px-16 pb-28">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ backgroundColor: "rgba(234,179,8,0.04)" }}
              className="p-8 bg-[#0d0d0d] transition-colors duration-300 group"
            >
              <div className="text-2xl mb-4">{item.icon}</div>
              <h3 className="text-base font-semibold text-yellow-400 mb-2 tracking-wide">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 text-center text-gray-600 text-xs pb-8 tracking-widest">
        © 2026 VELORA. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/products" element={<Products />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;