import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from './Product';
import axios from 'axios';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let url = 'http://localhost:5000/api/products';
        if (cat) {
          url += `?categories=${cat}`;
          const res = await axios.get(url);
          setProducts(res.data);
        } else {
          setProducts([]);
        }
        window.scrollTo(0, 0);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    let updatedProducts = [...products];

    // Apply filters
    for (const key in filters) {
      updatedProducts = updatedProducts.filter((product) =>
        product[key].includes(filters[key])
      );
    }

    // Apply sorting
    if (sort === 'newest') {
      updatedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === 'asc') {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [products, filters, sort]);

  return (
    <Container>
      {filteredProducts.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
