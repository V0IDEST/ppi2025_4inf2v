import { useState, useEffect, createContext } from "react";
import { supabase } from '../utils/supabase';

export const CartContext = createContext({
  // Products and loading/error states
  products: [],
  loading: false,
  error: null,
  // Cart management functions
  cart: [],
  addToCart: () => {},
  updateQtyCart: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductsSupabase() {
      const { data, error } = await supabase.from("product_2v").select();
      if (error) {
        setError(`Fetching products failed! ${error}`);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProductsSupabase();
    //   async function fetchProductsAPI() {
    //     // Fetch products from the API
    //     var category = "beauty";
    //     var limit = 12;
    //     var apiUrl = `https://dummyjson.com/products/category/${category}?limit=${limit}&select=id,thumbnail,title,price,description`;

    //     try {
    //       const response = await fetch(apiUrl);
    //       const data = await response.json();
    //       setProducts(data.products);
    //     } catch (error) {
    //       setError(error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   }
    //   setTimeout(() => {
    //     fetchProductsAPI();
    //   }, 100);
  }, []);

  // Cart state management
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      // If it exists, update the quantity
      updateQtyCart(product.id, existingProduct.quantity + 1);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  }

  function updateQtyCart(productId, quantity) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  const context = {
    //Products and loading/error states
    products: products,
    loading: loading,
    error: error,
    //Cart management functions
    cart: cart,
    addToCart: addToCart,
    updateQtyCart: updateQtyCart,
    clearCart: clearCart,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}
