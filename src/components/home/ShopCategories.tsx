import Link from "next/link";
import {
  Laptop,
  Smartphone,
  Tablet,
  Headphones,
  ArrowUpRight,
} from "lucide-react";
import "./ShopCategories.css";

const categories = [
  {
    name: "Laptops",
    description: "Work, study & create",
    icon: Laptop,
    href: "/shop/laptops",
    number: "01",
  },
  {
    name: "Phones",
    description: "Stay connected",
    icon: Smartphone,
    href: "/shop/phones",
    number: "02",
  },
  {
    name: "Tablets",
    description: "Portable productivity",
    icon: Tablet,
    href: "/shop/tablets",
    number: "03",
  },
  {
    name: "Accessories",
    description: "Complete your setup",
    icon: Headphones,
    href: "/shop/accessories",
    number: "04",
  },
];

export default function ShopCategories() {
  return (
    <section className="shop-categories">
      <div className="container">
        <div className="shop-categories__header">
          <div>
            <p className="section__eyebrow">SHOP TECHNOLOGY</p>

            <h2 className="section__title">
              Everything you need.
              <br />
              Nothing you don&apos;t.
            </h2>
          </div>

          <p className="shop-categories__intro">
            Explore carefully selected technology for work, school,
            creativity, and everyday life.
          </p>
        </div>

        <div className="shop-categories__grid">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={category.href}
                className="category-card"
              >
                <span className="category-card__number">
                  {category.number}
                </span>

                <div className="category-card__icon">
                  <Icon size={30} strokeWidth={1.5} />
                </div>

                <div className="category-card__bottom">
                  <div>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                  </div>

                  <div className="category-card__arrow">
                    <ArrowUpRight size={19} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}