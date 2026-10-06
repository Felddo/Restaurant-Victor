import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Main } from './components/Main';
import { CartPage } from "./components/CartPage";
import { CartProvider } from "./context/CartContext";

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  { path: "/cart", element: <CartPage /> },
]);

export const App = () => {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
};