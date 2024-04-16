import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ height: "70vh", overflow: "hidden" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
  
  top: 50%;
  transform: translateY(-50%);
  ${(props) => props.direction === "left" && "left: 10px;"}
  ${(props) => props.direction === "right" && "right: 10px;"}

  ${mobile({ display: "none" })}
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  min-width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
  ${mobile({ flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  ${mobile({ height: "90%", width: "90%" })}
`;

const Image = styled.img`
  height: 90%;
  ${mobile({ height: "100%", width: "100%", objectFit: "cover" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  ${mobile({ padding: "20px" })}
`;

const Title = styled.h1`
  font-size: 30px;
  ${mobile({ fontSize: "20px" })}
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-size: 16px;
  ${mobile({ fontSize: "14px" })}
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: transparent;
  cursor: pointer;
  ${mobile({ fontSize: "14px" })}
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : sliderItems.length - 1));
    } else {
      setSlideIndex((prevIndex) => (prevIndex < sliderItems.length - 1 ? prevIndex + 1 : 0));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleClick("right");
    }, 5000); // Change slide every 5 seconds (5000 milliseconds)

    return () => clearInterval(interval);
  }, []); // Run effect only once on mount

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOP NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
