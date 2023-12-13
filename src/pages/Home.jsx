import React from 'react'
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import Products from '../components/Products';
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';
import Fade from 'react-reveal/Fade';
function Home() {
  return (
    <div>
      <Announcement />
      {/* <Fade Top> */}
      <Navbar />
      {/* <video width='100%' height='30%' autoPlay muted loop>
        <source height='50vh' src='../Images/trim ad1.mp4' />
      </video> */}
      {/* </Fade> */}
      <Slider />
      {/* <Categories/> */}
      <Products />
      <NewsLetter />
      <Footer />
    </div>
  )
}
export default Home;