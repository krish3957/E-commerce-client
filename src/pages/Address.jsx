import './Address.css';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { mobile } from '../responsive';
import { state } from '../data';
import { publicRequest } from '../requestMethod';
import { login } from '../redux/apiCalls';
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
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const [pass, setPass] = useState('');
    const[error,setError] = useState(false);
    const handleChange = (e) => {
        setData(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        }
        )
    }
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
        const handleSignUp = () => {
                const res = publicRequest.post('auth/register', {
                    username: data.email,
                    email: data.email,
                    fname: data.fname,
                    lname: data.lname,
                    password: pass,
                    id: data.email
                }).then((result) => {
                    if (result.status === 201) {
                        alert('Succesful');
                        dispatch(login({ email: data.email, password: pass }));
                    }
                }).catch(err =>{
                    alert(err.response.data.message + "Please Sign in");
                    location.replace('/login');
                    setError(true);
                });
        }
        if(!user)
            handleSignUp();
        else{
        const TransactionId = 'T' + Date.now() + data.email;
        axios.post('https://e-commerce-api-psi.vercel.app/api/phonepe/newPayment', {
            "name": data.lname,
            transactionId: 'T' + Date.now(),
            "MUID": "MUID" + Date.now(),
            "amount": dis ? cart.total - 0.1 * cart.total : cart.total,
        }).then((response) => {
            location.replace(response.data.redirectInfo.url);
            localStorage.setItem('address', JSON.stringify(address));
            localStorage.setItem('orderId', TransactionId);
        })
            .catch((error) => {
                console.log('error');
                // console.log(error);
                // console.error(error);
            });
        }
    }, [cart, dis, address,error,dispatch,pass,data, user])


    return (
        <Container>
            <Navbar></Navbar>
            <Wrapper>
                <Form>
                    {!user &&
                        <Row>
                        <div className="inputbox">
                            <Span>First Name</Span>
                            <input required="required" name='fname' type="text" onChange={handleChange} style={{ maxWidth: '600px' }} />
                            <i />
                        </div>
                        <div className="inputbox">
                            <Span>Last Name</Span>
                            <input required="required" name='lname' type="text" onChange={handleChange} style={{ maxWidth: '600px' }} />
                            <i />
                        </div>
                    </Row>}
                    {!user && <Row>
                        <div className="inputbox">
                            <Span>Email</Span>
                            <input required="required" name='email' type="text" onChange={handleChange} style={{ maxWidth: '600px' }} />
                            <i />
                        </div>
                        <div className="inputbox">
                            <Span>Create a password</Span>
                            <input required="required" name='pass' type='password' onChange={(e) => setPass(e.target.value)} />
                            <i />
                        </div>
                    </Row>}
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
                            <select required="required" name='state' onChange={(e) => saveState(e.target.value)} >
                                {state.map((item,index)=>
                                    <option key={index} value={item}>{item}</option>  
                                )}
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
