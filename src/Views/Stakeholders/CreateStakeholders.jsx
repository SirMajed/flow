import React from 'react'
import { useState } from 'react'
import Input from 'components/Input'
import Button from 'components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { addStakeholder, clearStakeholders, deleteStakeholder } from 'redux/slices/stakeholderSlice'
import { Link, useNavigate } from 'react-router-dom'
import Table from 'components/Table'
import { toast } from 'react-toastify'
import Form from 'components/Form'
import { GrNext } from 'react-icons/gr'

const CreateStakeholders = ({ onPrevious }) => {
  const { stakeholders } = useSelector((s) => s.stakeholders)
  const [stakeholderName, setStakeholderName] = useState('')
  const [stakeholderType, setStakeholderType] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const createStakeholder = () => {
    if (!stakeholderName || !stakeholderType) {
      toast.error('قم بتعبئة حقول الإدخال')
    } else {
      const obj = { name: stakeholderName, type: stakeholderType }
      dispatch(addStakeholder(obj))
      setStakeholderName('')
      setStakeholderType('')
    }
  }

  const removeStakeholder = (name) => {
    dispatch(deleteStakeholder(name))
  }

  const deleteTableData = () => {
    dispatch(clearStakeholders())
  }
  const handleDownloadTable = () => {}
  return (
    <>
      <div className="mb-2 flex items-center">
        <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl lg:w-full text-primary font-black leading-6 lg:leading-10 md:text-center text-center">
          إضافة اصحاب المصلحة
        </h1>
      </div>
      <Form>
        <div dir="rtl" className="flex items-center justify-start gap-2 mt-6 bg-gray-50 px-5 py-4 rounded-md my-2 shadow-md">
          <Input required={true} placeholder="الأسم" value={stakeholderName} onChange={(e) => setStakeholderName(e.target.value)} />
          <Input required={true} placeholder="النوع" value={stakeholderType} onChange={(e) => setStakeholderType(e.target.value)} />
          <div className="flex items-center gap-3">
            <Button text="اضافة" onClick={createStakeholder} />
            <Button onClick={onPrevious} type="button" text="رجوع" classes="bg-transparent text-primary border border-primary hover:text-white" />
          </div>
        </div>
      </Form>
      {stakeholders && stakeholders.length >= 1 && (
        <div className="mt-7">
          <Table
            type="stakeholders"
            data={stakeholders}
            deleteTableData={deleteTableData}
            handleDownloadTable={handleDownloadTable}
            handleDelete={removeStakeholder}
            tableHeaders={['اسم المساهم', 'نوع المساهم', 'خيارات']}
          />
          <div className="flex flex-row items-center justify-between mt-4">
            <Link to={'/stakeholders'}>
              <Button text="الخلف" onClick={onPrevious} />
            </Link>
            <Button
              text="الخطوة التالية"
              onClick={() => {
                stakeholders.length <= 0 ? toast.error('الرجاء اضافة اصحاب المصلحة') : navigate('/relations')
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default CreateStakeholders
