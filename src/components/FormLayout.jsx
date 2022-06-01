import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Footer from './Footer'
import test from '../assets/images/ntisbg.jpg'

const FormLayout = ({ children, state }) => {
  useEffect(() => {})

  const showDropDownMenu = (el) => {
    el.target.parentElement.children[1].classList.toggle('hidden')
  }
  const swaptext = (el) => {
    const targetText = el.innerText
    document.getElementById('drop-down-content-setter').innerText = targetText
    document.getElementById('drop-down-div').classList.toggle('hidden')
  }
  const { stakeholders, relations } = useSelector((s) => s.stakeholders)
  const navigate = useNavigate()
  return (
    <>
      <div style={{ backgroundImage: `url(${test})` }} className="flex-1 items-center gap-20 justify-between h-screen overflow-hidden">
        <div className="w-full mx-auto bg-white shadow " />
        <div dir="rtl" className="w-full h-full overflow-auto bg-white">
          <div className="flex justify-evenly pt-[30px]  pb- border-b border-gray-300 ">
            <div>
              <div
                onClick={() => {
                  navigate('/stakeholders')
                }}
                className={`pb-6 hover:border-b-2 ${state === 'stakeholders' && 'border-b-2'} border-primary wiz-instance px-4 cursor-pointer`}
              >
                <div className="flex ">
                  <p className="text-base font-semibold leading-none text-slate-800">1</p>
                  <span className="mr-3 text-base font-medium leading-none text-slate-800">اصحاب المصلحة</span>
                </div>
              </div>
            </div>
            <div>
              <div
                onClick={() => {
                  stakeholders.length <= 0 ? toast.error('الرجاء اضافة اصحاب المصلحة اولا') : navigate('/relations')
                }}
                className={`pb-6 hover:border-b-2 ${state === 'relations' && 'border-b-2'} border-primary wiz-instance px-4 cursor-pointer`}
              >
                <div className="flex ">
                  <p className="text-base font-semibold leading-none text-slate-800">2</p>
                  <span className="mr-3 text-base font-medium leading-none text-gray-800">العلاقات</span>
                </div>
              </div>
            </div>
            <div>
              <div
                onClick={() => {
                  relations.length <= 0 ? toast.error('الرجاء اضافة العلاقات') : navigate('/results')
                }}
                className={`pb-6 hover:border-b-2 ${state === 'results' && 'border-b-2'} border-primary wiz-instance px-4 cursor-pointer`}
              >
                <div className="flex ">
                  <p className="text-base  leading-none text-slate-800 font-semibold">3</p>
                  <span className="mr-3 text-base font-medium leading-none text-slate-800">النتائج</span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-10 md:px-20 lg:px-48 xl:px-[400px] pt-10">{children}</div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default FormLayout
