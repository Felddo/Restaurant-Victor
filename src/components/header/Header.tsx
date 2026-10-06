import { useState } from "react";
import { NameVictor } from "../auxiliary/NameVictor";
import { OrderCard } from "../auxiliary/OrderCard";

export const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

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

          <div className="flex justify-center">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="bg-primary px-6 py-3 text-white font-bold rounded-full hover:scale-105 duration-200"
            >
              Корзина
            </button>
          </div>
        </div>
      </div>

      <OrderCard isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}/>

    </header>
  );
};