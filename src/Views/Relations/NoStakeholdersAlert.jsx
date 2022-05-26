import React from 'react'
import { useNavigate } from 'react-router-dom'

const NoStakeholdersAlert = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1 className="text-red-600 text-lg">*لا يمكنك انشاء العلاقات قبل ان تضيف اصحاب المصلحة</h1>
      <a onClick={() => navigate('/stakeholders')} className="text-primaryHover cursor-pointer hover:underline">
        اضغط هنا للعودة الى صفحة (اصحاب المصلحة)
      </a>
    </div>
  )
}

export default NoStakeholdersAlert
