

// export interface NavLink {
//   label: string;
//   href: string;
// }
// export interface TLinks {
//   main: NavLink[];
//   apartment: NavLink[];
// }

export type TDISH = {
  id: number;
  dish: string;
  description: string;
  price: number;
  image: string
};

export type TFooterPlaces = {
  name: string;
  addres: string;
};

export type TCartItem = TDISH & {
  qty: number;
};