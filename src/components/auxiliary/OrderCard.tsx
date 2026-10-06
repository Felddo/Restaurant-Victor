import { Link } from "react-router-dom";
import type { TOrderCard } from "../../types/types";
import { useCart } from "../../context/CartContext";

export const OrderCard = ({ isOpen, onClose }: TOrderCard) => {
  const { cart, changeQty, removeFromCart, totalPrice, totalCount } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Клик по фону закрывает модалку */}
      <div
        className="absolute inset-0 backdrop-blur-sm bg-black/30"
        onClick={onClose}
      />

      <div
        className="relative bg-white w-full max-w-md p-8 rounded-4xl flex flex-col gap-3 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="self-end text-2xl text-gray-400 hover:text-black transition-colors"
          aria-label="Закрыть корзину"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-center italic">
          Ваш Триумфальный Заказ
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-center py-6">
            Пока здесь пусто. Самое время совершить гастрономический подвиг.
          </p>
        ) : (
          <>
            <ul className="flex flex-col gap-3 my-2">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 border-b border-gray-100 pb-3"
                >
                  <img
                    src={item.image}
                    alt={item.dish}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {item.dish}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {item.price} ₽ × {item.qty}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => changeQty(item.id, -1)}
                      className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-sm"
                      aria-label="Уменьшить количество"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm">{item.qty}</span>
                    <button
                      onClick={() => changeQty(item.id, 1)}
                      className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-sm"
                      aria-label="Увеличить количество"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-300 hover:text-red-500 text-lg leading-none ml-1"
                    aria-label="Удалить блюдо"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
              <span>Позиций: {totalCount}</span>
              <span className="text-lg font-bold text-black">
                {totalPrice} ₽
              </span>
            </div>
          </>
        )}

        {cart.length > 0 ? (
          <Link
            to="/cart"
            onClick={onClose}
            className="w-full text-center bg-primary py-4 text-white rounded-2xl font-bold uppercase shadow-lg shadow-primary/40 hover:scale-[1.02] transition-transform"
          >
            Оформить победу
          </Link>
        ) : (
          <button
            onClick={onClose}
            className="w-full bg-primary py-4 text-white rounded-2xl font-bold uppercase shadow-lg shadow-primary/40 hover:scale-[1.02] transition-transform"
          >
            Вернуться к меню
          </button>
        )}
      </div>
    </div>
  );
};