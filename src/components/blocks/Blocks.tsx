import { VICTOR_MENU } from "../../data/data";
import { Block } from "./Block";

export const Blocks = () => {
  return (
    <section 
      className=""
    >
      <ul className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:min-h-[500px]">
          {VICTOR_MENU.map((item, i) => (
            <Block key={item.dish} dish={item.dish} description={item.description} price={item.price} image={item.image}/>
        ))}
      </ul>
    </section>
  );
};

