import { useEffect, useState } from "react";
import type { TFooterPlaces } from "../../types/types";

type TBooking = {
  place: string;
  date: string;
  dateLabel: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
};

type Props = {
  places: TFooterPlaces[];
  totalPrice: number;
  onClose: () => void;
  onConfirm: (data: TBooking) => void;
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

const MONTHS = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

const getToday = () => {
  const now = new Date();
  return { d: now.getDate(), m: now.getMonth() + 1, y: now.getFullYear() };
};

const isNotPast = (d: number, m: number, y: number) => {
  const today = getToday();
  if (y > today.y) return true;
  if (y < today.y) return false;
  if (m > today.m) return true;
  if (m < today.m) return false;
  return d >= today.d;
};

const isToday = (d: number, m: number, y: number) => {
  const t = getToday();
  return d === t.d && m === t.m && y === t.y;
};

// Достаём час начала слота: "12:00–13:00" → 12
const getSlotStartHour = (slot: string) =>
  Number(slot.split("–")[0].split(":")[0]);

// Прошёл ли слот (только для сегодняшнего дня)
const isSlotPast = (slot: string, d: number, m: number, y: number) => {
  if (!isToday(d, m, y)) return false;
  const now = new Date();
  const startHour = getSlotStartHour(slot);
  return now.getHours() >= startHour;
};

const daysInMonth = (m: number, y: number) => new Date(y, m, 0).getDate();
const pad = (n: number) => String(n).padStart(2, "0");
const formatDMY = (d: number, m: number, y: number) =>
  `${pad(d)}/${pad(m)}/${y}`;
const formatISO = (d: number, m: number, y: number) =>
  `${y}-${pad(m)}-${pad(d)}`;

export const BookingModal = ({
  places,
  totalPrice,
  onClose,
  onConfirm,
}: Props) => {
  const today = getToday();

  const [place, setPlace] = useState<string>(places[0]?.name ?? "");
  const [day, setDay] = useState<number>(today.d);
  const [month, setMonth] = useState<number>(today.m);
  const [year, setYear] = useState<number>(today.y);
  const [time, setTime] = useState<string>("");
  const [guests, setGuests] = useState<number>(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const years = [today.y, today.y + 1];

  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth);
    const maxDay = daysInMonth(newMonth, year);
    if (day > maxDay) setDay(maxDay);
  };

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
    const maxDay = daysInMonth(month, newYear);
    if (day > maxDay) setDay(maxDay);
  };

  const maxDay = daysInMonth(month, year);
  const days = Array.from({ length: maxDay }, (_, i) => i + 1);

  // Если выбранный слот стал недоступен (например, сменили дату на сегодня,
  // а слот уже прошёл) — сбрасываем его.
  useEffect(() => {
    if (time && isSlotPast(time, day, month, year)) {
      setTime("");
    }
  }, [day, month, year, time]);

  const handleConfirm = () => {
    if (!place || !time || !name.trim() || !phone.trim()) {
      setError("Заполните все поля, чтобы мы знали, кого, где и когда ждать.");
      return;
    }
    if (!isNotPast(day, month, year)) {
      setError("Дата не может быть раньше сегодняшней.");
      return;
    }
    if (isSlotPast(time, day, month, year)) {
      setError("Это время уже прошло — выберите более поздний слот.");
      return;
    }
    setError("");
    onConfirm({
      place,
      date: formatISO(day, month, year),
      dateLabel: formatDMY(day, month, year),
      time,
      guests,
      name,
      phone,
    });
  };

  const previewDate = formatDMY(day, month, year);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative bg-white w-full max-w-lg rounded-4xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-5 z-10 text-2xl text-gray-400 hover:text-black transition-colors"
          aria-label="Закрыть"
        >
          ×
        </button>

        <div className="overflow-y-auto px-8 pt-12 pb-8 flex flex-col gap-4">
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

          {/* Дата */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Дата (дд/мм/гггг)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                className="px-3 py-3 rounded-2xl border border-gray-200 focus:border-primary outline-none bg-white"
                aria-label="День"
              >
                {days.map((d) => (
                  <option key={d} value={d}>
                    {pad(d)}
                  </option>
                ))}
              </select>

              <select
                value={month}
                onChange={(e) => handleMonthChange(Number(e.target.value))}
                className="px-3 py-3 rounded-2xl border border-gray-200 focus:border-primary outline-none bg-white"
                aria-label="Месяц"
              >
                {MONTHS.map((_, idx) => (
                  <option key={idx + 1} value={idx + 1}>
                    {pad(idx + 1)}
                  </option>
                ))}
              </select>

              <select
                value={year}
                onChange={(e) => handleYearChange(Number(e.target.value))}
                className="px-3 py-3 rounded-2xl border border-gray-200 focus:border-primary outline-none bg-white"
                aria-label="Год"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Вы выбрали: <span className="font-semibold">{previewDate}</span>
              {!isNotPast(day, month, year) && (
                <span className="text-red-500 ml-2">
                  (дата уже прошла — выберите другую)
                </span>
              )}
            </p>
          </div>

          {/* Гости */}
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

          {/* Время */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Выберите время
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => {
                const past = isSlotPast(slot, day, month, year);
                const selected = time === slot;

                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={past}
                    onClick={() => !past && setTime(slot)}
                    title={past ? "Это время уже прошло" : undefined}
                    className={`px-3 py-2 rounded-xl text-sm border transition ${
                      past
                        ? "border-gray-100 bg-gray-100 text-gray-300 cursor-not-allowed line-through"
                        : selected
                        ? "border-primary bg-primary text-white"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>

            {isToday(day, month, year) && (
              <p className="text-xs text-gray-400 mt-2">
                Для сегодняшнего дня доступны только слоты, которые ещё не начались.
              </p>
            )}
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
    </div>
  );
};