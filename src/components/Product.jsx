import { AiOutlineSearch } from "react-icons/ai";
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
    ${mobile({ width: "40vw",minWidth:'40vw',maxWidth:"45vw",height:'300px' ,margin:"15px 0 15px 3vh"})};
    flex:1;
    margin: 15px;
    position: relative;
    min-width: 320px;
    max-width: 22vw;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f5fdfd;
`

const Circle = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    background-color: #fff;
    display: flex;
`
const Image = styled.img`
    ${mobile({ width: "100%" ,height:'250px'})};
    height: 100%;
    width: 100%;
    z-index: 2;
`
const Info = styled.div`
    ${mobile({ width: "42vw",maxWidth:"45vw",height:'250px' })};
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    background: rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease-in-out;
    &:hover{
        opacity: 1;
    }

`
const Icon = styled.div`
    margin: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease;

    &:hover{
        background-color: #ffdfee;
        transform: scale(1.1);
    }
`

const Product = ({ item }) => {
    const [hovered, setHovered] = React.useState(false);

    return (
        <Container onMouseOver={()=> setHovered(true)} onMouseOut={()=> setHovered(false)}>
            <Circle />
                {hovered ? <Image src={item.extraImg[1]}/> : <Image src={item.extraImg[0]} />}
                <Link style={{textDecoration:'none',color:'black',fontWeight:'700'}} to={`/product/${item._id}`}>{item.title}</Link>
            <Info>
               
                <Icon>
                    <Link to={`/product/${item._id}`}>
                        <AiOutlineSearch />
                    </Link>
                </Icon>
               
            </Info>
        </Container>
    )
}

export default Product;
