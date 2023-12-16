import './Address.css';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { mobile } from '../responsive';
import { publicRequest, userRequest } from '../requestMethod';
const location = window.location;
const Container = styled.div`
    ${mobile({ width: "100vw", padding: 0 })};
`

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
    ${mobile({ width: "80vw" })};
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
    const [state, saveState] = useState('');
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
                State: state,
                Country: country,
                ZipCode: zipcode,
                phone: phone
            });
        }
        handleAddress();
    }, [add1, add2, city, state, country, zipcode, phone])

    const handlePayment = useCallback(async () => {
        const TransactionId = 'T' + Date.now() + user.username;
        axios.post("https://e-commerce-api-psi.vercel.app/api/phonepe/newPay",{
                "name": "Krish",
                transactionId: TransactionId,
                "MUID": "MUID" + Date.now(),
                "amount": cart.total - (cart.total * 0.1 * dis),
            }).then((response) => {
                console.log(response.data.checksum);
                console.log(response.data.payload);
                const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
                const options = {
                    method: 'POST',
                    url: prod_URL,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        accept: 'application/json',
                        'Content-Type': 'application/json',
                        'X-VERIFY': response.data.checksum
                    },
                    data: {
                        request: response.data.payload
                    }
                };
        
                axios.request(options).then(function (response) {
                    console.log(response.data);
                    // localStorage.setItem('address', JSON.stringify(address));
                    // localStorage.setItem('orderId', TransactionId);
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
        // const TransactionId = 'T' + Date.now() + user.username;
        // axios.post('https://e-commerce-api-psi.vercel.app/api/phonepe/newPayment', {
        //     "name": "Krish",
        //     transactionId: TransactionId,
        //     "MUID": "MUID" + Date.now(),
        //     "amount": cart.total - (cart.total * 0.1 * dis),
        // }).then((response) => {
        //     console.log(response.data);
        //     location.replace(response.data.redirectInfo.url);
        //     localStorage.setItem('address', JSON.stringify(address));
        //     localStorage.setItem('orderId', TransactionId);
        //     // navigate('/success', { state: { address: address, orderId: response.data.transactionId } });
        // })
        //     .catch((error) => {
        //         console.log('error');
        //         // console.log(error);
        //         // console.error(error);
        //     });
    }, [cart, dis,address,user])
    

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
                    </Row>
                    <Row>
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
                            <input required="required" name='state' onChange={(e) => saveState(e.target.value)} />
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
                            <Span>Phone number</Span>
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
                        if (phone.length !== 10) {
                            alert('Enter a valid phone number');
                        }
                        if (zipcode.length !== 6) {
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
