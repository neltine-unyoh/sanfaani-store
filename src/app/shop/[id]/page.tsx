import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  ShieldCheck,
  Truck,
  MapPin,
  Info,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductPurchase from "@/components/products/ProductPurchase";
import { products } from "@/data/products";

import "./product.css";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const product = products.find(
    (item) => item.id === id
  );

  if (!product) {
    return (
      <>
        <Navbar />

        <main className="product-not-found">
          <div className="container">
            <p className="section__eyebrow">
              SANFAANI STORE
            </p>

            <h1>Product not found.</h1>

            <p>
              The device you&apos;re looking for may no longer
              be available.
            </p>

            <Link href="/shop">
              <ArrowLeft size={16} />
              Back to shop
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const formattedPrice = `₣ ${product.price.toLocaleString(
    "en-US"
  )}`;

  return (
    <>
      <Navbar />

      <main className="product-page">
        <div className="container">
          {/* Breadcrumb */}

          <div className="product-breadcrumb">
            <Link href="/shop">Shop</Link>

            <ChevronRight size={14} />

            <span>{product.category}</span>

            <ChevronRight size={14} />

            <span>{product.name}</span>
          </div>

          {/* Main product section */}

          <div className="product-main">
            {/* Product visual */}

            <div className="product-gallery">
              <div className="product-gallery__main">
                <span className="product-gallery__condition">
                  {product.condition}
                </span>

                <div className="product-gallery__device">
                  <div className="product-gallery__screen">
                    <span>{product.imageLabel}</span>
                  </div>
                </div>

                <div className="product-gallery__proof">
                  <Check size={14} />
                  Product information verified
                </div>
              </div>

              {/* Product thumbnails */}

              <div className="product-gallery__thumbs">
                <button
                  type="button"
                  className="product-gallery__thumb product-gallery__thumb--active"
                >
                  <span>{product.imageLabel}</span>
                </button>

                <button
                  type="button"
                  className="product-gallery__thumb"
                >
                  Condition
                </button>

                <button
                  type="button"
                  className="product-gallery__thumb"
                >
                  Details
                </button>
              </div>
            </div>

            {/* Product information */}

            <div className="product-info">
              <div className="product-info__category">
                {product.brand} · {product.category}
              </div>

              <h1>{product.name}</h1>

              <p className="product-info__description">
                {product.shortDescription}
              </p>

              <div className="product-info__price">
                {formattedPrice}
              </div>

              <div className="product-info__stock">
                <span />
                {product.stockStatus}
              </div>

              <div className="product-info__divider" />

              {/* Condition */}

              <section className="product-detail-block">
                <div className="product-detail-block__heading">
                  <div>
                    <span>01</span>
                    <h2>Condition</h2>
                  </div>

                  <Info size={17} />
                </div>

                <div className="condition-card">
                  <div className="condition-card__badge">
                    <ShieldCheck size={17} />
                  </div>

                  <div>
                    <strong>
                      {product.condition} device
                    </strong>

                    <p>
                      Product condition and relevant
                      limitations should be reviewed before
                      purchase.
                    </p>
                  </div>
                </div>
              </section>

              {/* Warranty */}

              <section className="product-detail-block">
                <div className="product-detail-block__heading">
                  <div>
                    <span>02</span>
                    <h2>Warranty & support</h2>
                  </div>
                </div>

                <div className="product-benefit">
                  <ShieldCheck size={18} />

                  <div>
                    <strong>{product.warranty}</strong>

                    <p>
                      Support is available according to
                      Sanfaani&apos;s applicable warranty terms.
                    </p>
                  </div>
                </div>
              </section>

              {/* Fulfillment */}

              <section className="product-detail-block">
                <div className="product-detail-block__heading">
                  <div>
                    <span>03</span>
                    <h2>Fulfillment</h2>
                  </div>
                </div>

                <div className="fulfillment-options">
                  <div>
                    <Truck size={18} />

                    <div>
                      <strong>Delivery</strong>

                      <p>
                        Delivery availability confirmed at
                        checkout.
                      </p>
                    </div>
                  </div>

                  <div>
                    <MapPin size={18} />

                    <div>
                      <strong>Pickup</strong>

                      <p>
                        Pickup availability depends on
                        location and stock.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quantity + Add to cart */}

              <ProductPurchase product={product} />
            </div>
          </div>

          {/* Specifications */}

          <section className="product-specifications">
            <div className="product-specifications__heading">
              <p className="section__eyebrow">
                PRODUCT DETAILS
              </p>

              <h2>What you&apos;re getting.</h2>
            </div>

            <div className="product-specifications__grid">
              <div>
                <span>Category</span>
                <strong>{product.category}</strong>
              </div>

              <div>
                <span>Condition</span>
                <strong>{product.condition}</strong>
              </div>

              <div>
                <span>Availability</span>
                <strong>{product.stockStatus}</strong>
              </div>

              <div>
                <span>Warranty</span>
                <strong>{product.warranty}</strong>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}