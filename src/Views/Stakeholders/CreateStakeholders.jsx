import React from 'react'
import { useState } from 'react'
import Input from 'components/Input'
import Button from 'components/Button'
import { GrAdd } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { addStakeholder, clearStakeholders, deleteStakeholder } from 'redux/slices/stakeholderSlice'
import ReactTooltip from 'react-tooltip'
import { Link, useNavigate } from 'react-router-dom'
import Table from 'components/Table'
import { toast } from 'react-toastify'
import Form from 'components/Form'

const CreateStakeholders = () => {
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
      <div className="flex items-center gap-10 justify-center h-screen bg-zinc-50" id="main">
        <div className="flex-col w-11/12 md:w-2/3 lg:w-2/6">
          <div className="mt-4 mb-2 text-center">
            <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl lg:w-full text-primary font-black leading-6 lg:leading-10 md:text-center text-center">
              إنشاء اصحاب المصلحة
            </h1>
          </div>
          <Form>
            <div dir="rtl" className="flex items-center justify-start gap-2 mt-6 bg-white px-5 py-4 rounded-md my-2 shadow-md">
              <Input required={true} placeholder="الأسم" value={stakeholderName} onChange={(e) => setStakeholderName(e.target.value)} />
              <Input required={true} placeholder="النوع" value={stakeholderType} onChange={(e) => setStakeholderType(e.target.value)} />
              <Button text="اضافة" onClick={createStakeholder} />
              {/* <button type="submit">
                <GrAdd data-tip="إنشاء صاحب المصلحة" className="cursor-pointer focus:outline-none" onClick={createStakeholder} size={20} />
              </button> */}
            </div>
          </Form>
          {stakeholders && stakeholders.length >= 1 && (
            <div>
              <Table
                type="stakeholders"
                data={stakeholders}
                deleteTableData={deleteTableData}
                handleDownloadTable={handleDownloadTable}
                handleDelete={removeStakeholder}
                tableHeaders={['اسم المساهم', 'نوع المساهم', 'خيارات']}
              />
              <div className="flex flex-row-reverse items-center justify-between mt-4">
                <Link to={'/stakeholders'}>
                  <Button text="الخلف" onClick={() => {}} />
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
        </div>
        {/*  */}
      </div>
      <ReactTooltip />
    </>
  )
}

export default CreateStakeholders
