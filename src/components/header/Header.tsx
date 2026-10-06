import { NameVictor } from "../auxiliary/NameVictor";


export const Header = () => {
  return (
    <header className={`sticky top-4 z-50 mx-[3%]`}>
      <div className={`px-[8%] md:px-[5%] h-20 bg-white/60 backdrop-blur-lg shadow-lg rounded-4xl`}>
        <div className="grid grid-cols-3 items-center h-full">

          <div className="flex flex-col items-center text-center text-xs uppercase tracking-[3px] text-gray">
            <span>Пришел</span>
            <span>Увидел</span>
            <span>Victor</span>
          </div>

          <div className="flex justify-center">
            <NameVictor/>
          </div>

          <div className="flex justify-center">
            <span className="bg-primary px-6 py-3 text-white btn-text rounded-full">
                Корзина
              </span>
          </div>

        </div>
      </div>
    </header>
  );
};
