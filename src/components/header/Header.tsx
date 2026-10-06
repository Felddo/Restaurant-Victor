import { useState } from "react";
import { Link } from "react-router-dom";
import { NameVictor } from "../auxiliary/NameVictor";
import { OrderCard } from "../auxiliary/OrderCard";
import { useCart } from "../../context/CartContext";

export const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalCount } = useCart();

  return (
    <header className="sticky top-4 z-50 mx-[3%]">
      <div className="px-[8%] md:px-[5%] h-20 bg-white/60 backdrop-blur-lg shadow-lg rounded-4xl">
        <div className="grid grid-cols-3 items-center h-full">
          <div className="flex flex-col items-center text-center text-xs uppercase tracking-[3px] text-gray-500">
            <span>Пришел</span>
            <span>Увидел</span>
            <span>Victor</span>
          </div>

          <div className="flex justify-center">
            <NameVictor />
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-primary px-6 py-3 text-white font-bold rounded-full hover:scale-105 duration-200"
            >
              Корзина
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>

            <Link
              to="/cart"
              className="hidden md:inline-flex items-center px-4 py-3 text-primary font-bold rounded-full border border-primary hover:bg-primary hover:text-white transition"
            >
              Открыть страницу
            </Link>
          </div>
        </div>
      </div>

      <OrderCard isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};