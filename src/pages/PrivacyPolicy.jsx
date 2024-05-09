import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  ${mobile({ // Apply mobile styles
    flexDirection: "column"
  })}
`;

const Wrapper = styled.div`
  width: 70%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  ${mobile({ // Apply mobile styles
    width: "90%"
  })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 10px;
`;

const PrivacyPolicy = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Privacy Policy</Title>
        <Paragraph>
          Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.
        </Paragraph>
        <Paragraph>
          We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
        </Paragraph>
        <Paragraph>
          We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification.
        </Paragraph>
        <Paragraph>
          We don’t share any personally identifying information publicly or with third-parties, except when required to by law.
        </Paragraph>
        <Paragraph>
          Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
        </Paragraph>
        <Paragraph>
          You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
        </Paragraph>
        <Paragraph>
          Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.
        </Paragraph>
      </Wrapper>
    </Container>
  );
};

export default PrivacyPolicy;
