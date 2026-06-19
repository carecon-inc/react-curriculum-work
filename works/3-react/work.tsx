import { useState } from "react";
import "./styles.css";

type Product = {
  id: number;
  name: string;
  price: number;
};

type ProductCardProps = {
  name: string;
  price: number;
};

const ProductCard = ({ name, price }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="product-card">
      <h2>{name}</h2>
      <p>価格: {price.toLocaleString()}円</p>

      <button onClick={handleToggleFavorite}>
        {isFavorite ? "★ お気に入り済み" : "☆ お気に入りに追加"}
      </button>
    </div>
  );
};

export default function App() {
  const products: Product[] = [
    { id: 1, name: "Laptop", price: 120000 },
    { id: 2, name: "Mouse", price: 3000 },
    { id: 3, name: "Monitor", price: 50000 },
  ];

  return (
    <div className="App">
      <h1>商品一覧</h1>

      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
        />
      ))}
    </div>
  );
}
