import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Header } from "./header/Header";
import { FOOTER_PLACES } from "../data/data";
import { BookingModal } from "./auxiliary/BookingModal";

export const CartPage = () => {
  const { cart, changeQty, removeFromCart, clearCart, totalPrice } = useCart();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleBooked = () => {
    setIsBookingOpen(false);
    setIsSuccess(true);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-32">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-serif font-bold">Ваш Триумфальный Заказ</h1>
          <Link to="/" className="text-primary hover:underline">
            ← Вернуться в меню
          </Link>
        </div>

        {isSuccess ? (
          <div className="bg-white rounded-2xl p-8 shadow text-center">
            <h2 className="text-2xl font-bold mb-2">Столик забронирован!</h2>
            <p className="text-gray-600 mb-6">
              Мы ждём вас. Начнем готовить заказ к указанному времени.
            </p>
            <Link
              to="/"
              className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-full hover:scale-105 transition"
            >
              Вернуться в меню
            </Link>
          </div>
        ) : cart.length === 0 ? (
          <p className="text-gray-500 text-lg">
            Пока здесь пусто. Самое время совершить гастрономический подвиг.
          </p>
        ) : (
          <>
            <ul className="flex flex-col gap-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow"
                >
                  <img
                    src={item.image}
                    alt={item.dish}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="font-bold text-lg">{item.dish}</h2>
                    <p className="text-gray-500 text-sm">{item.price} ₽</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => changeQty(item.id, -1)}
                      className="w-8 h-8 rounded-full bg-neutral-200 hover:bg-neutral-300"
                    >
                      −
                    </button>
                    <span className="w-6 text-center">{item.qty}</span>
                    <button
                      onClick={() => changeQty(item.id, 1)}
                      className="w-8 h-8 rounded-full bg-neutral-200 hover:bg-neutral-300"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-bold w-24 text-right">
                    {item.price * item.qty} ₽
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between mt-8">
              <button
                onClick={clearCart}
                className="text-gray-500 hover:text-red-500"
              >
                Очистить корзину
              </button>
              <p className="text-2xl font-bold">Итого: {totalPrice} ₽</p>
            </div>

            <button
              onClick={() => setIsBookingOpen(true)}
              className="w-full mt-6 bg-primary text-white font-bold uppercase py-4 rounded-2xl shadow-lg shadow-primary/40 hover:scale-[1.01] transition"
            >
              Забронировать столик
            </button>
          </>
        )}
      </main>

      {isBookingOpen && (
        <BookingModal
          places={FOOTER_PLACES}
          totalPrice={totalPrice}
          onClose={() => setIsBookingOpen(false)}
          onConfirm={handleBooked}
        />
      )}
    </div>
  );
};