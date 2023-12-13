import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { FaLocationDot, FaInstagram } from 'react-icons/fa6';
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiTwotoneMail } from "react-icons/ai";
import Fade from 'react-reveal/Fade';
const Container = styled.div`
    ${mobile({ width: "90vw", padding: "5vw", flexDirection: "Column", height: "auto" })};
    display: flex;
    background-color: #ffdef2;
    height: 200px;
    padding: 20px;
`

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    font-size: 16px;
`
const Center = styled.div`
    flex: 1;
    padding-left: 40px;
`
const Right = styled.div`
    flex: 1;
    padding-left: 20px;
`

const Desc = styled.div`
    flex:1;
`

const SocialIcons = styled.div`
    flex: 1;
    display: flex;
`
const Icon = styled.div`
    width: 40px;
    height: 40px;
    cursor: pointer;
`
const ListTitle = styled.h3`
    font-size: 20px;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
`
const Items = styled.li`
    margin-bottom: 10px;
    width: 50%;
    cursor: pointer;
`
const Title = styled.h1`
    font-size: 24px;
`

const ContactList = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
`
const ContactItem = styled.div`
    font-size: 18px;
    margin-left: 10px;
`
const Link = styled.a`
    color: black;
    font-size: 18px;
    font-weight: 400;
    text-decoration: none;
`

function Footer() {
    return (
        <Container>
            <Left>
                <Title>ShopDropGo</Title>
                <Desc>Thank you for visiting our website! We strive to provide you with the best experience and information possible.</Desc>
                <SocialIcons>
                    <Icon><FaInstagram size={'22px'} /></Icon>
                </SocialIcons>
            </Left>
            <Center>
                <ListTitle>Important Links</ListTitle>
                <Fade bottom cascade>
                    <List>
                        <Items><Link href='/'>Home</Link></Items>
                        <Items><Link href='/policies/shipping-policy'>Shipping Policy</Link></Items>
                        <Items><Link href='/policies/privacy-policy'>Privacy Policy</Link></Items>
                        <Items><Link href='/policies/terms-of-service'>Terms and Condition</Link></Items>
                        <Items><Link href='/contact'>Contact Us</Link></Items>
                    </List>
                </Fade>
            </Center>
            <Right>
                <Fade bottom cascade>
                    <Title>Contact Us</Title>
                    <ContactList>
                        <FaLocationDot />
                        <ContactItem>Bhuj, Kutch,Gujrat</ContactItem>
                    </ContactList>
                    <ContactList>
                        <BsFillTelephoneFill size={'22px'} />
                        <ContactItem>+91 9687503343</ContactItem>
                    </ContactList>
                    <ContactList>
                        <AiTwotoneMail size={'22px'} />
                        <ContactItem>sev7n.in@gmail.com</ContactItem>
                    </ContactList>
                </Fade>
            </Right>
        </Container>
    );
}

export default Footer;
