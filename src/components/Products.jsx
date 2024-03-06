import React from 'react'
import styled from 'styled-components'
import  Product  from './Product'
import { popularProducts } from '../data'

const Conatiner = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

`




 const Products = () => {
  return (
    <Conatiner>
        {popularProducts.map((item) => (
            <Product item={item} key={item.id}/>
        ))}
    </Conatiner>
)}

export default Products;