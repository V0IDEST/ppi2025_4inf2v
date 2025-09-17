import styles from "./ProductList.module.css";
import { CircularProgress } from "@mui/material";
import { Product } from "./Product";
import { useContext, useRef } from "react";
import { CartContext } from "../context/CartContext";

export function ProductList() {
  const { products, loading, error } = useContext(CartContext);

  const searchInput = useRef(null);

  function handleClear() {
    searchInput.current.value = "";
  }

  function handleSearch() {
    const searchTerm = searchInput.current.value.toLowerCase();
    console.log(searchTerm);
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchDiv}>
        <input
          type="text"
          ref={searchInput}
          placeholder="Search products..."
          className={styles.searchInput}
          onChange={handleSearch}
        />
        <button className={styles.searchClear} onClick={handleClear}>
          CLEAR
        </button>
      </div>
      <div className={styles.grid}>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      {loading && (
        <div>
          <CircularProgress
            // size="sm"
            thickness={5}
            style={{ margin: "2rem auto", display: "block" }}
            sx={{
              color: "#001111",
            }}
          />
          <p>Loading products...</p>
        </div>
      )}
      {error && <p>Error loading products: {error.message}</p>}
    </div>
  );
}
