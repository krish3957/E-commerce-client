import { useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { mobile } from "../responsive";
import Navbar from "../components/Navbar";
import {auth,provider } from "../config.js";
import {signInWithPopup} from "firebase/auth";

const Container = styled.div`
    ${mobile({ width: "100vw", height: "90vh" })};
    height: 100vh;
    width: 100vw;
    background: linear-gradient(rgba(255,255,255,0.5),rgba(0,0,0,0.2)) ,url('https://firebasestorage.googleapis.com/v0/b/shop-d7c5d.appspot.com/o/background.jpg?alt=media&token=5d8328d7-b1d5-4b30-bd2e-34d164d0c5d1') center no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    `

const Wrapper = styled.div`
    ${mobile({ width: "60vw", height: "auto" })};
    width: 25%;
    padding: 20px;    
    background-color: white;
     
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

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
    font-size: 24px;
    font-weight: 500;
    text-align: center;
`



const Button = styled.button`
    margin-top: 30px;
    width: 48%;
    padding: 12px 0;
    cursor: pointer;
    :disabled{
        background-color: grey;
        cursor: not-allowed;
    }    
`
const Link = styled.a`
    margin-right: 20px;
    cursor: pointer;
    text-decoration: underline;
`
const Error = styled.span`
    color: red;
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
    width: 50%;
    font-weight: 300;
`


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const { isFetching, error } = useSelector(state => state.user)

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { email:email,password: password });
    }

    const signInGoogle = () => {
        
        signInWithPopup(auth, provider)
            .then((result) => {
                login(dispatch, { email: result.user.email, password: result.user.uid });
            }).catch((error) => {
                alert(error.response.data.message);
            });
    }
    return (
        <div>
        <Navbar/>
            <Container>
                <Wrapper>
                    <Title>SIGN IN</Title>
                    <Form>
                        <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                        <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
                        {error && <Error >Something Went Wrong!!!</Error>}
                    </Form>
                    <Or>OR</Or>
                    <ButtonG onClick={signInGoogle}>Sign In with Google</ButtonG>
                    <br />
                    <br />
                    <Link href="/register">CREATE AN ACCOUNT</Link>
                </Wrapper>
            </Container>
        </div>
    );
}

export default Login;
