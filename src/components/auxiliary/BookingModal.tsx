import { useState } from "react";
import type { TFooterPlaces } from "../../types/types";

type Props = {
  places: TFooterPlaces[];
  totalPrice: number;
  onClose: () => void;
  onConfirm: () => void;
};

// Часовые слоты
const TIME_SLOTS = [
  "10:00–11:00",
  "11:00–12:00",
  "12:00–13:00",
  "13:00–14:00",
  "14:00–15:00",
  "15:00–16:00",
  "17:00–18:00",
  "18:00–19:00",
  "19:00–20:00",
  "20:00–21:00",
  "21:00–22:00",
];

export const BookingModal = ({
  places,
  totalPrice,
  onClose,
  onConfirm,
}: Props) => {
  const [place, setPlace] = useState<string>(places[0]?.name ?? "");
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (!place || !time || !name.trim() || !phone.trim()) {
      setError("Заполните все поля, чтобы мы знали, кого и где ждать.");
      return;
    }
    setError("");
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative bg-white w-full max-w-lg p-8 rounded-4xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="self-end text-2xl text-gray-400 hover:text-black transition-colors"
          aria-label="Закрыть"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-center italic">
          Забронировать столик
        </h2>

        {/* Адрес */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Выберите ресторан
          </label>
          <div className="flex flex-col gap-2">
            {places.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setPlace(p.name)}
                className={`text-left px-4 py-3 rounded-2xl border transition ${
                  place === p.name
                    ? "border-primary bg-primary/10"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <span className="font-bold block">{p.name}</span>
                <span className="text-gray-500 text-sm">{p.addres}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Время */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Выберите время
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setTime(slot)}
                className={`px-3 py-2 rounded-xl text-sm border transition ${
                  time === slot
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Имя и телефон */}
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary outline-none"
          />
          <input
            type="tel"
            placeholder="Телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary outline-none"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <p className="text-sm text-gray-500 text-center">
          Итого к заказу: <span className="font-bold text-black">{totalPrice} ₽</span>
        </p>

        <button
          onClick={handleConfirm}
          className="w-full bg-primary py-4 text-white rounded-2xl font-bold uppercase shadow-lg shadow-primary/40 hover:scale-[1.02] transition"
        >
          Подтвердить бронь
        </button>
      </div>
    </div>
  );
};