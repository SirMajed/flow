import React from 'react'
import Team from 'components/Team'
import logo from '../assets/images/whiteLogo.png'
import { Link } from 'react-router-dom'
import bg from '../assets/images/bg.jpg'
import ntisbg from '../assets/images/ntisbg.jpg'
import { useTranslation } from 'react-i18next'
import { CTAButton } from 'baseet'

const Home = () => {
  function scrollToCont() {
    const divElement = document.getElementById('cont')
    divElement.scrollIntoView({ behavior: 'smooth' })
  }
  const { t } = useTranslation()
  return (
    <>
      <div className="relative">
        <div
          style={{ background: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)),url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
          className="bg-contain bg-no-repeat sticky top-0 h-screen flex flex-col items-center justify-center"
        >
          <div className="p-3 mt-4 z-40 absolute top-0 right-0">
            <img src={logo} height={250} width={250} />
          </div>
          <h1 className="text-4xl text-white font-bold">{t('svn')}</h1>
          <p className="text-gray-200 text-xl">{t('landingBody')}</p>
          <div className="flex gap-4 text-white">
            <Link to={'/stakeholders'}>
              <CTAButton variant="default" text={t('startNow')} />
            </Link>
            <CTAButton onClick={scrollToCont} variant="outline" text={t('contributors')} />
          </div>
        </div>

        <div
          style={{ backgroundImage: `linear-gradient(rgba(24, 93, 131, 0.01), rgba(24, 93, 131, 0.01)), url(${ntisbg})` }}
          id="cont"
          className="sticky top-0 h-screen flex flex-col items-center justify-center bg-white text-white"
        >
          <h1 className="sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl lg:w-full text-gray-800 font-black leading-6 lg:leading-10 md:text-center text-center">
            {t('contributors')}
          </h1>
          <Team />
        </div>
      </div>
    </>
  )
}
export default Home
