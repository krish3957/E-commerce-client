import React from 'react'
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Slider from '../components/Slider';
// import Categories from '../components/Categories';
import Products from '../components/Products';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';
import { Slide } from 'react-awesome-reveal';

function Home() {
  return (
    <div>
      <Slide direction="left" triggerOnce duration={500}>
        <Announcement />
      </Slide>
        <Navbar />
      <Slider />
      {/* <Categories/> */}
      <Products />
      <NewsLetter />
      <Footer />
    </div>
  )
}
export default Home;