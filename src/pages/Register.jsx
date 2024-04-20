import styled from 'styled-components';
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(240, 239, 239, 0.5), rgba(46, 37, 37, 0.5)),
    url("https://png.pngtree.com/background/20210712/original/pngtree-paper-cut-wind-gray-white-e-commerce-banner-background-design-picture-image_1187684.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: #e7bfbf52;
  border-radius: 10px;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
  background-color: rgba(252, 252, 252, 0.5);
  outline: none;
  ::placeholder {
    color: rgba(93, 77, 77, 0.7);
  }
`;

const Agreement = styled.span`
  font-size: 16px;
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.7);
  text-align: center;
`;

const Button = styled.button`
  width: 50%;
  align-self: center;
  padding: 15px 0;
  border: none;
  border-radius: 5px;
  background-color: teal;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #008080;
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
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
