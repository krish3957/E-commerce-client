import { useState } from "react";
import { publicRequest } from "../requestMethod";
import styled from "styled-components";
import Navbar from "../components/Navbar"
import { Navigate } from "react-router-dom";
import { auth, provider } from "../config.js";
import { signInWithPopup } from "firebase/auth";
import { mobile } from "../responsive";
const Container = styled.div`
    ${mobile({ width: "100vw",height:"auto",padding:"5vh 0"})};
    height: 100vh;
    width: 100vw;
    background: linear-gradient(rgba(255,255,255,0.5),rgba(0,0,0,0.2)) ,url('https://wallpapers.com/images/high/mens-fashion-photography-4p2izmj9ba6dkycl.webp') center no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    `

const Wrapper = styled.div`
    ${mobile({ width: "60vw",height:"auto"})};
    width: 40%;
    padding: 20px;    
    background-color: white;
     
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`

const Input = styled.input`
    border-radius: 50px;
    flex: 1;
    border: 1px solid black;
    margin: 20px 10px 0 0 ;
    min-width: 40%;
    padding: 15px;
    background-color: lightgrey;
`

const Title = styled.h1`
    ${mobile({ fontSize:"22px"})};
    font-size: 24px;
    font-weight: 500;
    text-align: center;
`

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0;
`

const Button = styled.button`
    width: 30%;
    padding: 15px 0;
    cursor: pointer;
`

const ButtonG = styled.button`
  transition: background-color .3s, box-shadow .3s;
    
  padding: 12px 16px 12px 42px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25);
  
  color: #757575;
  font-size: 14px;
  font-weight: 500;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
  
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
  background-color: white;
  background-repeat: no-repeat;
  background-position: 12px 11px;
  
  &:hover {
    box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25);
  }
  
  &:active {
    background-color: #eeeeee;
  }
  
  &:focus {
    outline: none;
    box-shadow: 
      0 -1px 0 rgba(0, 0, 0, .04),
      0 2px 4px rgba(0, 0, 0, .25),
      0 0 0 3px #c8dafc;
  }
  
  &:disabled {
    filter: grayscale(100%);
    background-color: #ebebeb;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25);
    cursor: not-allowed;
  }

`
const Or = styled.div`
    text-align: center;
    margin: 5px 0;
    font-size: 20px;
    width: 30%;
    font-weight: 500;
`

const Register = () => {

    const [data, setData] = useState(null);
    const handleChange = (e) => {
        setData(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        }
        )
    }

    const [pass, handlePass] = useState('');
    const [cpass, handleCoPass] = useState('');
    const [error, setError] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        if (pass === cpass) {
            const res = publicRequest.post('auth/register', {
                username: data.username,
                email: data.email,
                fname: data.fname,
                lname: data.lname,
                password: pass,
                id: data.username
            }).then((result) => {
                if (result.status === 201) {
                    <Navigate to={'/login'} />
                    alert('Succesful');
                }
            }).catch(err =>{
                setError(err.response.data.message);
                alert(err.response.data);
            });
            

        }
        else {
            alert('Conform Password is not same as the Password');
        }
    }
    const signUp = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const res = publicRequest.post('auth/register', {
                    username: result.user.uid,
                    email: result.user.email,
                    fname: result.user.displayName.split(" ")[0],
                    lname: result.user.displayName.split(" ")[1],
                    password: result.user.uid,
                    id: result.user.displayName
                }).then((result) => {
                    if (result.status === 201) {
                        <Navigate to={'/login'} />
                        alert('Succesful');
                    }
                }).catch(err =>{
                    setError(err.response.data.message);
                    alert(err.response.data.message);
                });
            }).catch((error) => {
                alert(error.response.data.message);
            });
    }
    return (
        <>
        <Navbar/>
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                {error && <p>{error}</p>}
                <Form>
                    <Input placeholder="First Name" name="fname" onChange={handleChange} required/>
                    <Input placeholder="Last Name" name="lname" onChange={handleChange} required/>
                    <Input placeholder="Email" name='email' onChange={handleChange} required/>
                    <Input placeholder="username" name="username" onChange={handleChange} required/>
                    <Input placeholder="Password" onChange={(e) => handlePass(e.target.value)} type="password" required/>
                    <Input placeholder="Confirm Password" onChange={(e) => handleCoPass(e.target.value)} type="password" required/>
                    <Agreement>By creating an account. I consent to the processing of my personal data in accordance
                        with the <b>Privacy Policy</b>
                    </Agreement>
                    <Button onClick={handleClick}>CREATE</Button>
                </Form>
                <Or>OR</Or>
                <ButtonG onClick={signUp}>Sign Up with Google</ButtonG>
                
            </Wrapper>
        </Container>
        </>
    );
}

export default Register;
