

function ProductsPage2() {
  return (
    <div className="container mt-5">
      <h1>Our Products</h1>
      <p>This is where we'll display our product catalog.</p>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

function ProductsPage3() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products.json');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Our Products</h1>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <ProductCard
              imageUrl={product.image}
              productName={product.name}
              price={product.price.toFixed(2)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

import { useCart } from './CartStore';
import { useLocation } from 'wouter';
import { useFlashMessage } from './FlashMessageStore';

export default function ProductsPage() {

    const [products, setProducts] = useState([]);
    const { addToCart} = useCart();
    const [, setLocation] = useLocation();
    const { showMessage} = useFlashMessage();

    const handleAddToCart = (product) => {
      console.log(product);
        addToCart({
            product_id: product.id,
            productName: product.name,
            imageUrl: product.image,
            price: product.price,
            description: product.description
        });
        showMessage("Product added to cart", "success");
        setLocation("/cart");
    }

    useEffect(() => {
        const fetchData = async () => {
            // const response = await axios.get("products.json");
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
            console.log(response.data);
            setProducts(response.data);
        }
        fetchData();
    }, []);
    // products.map((p)=> {console.log("LOOK HERE >>>> ",p)})
    return (
        <div className="container mt-5">
            <h1>Our Products</h1>
            <div className="row">
                {
                    products.map(p =>
                        (
                            <div className="col-md-3 mb-4" key={p.id}>
                                <ProductCard
                                    imageUrl={p.image}
                                    productName={p.name}
                                    price={p.price}
                                    onAddToCart={()=>{
                                        handleAddToCart(p)
                                    }}
                                />
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}
