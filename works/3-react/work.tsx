import "./styles.css";
import { useState } from "react";

// Propsの型定義
type Props = {
  name: string;
  price: number;
};

export default function App() {
  const products = [
    { id: 1, name: "高性能マウス", price: 5000 },
    { id: 2, name: "メカニカルキーボード", price: 12000 },
    { id: 3, name: "高性能ディスプレイ", price: 24000 },
    { id: 4, name: "PC", price: 150000 },
  ];
  return (
    <div>
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

const ProductCard = ({ name, price }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{name}</h3>
      <p>価格: {price} 円</p>
      <button onClick={() => setIsFavorite(!isFavorite)}>
        {isFavorite ? "★ お気に入り済み" : "☆ お気に入りに追加"}
      </button>
    </div>
  );
};
