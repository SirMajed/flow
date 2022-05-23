import React from 'react'
import { useState } from 'react'
import CSVReader from 'react-csv-reader'
import { BsUpload } from 'react-icons/bs'
import { IoCreateOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { addStakeholderArray, clearStakeholders } from '@slices/stakeholderSlice'
const Index = () => {
  const [fileName, setFileName] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleForce = (data, fileInfo) => {
    dispatch(addStakeholderArray(data))
    setFileName(fileInfo.name)
    navigate('/stakeholders/create')
  }
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
  }
  return (
    <>
      <div className="flex items-center gap-10 justify-center  h-screen ">
        {/* <div className="flex items-center gap-3 rounded-md bg-black hover:bg-gray-900 transition text-white font-bold  border shadow-lg p-5 cursor-pointer">
          <BsUpload size={22} />
          رفع الملف <CSVReader inputId="CSVReader" inputStyle={{ display: 'none' }} onFileLoaded={handleForce} parserOptions={papaparseOptions} />
        </div> */}
        <label className="rounded-md bg-black hover:bg-gray-900 transition text-white font-bold  border shadow-lg p-5 cursor-pointer" style={{ height: 'fit-content' }}>
          <p className="flex items-center gap-3">
            {fileName ?? ' رفع الملف'}
            <BsUpload size={22} />
          </p>
          <CSVReader inputId="CSVReader" inputStyle={{ display: 'none' }} onFileLoaded={handleForce} parserOptions={papaparseOptions} />
        </label>
        <p>او</p>
        <div
          onClick={() => {
            navigate('/stakeholders/create')
            dispatch(clearStakeholders())
          }}
          className="flex items-center gap-2 rounded-md bg-black hover:bg-gray-900 transition text-white font-bold  border shadow-lg p-5 cursor-pointer"
        >
          <IoCreateOutline size={25} />
          إنشاء اصحاب المصلحة
        </div>
      </div>

      {/* {selectStep === 'create' ? <CreateStakeholder /> : <ImportStakeholder />} */}
    </>
  )
}

export default Index
