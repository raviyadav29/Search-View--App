import React, { useState, useEffect } from 'react';

const ProductDetails = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products?search=${searchTerm}`);
                const data = await response.json();
                setProduct(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        if (searchTerm) {
            fetchProductData();
        } else {
            setProduct(null);
        }

        return () => {
            // Cleanup function
            setProduct(null);
        };
    }, [searchTerm]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <h1>Product Details</h1>
            <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search for a product" />

            {product ? (
                <div>
                    <h2>{product.category}</h2>
                    <image src={product.image} />
                    <p>{product.description}</p>
                </div>
            ) : (
                <p>No product found.</p>
            )}
        </div>
    );
};

export default ProductDetails;
