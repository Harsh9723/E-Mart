import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useRequest } from "../requestMethods";
import { removeProduct, updateProductQuantity } from "../redux/cartRedux";
import { updateTotal } from "../redux/cartRedux";
import StripeCheckout from "react-stripe-checkout";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" ? "none" : "1px solid black"};
  background-color: ${(props) => props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" ? "white" : "black"};
  transition: all 0.3s ease;
  &:hover {
    background-color: ${(props) => props.type === "filled" ? "white" : "black"};
    color: ${(props) => props.type === "filled" ? "black" : "white"};
  }
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 200px;
  height: auto;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.span`
  margin-bottom: 10px;
`;

const ProductId = styled.span`
  margin-bottom: 10px;
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-bottom: 10px;
`;

const ProductSize = styled.span`
  margin-bottom: 10px;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 0 10px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: red;
  margin-left: 10px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  overflow-y: auto;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: black;
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #222;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onToken = (token) => {
    setLoading(true);
    setError(null);

    try {
      // Your payment processing logic here
      navigate('/success');
    } catch (error) {
      setError(error.message || 'An error occurred while processing payment.');
      setLoading(false);
    }
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeProduct(productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(updateProductQuantity(productId, newQuantity));
  };

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      cart.products.forEach((product) => {
        total += product.price * product.quantity;
      });
      dispatch(updateTotal(total));
    };

    calculateTotal();
  }, [cart.products, dispatch]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => navigate("/")}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled" onClick={() => navigate("/checkout")}>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Remove onClick={() => handleQuantityChange(product._id, product.quantity - 1)} />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Add onClick={() => handleQuantityChange(product._id, product.quantity + 1)} />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
                <RemoveButton onClick={() => handleRemoveFromCart(product._id)}>Remove</RemoveButton>
              </Product>
            ))}
            
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>${cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="E-Mart Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
              disabled={loading}
            >
              <CheckoutButton disabled={loading}>CHECKOUT NOW</CheckoutButton>
            </StripeCheckout>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
