import type { TOrderCard } from "../../types/types";

export const OrderCard = ({isOpen, onClose}: TOrderCard) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center">
          
            <div className="absolute inset-0 backdrop-blur-sm"/>
            <div className="relative bg-white w-full max-w-md p-8 rounded-4xl flex flex-col gap-3">
            
                <button onClick={onClose} className="text-2xl text-gray-400 hover:text-black">
                    ×
                </button>

                <h2 className="text-2xl font-bold text-center italic">Ваш Триумфальный Заказ</h2>

                <p className="text-gray-600 text-center">
                    Электротурбозалупачес
                </p>
                    
                <button className="w-full bg-primary py-4 text-white rounded-2xl font-bold uppercase shadow-lg shadow-primary/40">
                    Оформить победу
                </button>
                
          </div>
        </div>

    );
};