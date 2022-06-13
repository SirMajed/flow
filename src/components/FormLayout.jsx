import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import test from '../assets/images/ntisbg.jpg'
import { t } from 'i18next'

const FormLayout = ({ children, state }) => {
  useEffect(() => {})

  const { stakeholders, relations } = useSelector((s) => s.stakeholders)
  const navigate = useNavigate()
  return (
    <>
      <div style={{ backgroundImage: `url(${test})` }} className="flex-1 items-center gap-20 justify-between h-screen overflow-hidden">
        <div className="w-full mx-auto bg-white shadow " />
        <div className="w-full h-full overflow-auto bg-white ">
          <div className="flex justify-evenly pt-[30px] border-b border-gray-300 bg-white sticky top-0 z-50">
            <div>
              <div
                onClick={() => {
                  navigate('/stakeholders')
                }}
                className={`pb-6 hover:border-b-2 ${state === 'stakeholders' && 'border-b-2'} border-primary wiz-instance px-4 cursor-pointer`}
              >
                <div className="flex ">
                  <p className="text-base font-semibold leading-none text-slate-800">1</p>
                  <span className="rtl:mr-3 ltr:ml-3 text-base font-medium leading-none text-slate-800">{t('stakeholders')}</span>
                </div>
              </div>
            </div>
            <div>
              <div
                onClick={() => {
                  stakeholders.length <= 0 ? toast.error(t('pleaseAddStakeholdersFirst')) : navigate('/relations')
                }}
                className={`pb-6 hover:border-b-2 ${state === 'relations' && 'border-b-2'} border-primary wiz-instance px-4 cursor-pointer`}
              >
                <div className="flex ">
                  <p className="text-base font-semibold leading-none text-slate-800">2</p>
                  <span className="rtl:mr-3 ltr:ml-3 text-base font-medium leading-none text-gray-800">{t('relations')}</span>
                </div>
              </div>
            </div>
            <div>
              <div
                onClick={() => {
                  relations.length <= 0 ? toast.error(t('pleaseAddRelations')) : navigate('/results')
                }}
                className={`pb-6 hover:border-b-2 ${state === 'results' && 'border-b-2'} border-primary wiz-instance px-4 cursor-pointer`}
              >
                <div className="flex ">
                  <p className="text-base  leading-none text-slate-800 font-semibold">3</p>
                  <span className="rtl:mr-3 ltr:ml-3 text-base font-medium leading-none text-slate-800">{t('results')}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[34rem] md:max-w-[50rem] lg:max-w-[60rem] xl:max-w-[70rem] px-5 md:px-10 lg:px-0 mx-auto pt-10 pb-10">{children}</div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default FormLayout
