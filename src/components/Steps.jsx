import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GrFormPrevious } from 'react-icons/gr'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
const Steps = ({ selected }) => {
  const navigate = useNavigate()
  const { stakeholders, relations } = useSelector((s) => s.stakeholders)
  return (
    <>
      <div className="w-full ">
        <div dir="rtl" className="md:flex justify-center items-center">
          <div
            onClick={() => {
              navigate('/stakeholders')
            }}
            className="flex items-center md:mt-0 mt-4 cursor-pointer"
          >
            <div className={`w-8 h-8 ${selected === 'stakeholders' ? 'bg-primary' : 'bg-gray-100'} rounded flex items-center justify-center`}>
              <p className={`text-base font-medium leading-none ${selected === 'stakeholders' ? 'text-white' : 'text-gray-800'}`}>01</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-gray-400 text-sm">الخطوة الأولى</p>
              <p className="text-base mr-3 font-medium leading-4 text-gray-800">اصحاب المصلحة</p>
            </div>
          </div>

          <GrFormPrevious className="mr-3" size={22} />

          <div
            onClick={() => {
              stakeholders.length <= 0 ? toast.error('الرجاء اضافة اصحاب المصلحة اولا') : navigate('/relations')
            }}
            className="flex items-center md:mt-0 mt-4 md:mr-12 cursor-pointer"
          >
            <div className={`w-8 h-8 ${selected === 'relations' ? 'bg-primary' : 'bg-gray-100'} rounded flex items-center justify-center`}>
              <p className={`text-base font-medium leading-none ${selected === 'relations' ? 'text-white' : 'text-gray-800'}`}>02</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-gray-400 text-sm">الخطوة الثانية</p>
              <p className="text-base mr-3 font-medium leading-4 text-gray-800">اضافة العلاقات</p>
            </div>
          </div>

          <GrFormPrevious className="mr-3" size={22} />

          <div
            onClick={() => {
              relations.length <= 0 ? toast.error('الرجاء اضافة العلاقات') : navigate('/results')
            }}
            className="flex items-center md:mt-0 mt-4 md:mr-12 cursor-pointer"
          >
            <div className={`w-8 h-8 ${selected === 'results' ? 'bg-primary' : 'bg-gray-100'} rounded flex items-center justify-center`}>
              <p className={`text-base font-medium leading-none ${selected === 'relations' ? 'text-white' : 'text-gray-800'}`}>03</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-gray-400 text-sm mr-3">الخطوة الأخيرة</p>
              <p className="text-base mr-3 font-medium leading-4 text-gray-800">عرض النتائج</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Steps
