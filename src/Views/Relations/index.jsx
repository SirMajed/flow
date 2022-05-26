import React from 'react'
import { useState } from 'react'
import CSVReader from 'react-csv-reader'
import { BsUpload } from 'react-icons/bs'
import { IoCreateOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Steps from 'components/Steps'

import { addRelationArray } from 'redux/slices/stakeholderSlice'
const Index = () => {
  const [fileName, setFileName] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleForce = (data, fileInfo) => {
    console.log(data)
    dispatch(addRelationArray(data))
    setFileName(fileInfo.name)
    navigate('/relations/create')
  }
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
  }
  return (
    <>
      <div className="flex flex-col items-center gap-20 justify-center h-screen bg-zinc-50">
        <div className="flex flex-col justify-center">
          <Steps selected="relations" />
          <div className="flex flex-col justify-center mt-20">
            <div className="flex flex-row items-center justify-center gap-10">
              <label
                className="rounded-md bg-primaryHover hover:bg-gray-900 transition text-white font-bold  border shadow-lg p-5 cursor-pointer"
                style={{ height: 'fit-content' }}
              >
                <p className="flex items-center gap-3">
                  {fileName ?? ' رفع الملف'}
                  <BsUpload size={22} />
                </p>
                <CSVReader inputId="CSVReader" inputStyle={{ display: 'none' }} onFileLoaded={handleForce} parserOptions={papaparseOptions} />
              </label>
              <p>او</p>
              <div
                onClick={() => {
                  navigate('/relations/create')
                }}
                className="flex items-center gap-2 rounded-md bg-primaryHover hover:bg-gray-900 transition text-white font-bold  border shadow-lg p-5 cursor-pointer"
              >
                إنشاء العلاقات
                <IoCreateOutline size={25} />
              </div>
            </div>
          </div>
        </div>
      </div>{' '}
    </>
  )
}

export default Index
