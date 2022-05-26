import React from 'react'
import { useState } from 'react'
import CSVReader from 'react-csv-reader'
import { BsUpload } from 'react-icons/bs'
import { IoCreateOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addStakeholderArray } from 'redux/slices/stakeholderSlice'
import Steps from 'components/Steps'
import FormLayout from 'components/FormLayout'
import CreateStakeholders from './CreateStakeholders'
const Index = () => {
  const [fileName, setFileName] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleForce = (data, fileInfo) => {
    console.log(data)
    dispatch(addStakeholderArray(data))
    setFileName(fileInfo.name)
    // navigate('/stakeholders/create')
    setCreateStakeholdersClicked(true)
  }
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
  }

  const [createStakeholdersClicked, setCreateStakeholdersClicked] = useState(false)
  return (
    <>
      <FormLayout state="stakeholders">
        {createStakeholdersClicked ? (
          <CreateStakeholders onPrevious={() => setCreateStakeholdersClicked(false)} />
        ) : (
          <div className="flex flex-col justify-center">
            <div className="my-6">
              <p className="  text-base font-medium text-gray-800">اختر الطريقة المناسبة</p>
              <p className="font-normal text-gray-600">يمكنك إنشاء اصحاب المصلحة بنفسك وتعبئة البيانات او يمكنك رفع ملف بصيغة إكسل لقراءة البيانات والتعديل عليها</p>
            </div>
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
                  // navigate('/stakeholders/create')
                  setCreateStakeholdersClicked(true)
                }}
                className="flex items-center gap-2 rounded-md bg-primaryHover hover:bg-gray-900 transition text-white font-bold  border shadow-lg p-5 cursor-pointer"
              >
                إنشاء اصحاب المصلحة
                <IoCreateOutline size={25} />
              </div>
            </div>
          </div>
        )}
      </FormLayout>
    </>
  )
}

export default Index
