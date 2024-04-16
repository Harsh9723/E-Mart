import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(136, 207, 224, 0.1),
      rgba(102, 185, 191, 0.6)
    ),
    url("https://t4.ftcdn.net/jpg/02/86/36/11/360_F_286361199_fzZsOpZ3memFzCn889a9TZHMuTTsFrVl.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
font-size: 24px;
font-weight: 300;
margin-bottom: 2px;
color: #333;
`;

const Form = styled.div`
display: flex;
flex-direction: column;
`;

const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 10px 0;
padding: 10px;
border-radius: 5px;
border: 1px solid #ddd;
`;

const A = styled.a`
color: blue;
cursor: pointer;

&:hover {
    color: red
}
`

const Agreement = styled.span`
  font-size: 20px;
  margin: 20px 0px;
`;

const Button = styled.button`
width: 35%;
border: none;
padding: 10px 15px;
background-color: #2ecc71;
color: white;
cursor: pointer;
margin-bottom: 10px;
border-radius: 5px;
transition: background-color 0.3s ease;

&:hover {
  background-color: #27ae60;
}
`;

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Create an account</Title>
        <Form>
          <Input type="text" placeholder="Name" />
          <Input type="text" placeholder="Last Name" />
          <Input type="text" placeholder="Username" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Input type="password" placeholder="Confirm Password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <br /><A>Privacy Policy</A>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
