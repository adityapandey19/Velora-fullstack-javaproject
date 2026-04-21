import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts } from "../api/productApi";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

function ProductCard({ p }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      variants={cardVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative bg-[#0d0d0d] border border-white/5 rounded-2xl overflow-hidden flex flex-col hover:border-yellow-400/30 transition-all duration-500"
      style={{ boxShadow: hovered ? "0 0 40px rgba(234,179,8,0.07)" : "none" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52 bg-[#111]">
        <motion.img
          src={p.imageUrl}
          alt={p.name}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800"; }}
        />
        {/* Stock badge */}
        {p.stock <= 5 && (
          <div className="absolute top-3 left-3 bg-red-500/90 text-white text-[10px] px-2.5 py-1 rounded-full tracking-wider font-medium">
            ONLY {p.stock} LEFT
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-white font-semibold text-base leading-snug mb-1 group-hover:text-yellow-400 transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>
          {p.name}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1 line-clamp-2">
          {p.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-yellow-400 text-xl font-semibold tracking-tight">
            ₹{p.price.toLocaleString("en-IN")}
          </span>
          <span className="text-gray-600 text-xs">
            {p.stock} in stock
          </span>
        </div>

        <button
          onClick={handleAdd}
          className={`w-full py-2.5 rounded-xl text-xs font-semibold tracking-widest transition-all duration-300 ${
            added
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 hover:bg-yellow-400 hover:text-black"
          }`}
        >
          {added ? "✓ ADDED" : "ADD TO CART"}
        </button>
      </div>
    </motion.div>
  );
}

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const data = await getProducts(token);
      setProducts(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#080808] text-white min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-yellow-500/4 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* NAVBAR */}
      <nav className="relative z-10 flex justify-between items-center px-8 md:px-16 py-5 border-b border-white/5 sticky top-0 backdrop-blur-sm bg-[#080808]/80">
        <button
          onClick={() => navigate("/")}
          className="text-lg font-bold tracking-[0.3em] text-yellow-400 hover:text-yellow-300 transition-colors"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          VELORA
        </button>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="tracking-widest">{filtered.length} PRODUCTS</span>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 py-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-xs text-yellow-500/60 tracking-[0.4em] uppercase mb-2">Our Collection</p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            All Products
          </h1>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative mb-10 max-w-md"
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-white/4 border border-white/8 text-white placeholder-gray-600 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-yellow-400/40 focus:bg-white/6 transition-all duration-300"
            onChange={(e) => setSearch(e.target.value)}
          />
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-[#0d0d0d] border border-white/5 rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 text-gray-600"
          >
            <div className="text-4xl mb-4">✦</div>
            <p className="tracking-widest text-sm">NO PRODUCTS FOUND</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <AnimatePresence>
              {filtered.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <footer className="relative z-10 text-center text-gray-700 text-xs pb-8 tracking-widest mt-16">
        © 2026 VELORA. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}

export default Products;