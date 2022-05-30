import React from 'react'
import TitleBar from 'components/TitleBar'
import isElectron from 'is-electron'
import whiteLogo from '../assets/images/whiteLogo.png'
import Team from 'components/Team'

import { Link } from 'react-router-dom'
import bg from '../assets/images/ntisbg.jpg'
const Home = () => {
  function scrollToCont() {
    const divElement = document.getElementById('cont')
    divElement.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {isElectron() && <TitleBar />}
      <div
        style={{ backgroundImage: `linear-gradient(rgba(24, 93, 131, 0.1), rgba(24, 93, 131, 0.1)), url(${bg})` }}
        className="flex flex-col justify-center h-screen relative bg-fixed bg-center bg-cover bg-no-repeat"
      >
        <div className="overflow-y-hidden ">
          <div className="mx-auto container py-12 px-4 ">
            <div className="w-full flex justify-center">
              <div className="w-full md:w-11/12 xl:w-10/12 bg-primary md:py-8 md:px-8 px-5 py-4 xl:px-12 xl:py-16 shadow-md rounded-md">
                <div>
                  <div dir="rtl" className="flex flex-wrap items-center md:flex-row flex-col-reverse">
                    <div className="md:w-2/3 w-full pb-6 md:pb-0 md:pr-6 flex-col md:block flex items-center justify-center md:pt-0 pt-4">
                      <div>
                        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-3xl lg:w-10/12 text-white font-black leading-6 lg:leading-10 md:text-right text-center">
                          شبكة اصحاب المصلحة
                        </h1>
                        <p className="text-lg md:text-base xl:text-lg font-t text-gray-200 xl:leading-normal pt-2">
                          يمكنك رفع ملفات بصيغة (.csv, .xlsx, .xls) لإنشاء رسم بياني
                        </p>
                      </div>
                      <Link to={'/stakeholders'}>
                        <button className="rounded-tr-md rounded-br-md mt-5 lg:mt-8 py-3 lg:py-4 px-4 lg:px-8 bg-white font-bold text-black text-sm lg:text-lg xl:text-xl hover:bg-opacity-90  focus:ring-2 focus:ring-offset-2 focus:ring-white focus:outline-none">
                          ابدأ الآن
                        </button>
                      </Link>
                      <button
                        onClick={scrollToCont}
                        className="rounded-tl-md rounded-bl-md mt-5 lg:mt-8 lg:py-3.5 px-4 lg:px-8 border-2 border-white font-bold text-white hover:text-black hover:bg-white  text-sm lg:text-lg xl:text-xl hover:bg-opacity-90 ml-5  focus:ring-0 focus:outline-none"
                      >
                        المساهمين
                      </button>
                    </div>
                    <div className="md:w-1/3 w-2/3">
                      <img draggable={false} className="" src={whiteLogo} alt="image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="cont" className="flex flex-col justify-top h-screen bg-gray-100">
        <h1 className="mt-4 text-xl md:text-2xl lg:text-4xl xl:text-4xl lg:w-full text-gray-800 font-black leading-6 lg:leading-10 md:text-center text-center">
          المساهمين
        </h1>
        <Team />
      </div>
    </>
  )
}
export default Home
