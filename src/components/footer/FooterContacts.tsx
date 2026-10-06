import type { TFooterPlaces } from "../../types/types";

export const FooterContacts = ({ name, addres }: TFooterPlaces) => {
  return (
    <li
      className={`text-white text-footer font-bold `}
    >
      <div className="grid grid-cols-2">
        <span className="mr-1 px-5 py-3 bg-primary rounded-full hover:-translate-x-0.5 hover:-translate-y-0.5 cursor-pointer transition-transform duration-300">{name}</span>
        <span className="ml-1 px-5 py-3 bg-primary rounded-full hover:-translate-x-0.5 hover:-translate-y-0.5 cursor-pointer transition-transform duration-300">{addres}</span>
      </div>
    </li>
  );
};