import React, { useState } from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart } from '../redux/userRedux'; // Assuming you have a login action creator in userRedux.js
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(136, 207, 224, 0.1),
      rgba(102, 185, 191, 0.6)
    ),
    url("https://t4.ftcdn.net/jpg/02/86/36/11/360_F_286361199_fzZsOpZ3memFzCn889a9TZHMuTTsFrVl.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mobile({ // Apply mobile styles
    padding: "20px",
    flexDirection: "column"
  })}
`;

const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);

  ${mobile({ // Apply mobile styles
    width: "80%"
  })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  color: #333;
`;

const Form = styled.form`
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

const Button = styled.button`
  width: 30%;
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
  
  ${mobile({ // Apply mobile styles
    width: "100%"
  })}
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: #555;

  &:hover {
    color: blue;
  }
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // Make an API request to authenticate the user
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        // Dispatch the login action with user data
        dispatch(loginStart(data));
        // Redirect to the dashboard or any other page after successful login
        navigate('/');
      } else {
        // Handle authentication error
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
          />
          <Input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
          />
          <Button onClick={handleClick}>LOGIN</Button> {/* Call handleClick on button click */}
          {error && <Error>{error}</Error>} {/* Display error message if there's an error */}
          <Link href="#">Forgot Password?</Link>
          <Link href="#" onClick={() => navigate('/register')}>CREATE NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
