import { useState } from "react";
import type { TFooterPlaces } from "../../types/types";

type Props = {
  places: TFooterPlaces[];
  totalPrice: number;
  onClose: () => void;
  onConfirm: (data: {
    place: string;
    date: string;
    time: string;
    guests: number;
    name: string;
    phone: string;
  }) => void;
};

const TIME_SLOTS = [
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

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Сегодняшняя дата в формате YYYY-MM-DD
const getTodayISO = () => {
  const d = new Date();
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tz).toISOString().split("T")[0];
};

export const BookingModal = ({ places, totalPrice, onClose, onConfirm }: Props) => {
  const today = getTodayISO();

  const [place, setPlace] = useState<string>(places[0]?.name ?? "");
  const [date, setDate] = useState<string>(today);
  const [time, setTime] = useState<string>("");
  const [guests, setGuests] = useState<number>(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (!place || !date || !time || !name.trim() || !phone.trim()) {
      setError("Заполните все поля, чтобы мы знали, кого, где и когда ждать.");
      return;
    }
    setError("");
    onConfirm({ place, date, time, guests, name, phone });
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

        {/* Дата и количество гостей */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Дата
            </label>
            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Гостей
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary outline-none bg-white"
            >
              {GUEST_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "гость" : n < 5 ? "гостя" : "гостей"}
                </option>
              ))}
            </select>
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
          Итого к заказу:{" "}
          <span className="font-bold text-black">{totalPrice} ₽</span>
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