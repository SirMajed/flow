import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from 'components/Input'
import Select from 'components/Select'
import Button from 'components/Button'
import { addRelation, clearRelations, deleteRelation } from 'redux/slices/stakeholderSlice'
import { Link, useNavigate } from 'react-router-dom'
import Table from 'components/Table'
import Form from 'components/Form'
import { toast } from 'react-toastify'
import { Modal } from 'components/Modal'
import NoStakeholdersAlert from './NoStakeholdersAlert'
import { MdAdd } from 'react-icons/md'
const CreateRelations = ({ onPrevious }) => {
  const [selectedStakeholder1, setSelectedStakeholder1] = useState('')
  const [selectedStakeholder2, setSelectedStakeholder2] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [weight, setWeight] = useState(0)
  const [relation, setRelation] = useState('')
  const [relationType, setRelationType] = useState(0)
  const { stakeholders } = useSelector((s) => s.stakeholders)
  const { relations } = useSelector((s) => s.stakeholders)
  const [openWarnModal, setOpenWarnModal] = useState(false)
  const [open, setOpen] = useState(false)
  const [counter, setCounter] = useState(1)
  const navigate = useNavigate()
  const toggleWarnModal = () => {
    setOpenWarnModal(!openWarnModal)
  }
  const toggleModal = () => {
    setOpen(!open)
  }
  const closeModal = () => {
    setOpen(false)
  }
  const closeWarnModal = () => {
    setOpenWarnModal(false)
  }
  const colors = [
    { name: 'اسود', value: 'black' },
    { name: 'احمر', value: 'red' },
    { name: 'ازرق', value: 'blue' },
    { name: 'اصفر', value: 'yellow' },
    { name: 'بني', value: 'brown' },
    { name: 'اخضر', value: 'green' },
    { name: 'برتقالي', value: 'orange' },
  ]
  const dispatch = useDispatch()

  useEffect(() => {
    if (stakeholders && stakeholders.length <= 0) {
      setOpenWarnModal(true)
    }
  }, [])

  const createRelation = (e) => {
    e.preventDefault()
    if (!selectedStakeholder1 || !selectedStakeholder2 || !relation || !weight || !relationType || !selectedColor) {
      toast.error('قم بتعبئة الحقول')
    } else {
      const data = {
        id: counter,
        from: selectedStakeholder1,
        to: selectedStakeholder2,
        arrows: 'to',
        label: relation,
        width: weight,
        type: relationType,
        color: selectedColor,
      }
      dispatch(addRelation(data))
      setCounter((counter) => counter + 1)
      toast.success('تم إنشاء العلاقة بنجاح')
      // clearInputs()
      setOpen(false)
    }
  }

  const clearInputs = () => {
    setRelation('')
    setRelationType(0)
    setWeight(0)
    setSelectedColor('')
    setSelectedStakeholder2('')
    setSelectedStakeholder1('')
  }

  const removeRelation = (index) => {
    dispatch(deleteRelation(index))
  }
  const clearTable = () => {
    dispatch(clearRelations())
  }
  return (
    <>
      <div className="mb-2 flex flex-col justify-center gap-5 items-center">
        <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl lg:w-full text-primary font-black leading-6 lg:leading-10 md:text-center text-center">العلاقات</h1>
        {relations && relations.length <= 0 && (
          <div className="flex items-center gap-4">
            <Button onClick={toggleModal} icon={<MdAdd size={22} color="white" />} text="إنشاء علاقة جديدة" />
            <Button onClick={onPrevious} type="button" text="رجوع" classes="bg-transparent text-primary border border-primary hover:text-white" />
          </div>
        )}
      </div>

      <div className="mt-12">
        {relations && relations.length >= 1 && (
          <div className="">
            <Button onClick={toggleModal} icon={<MdAdd size={22} color="white" />} text="إنشاء علاقة" />
            <Table
              type="relations"
              data={relations}
              deleteTableData={clearTable}
              handleDelete={removeRelation}
              tableHeaders={['من', 'الى', 'العلاقة', 'وزن الخط', 'نوع العلاقة', 'اللون', 'خيارات']}
            />
            <div className="flex flex-row items-center justify-between mt-4">
              <Button text="الخلف" onClick={onPrevious} />
              <Button
                text="الخطوة التالية"
                onClick={() => {
                  relations.length <= 0 ? toast.error('الرجاء اضافة اصحاب المصلحة') : navigate('/relations')
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* {relations && relations.length >= 1 && (
        <div className="flex flex-row items-center justify-between mt-4">
          <Button classes={'rounded-md'} text="الخلف" onClick={onPrevious} />

          <Link to={'/results'}>
            <Button classes={'rounded-md'} text="النتائج" onClick={() => {}} />
          </Link>
        </div>
      )} */}

      {toggleWarnModal && (
        <Modal hideIcon dir="rtl" isOpen={stakeholders && stakeholders.length >= 1 ? openWarnModal : true} title="تنبيه" closeModal={closeWarnModal}>
          <NoStakeholdersAlert />
        </Modal>
      )}

      {toggleModal && (
        <Modal isOpen={open} closeModal={closeModal} title={'إنشاء علاقة'} dir={'rtl'}>
          <Form className="flex flex-col gap-4" onSubmit={createRelation}>
            <div>
              <h1>من:</h1>
              <Select required items={stakeholders} onChange={(e) => setSelectedStakeholder1(e.target.value)} value={selectedStakeholder1} />
            </div>
            <div>
              <h1>إلى:</h1>
              <Select required items={stakeholders} onChange={(e) => setSelectedStakeholder2(e.target.value)} value={selectedStakeholder2} />
            </div>
            <div>
              <h1>العلاقة:</h1>
              <Input required value={relation} onChange={(e) => setRelation(e.target.value)} placeholder="العلاقة" />
            </div>
            <div>
              <h1>وزن الخط:</h1>
              <Input required value={weight} onChange={(e) => setWeight(e.target.value)} type={'number'} placeholder="Weight" />
            </div>
            <div>
              <h1>نوع العلاقة:</h1>
              <Input required value={relationType} onChange={(e) => setRelationType(e.target.value)} placeholder="Relation type" />
            </div>
            <div>
              <h1>اللون:</h1>
              <Select isColors items={colors} onChange={(e) => setSelectedColor(e.target.value)} value={selectedColor} />
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit" text="إنشاء علاقة" />
              <Button onClick={onPrevious} type="button" text="رجوع" classes="bg-transparent text-primary border border-primary hover:text-white" />
            </div>
          </Form>
        </Modal>
      )}
    </>
  )
}

export default CreateRelations
