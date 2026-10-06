import type { TDISH } from "../../types/types";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";

export const Block = ({ id, dish, description, price, image }: TDISH) => {
  const { addToCart } = useCart();

  return (
    <motion.li
      className="group relative overflow-hidden rounded-4xl flex flex-col justify-end h-[450px] w-full shadow-2xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -10 }}
    >
      <motion.img
        src={image}
        alt={`Блюдо ${dish}`}
        className="absolute inset-0 w-full h-full object-cover duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

      <div className="relative p-8 z-10">
        <div className="w-22 h-1 mb-4 rounded-full bg-yellow-500" />
        <h2 className="text-3xl font-serif font-bold text-white mb-2">{dish}</h2>

        <div className="max-h-0 overflow-hidden group-hover:max-h-40 duration-500">
          <p className="text-gray-200 text-sm mb-4">{description}</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-yellow-600 font-medium text-xl">{price} ₽</span>

          <button
            onClick={() => addToCart({ id, dish, description, price, image })}
            className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-full hover:bg-yellow-400 hover:scale-105 transition"
          >
            В корзину
          </button>
        </div>
      </div>
    </motion.li>
  );
};