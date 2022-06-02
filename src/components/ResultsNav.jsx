import React from 'react'
import { MdFileDownload } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

const ResultsNav = ({ confirmReset, downloadNetworkAsImage, stakeholdersTypes, handleEdgeFilter, handleNodeFilter, relationsTypes }) => {
  const navigate = useNavigate()
  const { relations } = useSelector((s) => s.stakeholders)
  return (
    <div className="flex justify-between items-center bg-zinc-50 shadow-md sticky top-0 w-full py-3 px-8">
      <div className="flex flex-row gap-4">
        <Button classes="bg-transparent text-primary border border-primary hover:text-white" text="البدء من جديد" onClick={confirmReset} />
        <Button icon={<MdFileDownload color="white" size={20} />} text="تحميل" onClick={downloadNetworkAsImage} />
      </div>

      <h1 className="text-3xl text-primary font-medium">الرسمة النهائية</h1>

      <div className="flex flex-row items-center gap-4">
        <select className="border border-primary text-primary rounded-md focus:outline focus:ring-0 focus:border-primary" onChange={handleNodeFilter}>
          <option value="none">تصفية اصحاب المصلحة</option>
          {stakeholdersTypes.map((t, i) => (
            <option key={i} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select className="border border-primary text-primary rounded-md focus:outline focus:ring-0 focus:border-primary" onChange={handleEdgeFilter}>
          <option value="none">تصفية العلاقات</option>
          {relationsTypes.map((t, i) => (
            <option key={i} value={t}>
              {t}
            </option>
          ))}
        </select>
        <div
          onClick={() => {
            if (relations && relations.length <= 0) {
              navigate('/stakeholders')
            } else {
              navigate('/relations')
            }
          }}
          className="flex items-center cursor-pointer text-primary"
        >
          <p className="text-primary text-sm ">العودة</p>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default ResultsNav
