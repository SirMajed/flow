import React from 'react'
import { useState } from 'react'
import CSVReader from 'react-csv-reader'
import { BsUpload } from 'react-icons/bs'
import { IoCreateOutline, IoEyeOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { addStakeholderArray, addStakeholdersTypes } from 'redux/slices/stakeholderSlice'
import FormLayout from 'components/FormLayout'
import CreateStakeholders from './CreateStakeholders'
import { useNavigate } from 'react-router-dom'
import { t } from 'i18next'
import { Button, Chip } from 'baseet'

const Index = () => {
  const [fileName, setFileName] = useState(null)
  const [createStakeholdersClicked, setCreateStakeholdersClicked] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { stakeholders } = useSelector((s) => s.stakeholders)
  const { language } = useSelector((s) => s.ui)
  const handleForce = (data, fileInfo) => {
    const colorList = ['#fc8d8d', '#f8ffc7', '#ededed', '#34eb9b'] // [red, yellow, grey, green]
    let arr = []
    let skTypes = []
    var typesSet = new Set()
    var types = []
    var dict = {}

    data.forEach((row) => {
      typesSet.add(row.type) // {1,3}
    })

    types = Array.from(typesSet) // [1,3]

    types.forEach((type, index) => {
      dict[type] = colorList[index]
    })

    dispatch(addStakeholdersTypes(types))

    data.forEach((row) => {
      var obj = {
        id: row.label,
        label: row.label,
        shape: 'box',
        type: row.type,
        color: dict[row.type],
      }
      // if (Object.keys(dict).includes(row.type)) {
      //   obj.color = dict[row.type]
      // }
      arr.push(obj)
      skTypes.push(obj.type)
      console.log(arr)
    })

    dispatch(addStakeholderArray(arr))
    setFileName(fileInfo.name)
    setCreateStakeholdersClicked(true)
  }
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
  }

  return (
    <>
      <FormLayout state="stakeholders">
        {createStakeholdersClicked ? (
          <CreateStakeholders onPrevious={() => setCreateStakeholdersClicked(false)} />
        ) : (
          <div className="flex flex-col justify-center">
            <div className="text-primary">
              <div onClick={() => navigate('/')} className="flex items-center cursor-pointer">
                {language === 'ar' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                )}
                <p className="text-primary text-sm mb-2">{t('backToHomePage')}</p>
              </div>
              <p className="text-xl font-medium text-gray-800">{t('chooseWay')}</p>
              <p className="font-normal text-gray-600">{t('stakeholdersDescription')}</p>
            </div>

            <div className="flex flex-row items-center justify-center gap-10 mt-20">
              <label
                className="rounded-md bg-primaryHover hover:bg-gray-900 transition text-white font-bold  border shadow-lg p-5 cursor-pointer"
                style={{ height: 'fit-content' }}
              >
                <p className="flex items-center gap-3">
                  {(stakeholders && stakeholders.length <= 0 && fileName) || t('uploadStakeholdersFile')}
                  <BsUpload size={22} />
                </p>
                <CSVReader inputId="CSVReader" inputStyle={{ display: 'none' }} onFileLoaded={handleForce} parserOptions={papaparseOptions} />
              </label>
              <p>{t('or')}</p>

              <Button
                onClick={() => {
                  setCreateStakeholdersClicked(true)
                }}
                size="large"
                text={stakeholders && stakeholders.length >= 1 ? t('viewStakeholders') : t('createStakeholders')}
                icon={stakeholders && stakeholders.length >= 1 ? <IoEyeOutline size={25} /> : <IoCreateOutline size={25} />}
              />
            </div>
          </div>
        )}
      </FormLayout>
    </>
  )
}

export default Index
