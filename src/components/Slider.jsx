
import React from 'react';
import styled from 'styled-components';
import { SliderItems } from '../data';
import { mobile } from '../responsive';
const Container = styled.div`
    width: 100vw;
    ${mobile({ width: "100vw", height: '83vh' })};
    margin-top:10px;
    height: 100vh;
    width: 100%;
    position: relative;
    overflow: hidden;
    /* background-image: '../Images/ImageMain.jpg'; */
    /* ${mobile({ display: "none" })}; */
`

// const Arrow = styled.div`
//     height: 50px;
//     width: 50px;
//     background-color: white;
//     border-radius: 50%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     position: absolute;
//     top:0;
//     bottom: 0;
//     margin: auto;
//     left:${props => props.direction === "left" && "10px"};
//     right:${props => props.direction === "right" && "10px"};
//     opacity: 0.5;
//     z-index:2;
//     display: none;
// `

// const Wrapper = styled.div`
//     width: 100%;
//     ${mobile({ width: "90vw" ,height:'83vh'})};
//     height:100%;
//     display: flex;
//     transform: translateX(${props=>props.slideIndex * - 100}vw);
//     transition: all 1.5s ease;
// `

const Slide = styled.div`
    ${mobile({ width: "100vw", height: '78vh' })};
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${props => props.bg};

`

const ImageContainer = styled.div`
${mobile({ width: "100vw", height: '75vh' })};
width: 100vw;
height: 100%;
`
// const InfoContainer = styled.div`
//     ${mobile({ display: "none" ,width:0,height:0,padding:0,margin:0})};
//     flex: 1;
//     padding: 50px;
// `

// const Title = styled.h1`
//     font-size: 70px;
// `
// const Desc = styled.p`
// margin: 50PX 0;
// font-size: 20px;
// font-weight: 500;
// letter-spacing: 3px;
// `
const Button = styled.button`
    ${mobile({padding:'5px 0'})};
    padding:10px;
    font-size: 20px;
    border-radius: 0.4em;
    box-shadow: 0.1em 0.1em;
    background-color: #ff0000;
    cursor: pointer;
    width: 100%;
    &:hover{
        transform: translate(-0.05em, -0.05em);
        box-shadow: 0.15em 0.15em;
    }
    :active{
        transform: translate(0.05em, 0.05em);
        box-shadow: 0.05em 0.05em;
    }

`

const Image = styled.img`
    ${mobile({ display: 'none' })};
    height: 100%;
    width: 100%;
`
const Image1 = styled.img`
    ${mobile({ display: 'block', padding: "0", width: "100vw", height: "75vh" })};
    display: none;
    height: 100%;
    width: 100%;
`
const Link1 = styled.div`
    ${mobile({ width: "40vw", top: "80%", left: "60%" })};
    background-color: white;
    border-radius: 10px;
    position: absolute;
    top: 87%;
    left: 70%;
`


const Slider = () => {
    // const [slideIndex,setSlideIndex] = useState(0);
    // const handleClick=(direction)=>{
    //     if(direction === "left"){
    //         setSlideIndex(slideIndex> 0 ? slideIndex - 1 : 2 );
    //     }
    //     else{
    //         setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    //     }
    // }
    return (

        <Container>
            {/* <Arrow direction="left" onClick={()=>handleClick("left")}>
                <ArrowBackOutlined />
            </Arrow> */}


            {SliderItems.map((item, index) => (
                <Slide key={index} bg={item.bg}>
                    <ImageContainer>
                        <Image1 src='https://firebasestorage.googleapis.com/v0/b/shop-d7c5d.appspot.com/o/SEVN%20.jpg?alt=media&token=fadaa97d-b74e-4995-8bfd-ec7fb7d0539b' />
                        <Image src={item.img} />
                    </ImageContainer>
                    {/* <InfoContainer>
                        <Title>{item.title}</Title>
                        <Desc> {item.desc}</Desc>
                    </InfoContainer> */}
                    <Link1 onClick={() => {
                        window.location.href = '/products';
                    }}><Button>SHOP NOW</Button></Link1>
                </Slide>
            ))}
            {/* <Arrow direction="right" onClick={()=>handleClick("right")}>
                <ArrowForwardOutlined />
            </Arrow> */}
        </Container>
    );
}

export default Slider;
