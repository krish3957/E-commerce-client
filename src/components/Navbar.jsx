import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { mobile } from '../responsive'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { loggingOut } from '../redux/apiCalls'
import { FaShoppingCart } from 'react-icons/fa';
import { SlMenu } from 'react-icons/sl';

const Container = styled.div`
  ${mobile({ width: "100vw" })};
  height:60px;
`;
const Wrapper = styled.div`
  ${mobile({ width: "95vw", padding: 0 })};
  padding : 0 20px;
  display:flex;
  justify-content : space-between;
  
`

const Left = styled.div`
  flex:1;
  display:flex;
  align-items:center;
`
const Center = styled.div`
flex:1;
text-align: center;
`;

const Right = styled.div`
flex:1;
display: flex;
align-items:center; 
justify-content: flex-end;
`;

const Badge = styled.p`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 10px;
  left: 15px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: orange;
  margin-bottom: -20px;
`

const Logo = styled.img`
  ${mobile({ paddingLeft: 0 })};
  margin-top: 10px;
  width: 100px;
  height: 40px;
`

const MenuItem = styled.div`
  ${mobile({ display: "none" })};
  font-size: 14px;
  cursor: pointer;
  margin-left:30px;
`;
const MenuItem1 = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left:30px;
`;
const slideDown = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;
const Dropdown = styled.div`
  ${mobile({ width: "105vw",marginLeft:'-5vw' })};
  width: 98.9vw;
  position: absolute;
  left: 0;
  z-index: 4;
  top:100px;
  background-color: wheat;
  text-align: center;
  height: 2;
  animation: ${slideDown} 0.5s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  //Animated Dropdown
`

const List = styled.ul`
  list-style: none;
`
const ListItem = styled.li`
  margin: 10px;
`

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity);
  const user = useSelector(state => state.user.currentUser);
  const [dropdownMenu, setMenu] = useState(false);

  const dispatch = useDispatch();
  const handleLogout = () => {
    loggingOut(dispatch);
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          {/* <Language>English</Language>
          <SearchContainer>
            <Input />
            <Search style={{ color: "grey", fontSize: 16 }} />
          </SearchContainer> */}
          <MenuItem1 style={{margin:'20px 5px 0 20px'}}>
            <div onClick={() => setMenu(!dropdownMenu)
            }>
              <SlMenu />
            </div>
          </MenuItem1>
        {(dropdownMenu) && <Dropdown>
          <List>
            <ListItem><Link style={{ marginLeft: "-15%", textDecoration: 'none', color: 'black' }} to={"/"}>Home</Link></ListItem>
            {!user && <ListItem><Link style={{ marginLeft: "-15%", textDecoration: 'none', color: 'black' }} to={"/login"}>Login</Link></ListItem>}
            {!user && <ListItem><Link style={{ marginLeft: "-15%", textDecoration: 'none', color: 'black' }} to={"/register"}>Register</Link></ListItem>}
            {user && <ListItem><Link style={{ marginLeft: "-15%", textDecoration: 'none', color: 'black' }} to={"/orders/" + user._id}>Orders</Link></ListItem>}
            {user &&<ListItem><Link style={{ marginLeft: "-15%", textDecoration: 'none', color: 'black' }} onClick={handleLogout}>Logout</Link></ListItem>}
            <ListItem><Link style={{ marginLeft: "-15%", textDecoration: 'none', color: 'black' }} to={"/support"}>Support</Link></ListItem>
          </List>
        </Dropdown>}
        </Left>
        <Center>
          <Link style={{ width: "100%", display: 'flex', justifyContent: 'center', textDecoration: 'none', color: 'black' }} to={"/"}><Logo src='https://firebasestorage.googleapis.com/v0/b/shop-d7c5d.appspot.com/o/Asset%201-8.png?alt=media&token=ed464fde-0ef3-4ce6-87d5-8264f9dfbd49' /></Link>
        </Center>
        <Right>
          {!user ? <><MenuItem>
            <Link style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none', color: 'black' }} to={"/register"}>
              Register
            </Link>
          </MenuItem>

            <MenuItem>
              <Link style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none', color: 'black' }} to={"/login"}>
                SIGN IN
              </Link>
            </MenuItem>
          </>
            :
            <MenuItem>Hello {user.fname + ' ' + user.lname}</MenuItem>
          }
          <MenuItem1>
            <Badge>{quantity}</Badge>
            <Link style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none', color: 'black' }} to={"/cart"}>
              <FaShoppingCart size={'25px'} />
            </Link>
          </MenuItem1>
          
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar