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
import { MdAdd } from 'react-icons/md'
import { Modal } from 'components/Modal'

const CreateStakeholders = ({ onPrevious }) => {
  const { stakeholders } = useSelector((s) => s.stakeholders)
  const [stakeholderName, setStakeholderName] = useState('')
  const [stakeholderType, setStakeholderType] = useState('')
  const [open, setOpen] = useState(false)
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
      setOpen(false)
    }
  }

  const removeStakeholder = (name) => {
    dispatch(deleteStakeholder(name))
  }

  const deleteTableData = () => {
    dispatch(clearStakeholders())
  }

  const toggleModal = () => {
    setOpen(!open)
  }
  const closeModal = () => {
    setOpen(false)
  }

  return (
    <>
      <div className="mb-2 flex flex-col justify-center gap-5 items-center">
        <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl lg:w-full text-primary font-black leading-6 lg:leading-10 md:text-center text-center">
          اصحاب المصلحة
        </h1>
        {stakeholders && stakeholders.length <= 0 && (
          <div className="flex items-center gap-4">
            <Button onClick={toggleModal} icon={<MdAdd size={22} color="white" />} text="إضافة صاحب مصلحة" />
            <Button onClick={onPrevious} type="button" text="رجوع" classes="bg-transparent text-primary border border-primary hover:text-white" />
          </div>
        )}
      </div>

      <div className="mt-12">
        {stakeholders && stakeholders.length >= 1 && (
          <div className="">
            <Button onClick={toggleModal} icon={<MdAdd size={22} color="white" />} text="إضافة صاحب مصلحة" />
            <Table
              type="stakeholders"
              data={stakeholders}
              deleteTableData={deleteTableData}
              handleDelete={removeStakeholder}
              tableHeaders={['اسم المساهم', 'نوع المساهم', 'خيارات']}
            />
            <div className="flex flex-row items-center justify-between mt-4">
                <Button text="الخلف" onClick={onPrevious} />
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

      {toggleModal && (
        <Modal dir={'rtl'} closeModal={closeModal} isOpen={open} title={'إنشاء صاحب مصلحة جديد'}>
          <Form className="flex flex-col gap-4">
            <Input required={true} placeholder="الأسم" value={stakeholderName} onChange={(e) => setStakeholderName(e.target.value)} />
            <Input required={true} placeholder="النوع" value={stakeholderType} onChange={(e) => setStakeholderType(e.target.value)} />
            <div className="flex items-center gap-3">
              <Button text="اضافة" onClick={createStakeholder} />
              <Button onClick={onPrevious} type="button" text="رجوع" classes="bg-transparent text-primary border border-primary hover:text-white" />
            </div>
          </Form>
        </Modal>
      )}
    </>
  )
}

export default CreateStakeholders
