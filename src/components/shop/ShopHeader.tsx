import { Search } from "lucide-react";
import "./ShopHeader.css";

type ShopHeaderProps = {
  productCount: number;
};

export default function ShopHeader({
  productCount,
}: ShopHeaderProps) {
  return (
    <div className="shop-header">
      <div>
        <p className="section__eyebrow">SANFAANI STORE</p>

        <h1>Technology that fits.</h1>

        <p className="shop-header__description">
          Explore devices selected for work, study, creativity,
          entertainment, and everyday life.
        </p>
      </div>

      <div className="shop-header__search">
        <Search size={18} />

        <input
          type="search"
          placeholder="Search devices..."
          aria-label="Search devices"
        />
      </div>

      <div className="shop-header__meta">
        <span>{productCount} products</span>
      </div>
    </div>
  );
}