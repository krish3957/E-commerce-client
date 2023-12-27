import './Address.css';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { mobile } from '../responsive';
import { state } from '../data';
import { publicRequest, userRequest } from '../requestMethod';
import { login } from '../redux/apiCalls';
const location = window.location;
const Container = styled.div`
    ${mobile({ width: "100vw", padding: 0 })};
`
var CryptoJS = require("crypto-js");

const Wrapper = styled.div`
    ${mobile({ width: "100vw", padding: 0 })};
    padding: 10vh 15vw 0 15vw;
    width: 70vw;
    height: 80vh;

`
const Form = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: darkslategrey;
`

const Row = styled.div`
    ${mobile({ width: "80vw" ,flexDirection:'column',alignItems:'center',margin:'5px'})};
    display: flex;
    width: 40vw;
    margin: 5vh;
    justify-content: space-between;
`

const Button = styled.button`
    ${mobile({ width: "70vw" })};
    width:250px;
    padding:10px;
    background-color: black;
    color: white;
    font-size: 18px;
    margin-left: -10px;
`

const Buttons = styled.div`
    ${mobile({ width: "80vw", padding: 0 })};
    width: 99%;
    margin: 10px;
    display: flex;
    
    justify-content: space-between;
`
const Span = styled.span`
    font-size: 18px;
    font-weight: 600;
    margin-right: 10px;
`


const Address = () => {
    const [address, saveAddress] = useState({});
    const user = useSelector(state => state.user.currentUser);
    const [add1, saveAdd1] = useState('');
    const [add2, saveAdd2] = useState('');
    const [city, saveCity] = useState('');
    const [state1, saveState] = useState('Andhra Pradesh');
    const [country, saveCountry] = useState('');
    const [zipcode, saveZipCode] = useState('');
    const [phone, savePhone] = useState('');
    const cart = useSelector(state => state.cart);
    const dis = useSelector(state => state.cart.discount);

    
    // const Razorpay = useRazorpay();
    
    useEffect(() => {
        
        const handleAddress = () => {
            saveAddress({
                address_1: add1,
                address_2: add2,
                City: city,
                State: state1,
                Country: country,
                ZipCode: zipcode,
                phone: phone
            });
        }
        handleAddress();
    }, [add1, add2, city, state1, country, zipcode, phone])
    
    const handlePayment = useCallback(async () => {
        const TransactionId = 'T' + Date.now() + user.email;
        userRequest.post('phonepe/newPayment', {
            "name": user.lname,
            transactionId: 'T' + Date.now(),
            "MUID": "MUID" + Date.now(),
            //Encrypt the amount
            "amount":CryptoJS.AES.encrypt(dis ? (cart.total - 150).toString() :cart.total.toString(),process.env.API_HASH).toString()
        }).then((response) => {
            location.replace(response.data.redirectInfo.url);
            localStorage.setItem('address', JSON.stringify(address));
            localStorage.setItem('orderId', TransactionId);
        })
            .catch((error) => {
                console.log(error);
                console.log('error');
                // console.log(error);
                // console.error(error);
            });
        }
    , [cart, dis, address,user])


    return (
        <Container>
            <Navbar></Navbar>
            <Wrapper>
                <Form>
                    <Row>
                        <div className="inputbox">
                            <Span>Address Line 1</Span>
                            <input required="required" name='address_1' type="text" onChange={(e) => saveAdd1(e.target.value)} style={{ maxWidth: '500px' }} />
                            <i />
                        </div>
                        <div className="inputbox">
                            <Span>Address Line 2</Span>
                            <input required="required" name='address_2' type="text" onChange={(e) => saveAdd2(e.target.value)} style={{ maxWidth: '500px' }} />
                            <i />
                        </div>
                    </Row>
                    <Row>
                        <div className="inputbox">
                            <Span>City</Span>
                            <input required="required" name='city' onChange={(e) => saveCity(e.target.value)} />
                            <i />
                        </div>
                        <div className="inputbox">
                            <Span>State</Span>
                            <select required="required" name='state' onChange={(e) => saveState(e.target.value)}>
                            {state.map((item) => (
                                <option value={item}>{item}</option>
                            ))}
                            </select>
                            <i />
                        </div>
                    </Row>
                    <Row>
                        <div className="inputbox">
                            <Span>Country</Span>
                            <input required="required" name='country' onChange={(e) => saveCountry(e.target.value)} />
                            <i />
                        </div>
                        <div className="inputbox">
                            <Span>ZipCode</Span>
                            <input required name='zipcode' onChange={(e) => {
                                saveZipCode(e.target.value);
                            }} />
                            <i />
                        </div>
                    </Row>
                    <Row>
                        <div className="inputbox">
                            <Span>Phone number (+91 .)</Span>
                            <input required name='phone' onChange={(e) => {
                                savePhone(e.target.value);
                            }} />
                            <i />
                        </div>
                    </Row>
                </Form>
                <Buttons>
                    <Button onClick={() => {
                        if (add1 === '' || add2 === '' || city === '' || state === '' || zipcode === '' || country === '') {
                            alert('Save Valid address');
                        }
                        else if (phone.length !== 10) {
                            alert('Enter a valid phone number');
                        }
                        else if (zipcode.length !== 6) {
                            alert('Enter a valid zipcode');
                        }
                        else {
                            handlePayment();
                        }
                    }}>Checkout</Button>
                </Buttons>
            </Wrapper>
        </Container>
    );
}

export default Address;
