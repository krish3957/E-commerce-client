import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { userRequest } from '../requestMethod';
import { useLocation } from 'react-router-dom';
import { mobile } from '../responsive';


const Container = styled.div`
    ${mobile({ width: "100vw"})};
`

const Wrapper = styled.div`
    padding: 20px;

`

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`

const Top = styled.div`
    display: flex;
    ${mobile({ flexDirection: "Column"})};
    justify-content: space-between;
    align-items: center;
`

const TopButton = styled.button`
    padding: 15px;
    font-weight: 600;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "white"};
    color: ${props => props.type === "filled" && "white"};
`

const Botttom = styled.div`
    display: flex;
    ${mobile({ flexDirection: "Column"})};
    width: 100%;
    justify-content: space-between;
    margin-top: 20px;
`


const Info = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column ;
`



const Product = styled.div`
    ${mobile({ flexDirection: "Column"})};
    display: flex;
    margin: 20px 0;
`

const ProductDetail = styled.div`
    flex: 1.5;
    display: flex;
    ${mobile({ flexDirection: "Column"})};
`

const PriceDetail = styled.div`
    flex: 1;

`

const ProductName = styled.div``

const ProductColor = styled.div`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    border: 1px solid black;
`

const Image = styled.img`
    ${mobile({ width: "90vw",height:"80vh"})};
    width: 200px;
    height: 200px;
`

const Details = styled.div`
    ${mobile({ padding: "15px 0"})};
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const ProductSize = styled.div`
    
`
const ProductID = styled.div``

const ProductAmountContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 30%;
    align-items: center;
`

const ProductAmount = styled.div`
    margin-left: 10px;
    width: 33%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 600;
`

const ProductPrice = styled.h1`
    font-size: 35px;
    font-weight: 300;
`

const Hr = styled.div`
    background-color: black;
    border: 1px solid black;
    opacity: 0.1;
`


const Order = () => {
    const [orders, setorders] = useState([]);
    const location = useLocation()
    const id = location.pathname.split('/')[2];
    useEffect(() => {
        const getOrders = () => {
            userRequest.get("/orders/find/" + id).then(results => {
                results.data.map((item) =>
                    item.products.map((prod) =>
                        setorders((prev) => [...prev, prod])
                    )

                )
            })
            

        }
        getOrders();
    }
        , [id]);
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>Your Orders</Title>
                <Top>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                </Top>
                <Botttom>
                    <Info>
                        {!orders && <h1>No Orders Yet</h1>}
                        {orders && orders.map((product,index) => (
                            <Product key={index}>
                                <ProductDetail>
                                    <Image src={product.img} />
                                    <Details>
                                        <ProductName><b>Product: </b>{product.title}</ProductName>
                                        <ProductID><b>ID: </b>{product._id}</ProductID>
                                        <b>Color:</b><ProductColor color={product.color} />
                                        <ProductSize><b>Size: </b>{product.size}</ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                        
                                    </ProductAmountContainer>
                                    <ProductPrice>₹ {product.price}</ProductPrice>
                                </PriceDetail>
                                <Hr />
                            </Product>
                        ))}
                    </Info>
                </Botttom>
            </Wrapper>
            <Footer />
        </Container>
    );
}

export default Order;
