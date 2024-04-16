
import styled from 'styled-components'
import {mobile} from "../responsive"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(236, 106, 106, 0.5),
        rgba(46, 37, 37, 0.5)
    ),
    url("https://png.pngtree.com/background/20210712/original/pngtree-paper-cut-wind-gray-white-e-commerce-banner-background-design-picture-image_1187684.jpg")    center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
width: 40%;
padding: 20px;
background-color: #ffe1e1;
${mobile({ width: "75%" })}
`

const Title = styled.h1`
font-size: 24px;
font-weight: 300;
`

const Form = styled.div`
display: flex;
flex-wrap: wrap;
`

const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 20px 10px 0px 0px;
background: linear-gradient(
        rgba(255, 241, 241, 0.5),
        rgba(93, 77, 77, 0.5)
)
`

const Agreement = styled.span`
font-size: 20px;
margin: 20px 0px;
`
const Button = styled.button`
width: 40%;
border: none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
`



const Register = () => {
    return (
        <Container>
            <Wrapper>
                <Title>Create an account</Title>
                <Form>
                    <Input placeholder="name" />
                    <Input placeholder="last name" />
                    <Input placeholder="username" />
                    <Input placeholder="email" />
                    <Input placeholder="password" />
                    <Input placeholder="confirm" />
                    <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button>CREATE</Button>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register