import React from 'react'
import styled from 'styled-components'
import { Badge } from "@material-ui/core"
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import {mobile} from "../responsive"
import {useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'

const Container = styled.div`
    height:60px;
    ${mobile({ height: "45px" })}
`
const Wrapper = styled.div`
padding: 10px 20px;
display: flex;
align-items: center;
justify-content: space-between;
${mobile({ padding: "10px 10px" })}
`

const Left = styled.div`
flex: 1;
display: flex;
align-items: center;`

const Language = styled.span`
font-size: 14px;
cursor: pointer
${mobile({ display: "none" })}
`

const SearchContainer = styled.div`
border: 0.5px solid lightgray;
display: flex;
align-items: center;
margin-left: 25px;
padding: 5px;
`
const Input = styled.div`
border: none
${mobile({ width: "50px" })}
`

const Center = styled.div`
flex: 1;
text-align: center;`

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
  font-family: "Slackside One", cursive;
  font-weight: 400;
  font-style: normal;
  `

const Right = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: flex-end;
${mobile({ flex: 2, justifyContent: "center" })}
`
const MenuItem = styled.div`
font-size: 14px;
cursor: pointer;
margin-left: 25px;
${mobile({ fontSize: "12px", marginLeft: "17px" })}
`



function Navbar() {
  const navigate = useNavigate()
  const quantity = useSelector(state=>state.cart.quantity)
    return (
        <Container>
        <Wrapper>
          <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input placeholder="Search" />
              <Search style={{ color: "gray", fontSize: 16 }} />
            </SearchContainer>
          </Left>
          <Center>
            <Logo>Signature Style</Logo>
          </Center>
          <Right>
            <MenuItem onClick={() => navigate('/register')}>REGISTER</MenuItem>
            <MenuItem onClick={() => navigate('/login')}>SIGN IN</MenuItem>
            <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
            </Link>
          </Right>
        </Wrapper>
      </Container>
    )
}

export default Navbar