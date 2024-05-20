import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests

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

  ${mobile({
    padding: "20px",
    flexDirection: "column",
  })}
`;

const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);

  ${mobile({
    width: "80%",
  })}
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
    color: red;
  }
`;

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

  ${mobile({
    width: "100%",
  })}
`;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the API endpoint with the user data
      await axios.post("http://localhost:5000/api/register", formData);
      // Redirect to another page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
    }
    console.log(formData);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Create an account</Title>
        <Form >
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <br />
            <A onClick={() => navigate("/privacy")}>Privacy Policy</A>
          </Agreement>
          <Button onClick={handleSubmit}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
