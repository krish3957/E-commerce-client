import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { GrAdd } from "react-icons/gr";
import { MdRemove } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { mobile } from "../responsive";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Container = styled.div`
    height: auto;
    width: 100%;
    ${mobile({ width: "100vw", height: "auto" })};
`
const Wrapper = styled.div`
    ${mobile({ width: "100vw", height: "auto", padding: 0 })};
    padding: 40px;
    height: fit-content;
    display: flex;
    ${mobile({ flexDirection: "Column" })};


`
const ImageContainer = styled.div`
    ${mobile({
    width: "100vw", flexDirection: 'row', overflow: 'hidden', height: "400px", padding: "15px 0",
})};
    height: 100vh;
    width: 50vw;
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    flex: 1;
`
const Image = styled.img`
    ${mobile({ width: "90%", height: '450px', padding: "0 5%" })};
    padding: 0 5vw 0 2vw;
    width: 35vw;
    height: 100vh;
`

const Circle = styled.div`
    ${mobile({ right: '0vw' })}
    display: flex;
    align-items: center;
    justify-content: center ;
    height: 30px;
    top:45vh;
    left:${props => props.pos === 'left' && '0vw'};
    right: ${props => props.pos === 'right' && '55vw'};
    width: 30px;
    background-color: white;
    border-radius:50% ;
    position:absolute;
`
const InfoContainer = styled.div`
    flex: 1;
    ${mobile({ padding: "0 15px" })};   
`
const Title = styled.h1`
    font-size: 45px;
`

const Price = styled.span`
    display: flex;
    font-size: 45px;
    font-weight: 300;
    margin-bottom: 20px;
`

const CancelledPrice = styled.span`
    margin-left: 20px;
    font-size: 40px;
    text-decoration: line-through;
`
const Desc = styled.div`
    font-size: 18px;
    margin-bottom: 20px;
`

const FilterContainer = styled.div`
    ${mobile({ width: "90vw" })};
    width: 500px;
    margin: 40px 0;
    display: flex;
    justify-content: space-between;
`

const Filter = styled.div`
    display: flex;
`

const Colors = styled.div`

    display: flex;
    align-items: center;
`
const FilterColors = styled.div`
    height: 20px;
    width: 20px;
    margin-left: 5px;
    border-radius: 50%;
    background-color: ${props => props.color};
    border: 1px solid black;
    cursor: pointer;
`

const FilterTitle = styled.h3`
    margin: 0;
    margin-right: 20px;
    font-weight: 400;
    font-size: 20px;
`

const Select = styled.select`
    width: 100px;
    height: 30px;

`

const Option = styled.option`
    
`

const AddContainer = styled.div`
    width: 40%;
    display: flex;
    justify-content: space-between;
`

const Amount = styled.div`
    width: 30px;
    height: 30px;
    border: 1px solid teal;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
`

const AmountContainer = styled.div`
    display: flex;
    width: 100px;
    justify-content: space-between;
    align-items: center;
`
const Size = styled.img`
    ${mobile({ width: "100%", height: '100px', padding: "0" })};
    width:45vw;
`

const Button = styled.button`
    ${mobile({ marginTop: "1vh", padding: "2vh 5vw" })};
    padding: 15px;
    border: 2px solid teal;
    border-radius: 5px;
    cursor: pointer;

    :hover{
        background-color: lightpink;
    }
`
const Added = styled.div`
    color: red;
`

const Product = () => {
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(null);
    const [color, setColor] = useState(null);
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [added, setAdded] = useState(false);
    const [product, setProduct] = useState({});
    const [slideIndex, setSlideIndex] = useState(0);
    const [sizeOn, setSizeOn] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get("https://e-commerce-api-psi.vercel.app/api/products/find/" + id);
                setProduct(res.data);
                setColor(res.data.color[0]);
            }
            catch (err) {
            }
        }
        getProduct();
    },
        [id]);

    const handleQuatity = (type) => {
        if (type === "asc") {
            setQuantity(quantity + 1);
        } else {
            (quantity > 1) && setQuantity(quantity - 1);
        }
    }

    const handleClick = () => {
        if (size === null) {
            alert('Please Select A Size');
        }
        else if (color === null) {
            alert('Please Select A Color');
        }
        else {
            dispatch(addProduct({ ...product, size, color, quantity }));
            setAdded(true);
            setTimeout(() => {
                setAdded(false);
            }, 2000);
        }
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImageContainer slideIndex={slideIndex}>
                    <Circle pos='left' onClick={() => { setSlideIndex((prev) => prev > 0 ? prev - 1 : product.extraImg?.length - 1); }}>
                        <FaArrowLeft />
                    </Circle>
                    {product.extraImg?.filter((item, index) =>
                        slideIndex === index
                    ).map(item1 => <Image src={item1}></Image>)}
                    <Circle pos='right' onClick={() => setSlideIndex((prev) => prev < product.extraImg?.length - 1 ? prev + 1 : 0)}>
                        <FaArrowRight />
                    </Circle>
                </ImageContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <dl style={{ fontSize: '20px' }}>
                    <strong>Product Details:</strong>
                        <li>Unisex</li>
                        <li>100% Cotton</li>
                        <li>240 GSM</li>
                        <li>Bio Wash</li>
                        <li>Don't Iron/Brush on Print</li>
                    </dl>
                    <Price>₹{product.price}
                        <CancelledPrice> ₹1299</CancelledPrice>
                    </Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color:</FilterTitle>
                            <Colors>
                                {product.color?.map((c, index) => (
                                    <FilterColors key={index} color={c} onClick={() => setColor(c)} />
                                ))}
                            </Colors>
                        </Filter>
                        <Filter>
                            <FilterTitle>Size:</FilterTitle>
                            <Select defaultValue={"Size"} onChange={(e) => setSize(e.target.value)}>
                                <Option disabled>Size</Option>
                                {product.size?.map((s, index) => (
                                    <Option key={index}>{s}</Option>
                                ))}
                            </Select>
                            <span style={{ width: '100px', cursor: 'pointer', textDecoration: 'underline', margin: '5px' }} onClick={() => setSizeOn(!sizeOn)}>SIZE CHART</span>
                        </Filter>
                    </FilterContainer>
                    {sizeOn && <Size src='https://firebasestorage.googleapis.com/v0/b/shop-d7c5d.appspot.com/o/Size%20(1).jpg?alt=media&token=7ff494cc-5aa8-43a9-b3d5-f2b4f794c0bd' alt='size chart' />}
                    <AddContainer>
                        <AmountContainer>
                            <MdRemove onClick={() => handleQuatity("desc")} />
                            <Amount>{quantity}</Amount>
                            <GrAdd onClick={() => handleQuatity("asc")} />
                        </AmountContainer>
                    </AddContainer>
                    <Button onClick={handleClick}>ADD TO CART</Button>
                    {added && <Added> Item Added! </Added>}
                </InfoContainer>
            </Wrapper>
            <NewsLetter />
            <Footer />
        </Container>
    );
}

export default Product;
