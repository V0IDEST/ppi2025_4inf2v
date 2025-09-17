import styles from "./Header.module.css";
import { Link } from "react-router";
import { ShoppingBasket } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export function Header() {

  const { cart } = useContext(CartContext);
  
  return (
    <header className={styles.header}>
      <Link to="/"><h1>TRJ Megastore</h1></Link>
      <div>
        <div className={styles.cart}>
          <Link to="/cart">
            <ShoppingBasket size={48} />
          </Link>
          <span className={styles.cartCount}>{cart.reduce((total, product) => total + product.quantity, 0) }</span>
        </div>
        <p>
          Total $: {cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)}
        </p>
      </div>
    </header>
  );
}
