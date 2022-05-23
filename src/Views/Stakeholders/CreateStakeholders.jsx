import React from 'react'
import { useState } from 'react'
import Input from '@components/Input'
import Button from '@components/Button'
import { CSVLink, CSVDownload } from 'react-csv'
import { GrAdd } from 'react-icons/gr'
import { MdDeleteOutline, MdOutlineModeEditOutline } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { addStakeholder, addStakeholderArray, deleteStakeholder } from '../../redux/slices/stakeholderSlice'
import ReactTooltip from 'react-tooltip'
import { Link } from 'react-router-dom'
import Table from '../../components/Table'
import CSVReader from 'react-csv-reader'

const CreateStakeholders = () => {
  const { stakeholders } = useSelector((s) => s.stakeholders)
  const [stakeholderName, setStakeholderName] = useState('')
  const [stakeholderType, setStakeholderType] = useState('')
  const [fileName, setFileName] = useState(null)
  const dispatch = useDispatch()
  const stakeholdersData = stakeholders
  const createStakeholder = () => {
    const obj = { name: stakeholderName, type: stakeholderType }
    dispatch(addStakeholder(obj))
    // setStakeholders([...stakeholders, obj])
    setStakeholderName('')
    setStakeholderType('')
  }

  const handleForce = (data, fileInfo) => {
    dispatch(addStakeholderArray(data))
    setFileName(fileInfo.name)
  }
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
  }

  const removeStakeholder = (name) => {
    dispatch(deleteStakeholder(name))
  }
  return (
    <>
      <div className="flex items-center gap-10 justify-center h-screen bg-zinc-50" id="main">
        <div className="flex-col w-11/12 md:w-2/3 lg:w-2/6">
          <div className="mt-4 mb-2 text-center">
            <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl lg:w-full text-primary font-black leading-6 lg:leading-10 md:text-center text-center">
              إنشاء اصحاب المصلحة
            </h1>
          </div>
          <div dir="rtl" className="flex items-center justify-start gap-2 mt-6 bg-gray-50 px-5 py-4 rounded-md my-2 shadow-md">
            <Input placeholder="الأسم" value={stakeholderName} onChange={(e) => setStakeholderName(e.target.value)} />

            <Input placeholder="النوع" value={stakeholderType} onChange={(e) => setStakeholderType(e.target.value)} />
            <GrAdd data-tip="إنشاء مساهم" className="cursor-pointer" onClick={createStakeholder} size={30} />
          </div>
          <Table data={stakeholders} handleDelete={removeStakeholder} tableHeaders={['اسم المساهم', 'نوع المساهم', 'خيارات']} />

          <div className="flex flex-row-reverse items-center justify-between mt-4">
            {/* <CSVLink filename="stakeholders" className="py-1.5 text-white px-2 rounded-md bg-button_primary" data={stakeholdersData}>
              .csv تصدير الجدول بصيغة
            </CSVLink> */}
            <Link to={'/stakeholders'}>
              <Button classes={'rounded-md'} text="الخلف" onClick={() => {}} />
            </Link>
            <Link to={'/relations'}>
              <Button classes={'rounded-md'} text="الخطوة التالية" onClick={() => {}} />
            </Link>
          </div>
        </div>
        {/*  */}
      </div>
      <ReactTooltip />
    </>
  )
}

export default CreateStakeholders
