import React from 'react'
import Team from 'components/Team'
import logo from '../assets/images/whiteLogo.png'
import { Link } from 'react-router-dom'
import bg from '../assets/images/bg.jpg'
import ntisbg from '../assets/images/ntisbg.jpg'
const Home = () => {
  function scrollToCont() {
    const divElement = document.getElementById('cont')
    divElement.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <>
      <div className="relative">
        <div
          style={{ background: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)),url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
          className="bg-contain bg-no-repeat sticky top-0 h-screen flex flex-col items-center justify-center "
        >
          <div className="p-3 mr-4 mt-4 z-40 absolute top-0 right-0">
            <img src={logo} height={250} width={250} />
          </div>
          {/* <img src={logo} height={500} width={500} /> */}
          <h2 className="text-xl md:text-5xl text-white font-bold">شبكة أصحاب المصلحة</h2>
          <p className="text-gray-200 text-lg">لتحليل أصحاب المصلحة و العلاقات</p>
          <div className="flex text-white">
            <Link to={'/stakeholders'}>
              <button className="rounded-md  mt-5 lg:mt-8 py-3 lg:py-4 px-4 lg:px-8 bg-white font-bold text-black text-sm lg:text-lg xl:text-xl hover:bg-opacity-90  focus:ring-2 focus:ring-offset-2 focus:ring-white focus:outline-none">
                ابدأ الآن
              </button>
            </Link>
            <button
              onClick={scrollToCont}
              className="rounded-md  mt-5 lg:mt-8 lg:py-3.5 px-4 lg:px-6 border-2 border-white font-bold text-white hover:text-black hover:bg-white  text-sm lg:text-lg xl:text-xl hover:bg-opacity-90 ml-5  focus:ring-0 focus:outline-none"
            >
              المساهمين
            </button>
          </div>
        </div>
        <div
          style={{ backgroundImage: `linear-gradient(rgba(24, 93, 131, 0.01), rgba(24, 93, 131, 0.01)), url(${ntisbg})` }}
          id="cont"
          className="sticky top-0 h-screen flex flex-col items-center justify-center bg-white text-white"
        >
          <h1 className="mt-4 text-xl md:text-2xl lg:text-4xl xl:text-5xl lg:w-full text-gray-800 font-black leading-6 lg:leading-10 md:text-center text-center">
            المساهمين
          </h1>
          <Team />
        </div>
      </div>
    </>
  )
}
export default Home
