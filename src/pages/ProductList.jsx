import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { mobile } from '../responsive';
import axios from 'axios';
import { Button } from '@material-ui/core';

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: '0px 20px', display: 'flex', flexDirection: 'column' })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: '0px' })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: '10px 0px' })}
`;
const Option = styled.option``;

const BackButton = styled(Link)`
  position: relative;
  left: 20px;
  top: 20px;
  text-decoration: none;
  font-size:16px;
  color: black;
  font-weight: bold;
`;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split('/')[2];
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `http://localhost:5000/api/products`;
        if (cat) {
          url += `?categories=${cat}`;
        }
        const res = await axios.get(url);
        let fetchedProducts = res.data;

        // Apply filters
        if (Object.keys(filters).length > 0) {
          fetchedProducts = fetchedProducts.filter((product) =>
            Object.entries(filters).every(([key, value]) =>
              product[key].includes(value)
            )
          );
        }

        // Apply sorting
        if (sort === 'newest') {
          fetchedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sort === 'asc') {
          fetchedProducts.sort((a, b) => a.price - b.price);
        } else if (sort === 'desc') {
          fetchedProducts.sort((a, b) => b.price - a.price);
        }

        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [cat, filters, sort]);

  const handleFilters = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Button onClick={() => navigate("/")}>Back</Button>
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled selected>Color</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled selected>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
