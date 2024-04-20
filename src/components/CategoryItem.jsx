<<<<<<< HEAD
import React from 'react'
import  styled  from 'styled-components'
import {mobile} from '../responsive'
import { Link } from 'react-router-dom';
=======
import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
>>>>>>> a7605caa167e3c405179c2b9dc8c77bce61b05a7

const Container = styled.div`
  width: 100%;
  margin: 3px;
  height: 70vh;
  position: relative;

  ${mobile({
    height: "auto",
    marginBottom: "20px" // Adjusted margin for mobile
  })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${mobile({
    height: "100%"
  })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  color: white;
  margin-bottom: 20px;
  font-size: 24px; // Adjusted font size for mobile

  ${mobile({
    fontSize: "20px"
  })}
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px; // Adjusted font size for mobile

  ${mobile({
    fontSize: "14px",
    padding: "8px 16px" // Adjusted padding for mobile
  })}
`;

const CategoryItem = ({ item }) => {
  return (
<<<<<<< HEAD
   <Container>
    <Link to={`/products/${item.cat}`}>
    <Image src={item.img}/> 
      <Info> 
        <Title>{item.title}</Title>
        <Button> Shop Now </Button>
    </Info>
    </Link>
   </Container>
  )
}
=======
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>Shop Now</Button>
      </Info>
    </Container>
  );
};
>>>>>>> a7605caa167e3c405179c2b9dc8c77bce61b05a7

export default CategoryItem;
