import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addStakeholder, addStakeholdersTypes, addStakeholderType, clearStakeholders, deleteStakeholder } from 'redux/slices/stakeholderSlice'
import { useNavigate } from 'react-router-dom'
import Table from 'components/Table'
import { toast } from 'react-toastify'
import { Modal } from 'components/Modal'
import { MdAdd } from 'react-icons/md'
import 'baseet/dist/styles.css'
import { Title, OutlineButton, Button, Form, InputField as Input } from 'baseet'
import UpdateStakeholder from './UpdateStakeholder'
import { t } from 'i18next'
import Select from 'components/Select'
const CreateStakeholders = ({ onPrevious }) => {
  const { stakeholders } = useSelector((s) => s.stakeholders)
  const [label, setLabel] = useState('')
  const [type, setType] = useState('')
  const [selectType, setSelectType] = useState('')
  const [open, setOpen] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [openTypeForm, setOpenTypeForm] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { stakeholdersTypes } = useSelector((s) => s.stakeholders)
  const [selectedStakeholder, setSelectedStakeholder] = useState(null)
  const toggleUpdateModal = () => setOpenUpdateModal(!openUpdateModal)
  const toggleTypeModal = () => setOpenTypeForm(!openTypeForm)
  const closeUpdateModal = () => setOpenUpdateModal(false)
  const closeTypeForm = () => setOpenTypeForm(false)

  const createStakeholder = () => {
    if (!label || !selectType) {
      toast.error(t('fillInputs'))
    } else {
      if (!stakeholders.find((sk) => sk.label === label)) {
        var edgeSet = new Set([...stakeholdersTypes])
        const obj = { id: label, label, type: selectType, shape: 'box', color: '#3c97c9' }
        dispatch(addStakeholder(obj))
        edgeSet.add(selectType)
        dispatch(addStakeholdersTypes(Array.from(edgeSet)))
        setLabel('')
        setSelectType('')
        closeModal()
        toast.success(t('stakeholderHasBeenCreated'))
      } else {
        toast.error(t('stakeholderAlreadyExists'))
      }
    }
  }
  const removeStakeholder = (stakeholder) => {
    dispatch(deleteStakeholder(stakeholder))
  }

  const deleteTableData = () => {
    dispatch(clearStakeholders())
  }

  const toggleModal = () => {
    setOpen(!open)
  }
  const closeModal = () => {
    setOpen(false)
    setSelectedStakeholder(null)
  }

  const handleEditStakeholder = (stakeholder) => {
    setSelectedStakeholder(stakeholder)
    toggleUpdateModal()
  }

  const createStakeholderType = () => {
    dispatch(addStakeholderType(type))
    setType('')
    toast.success(t('typeHasBeenAdded'))
  }
  return (
    <>
      <div className="mb-2 flex flex-col justify-center gap-5 items-center">
        <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl lg:w-full text-primary font-black leading-6 lg:leading-10 md:text-center text-center"></h1>
        <Title classes="text-accent" text={t('stakeholders')} />

        {stakeholdersTypes && stakeholdersTypes.length <= 0 && (
          <Button size="medium" variant="primary" onClick={toggleTypeModal} icon={<MdAdd size={22} color="white" />} text={t('addStakeholderType')} />
        )}

        {stakeholders && stakeholders.length <= 0 && stakeholdersTypes && stakeholdersTypes.length >= 1 && (
          <div className="flex items-center gap-4">
            <Button size="medium" variant="primary" onClick={toggleModal} icon={<MdAdd size={22} color="white" />} text={t('addStakeholder')} />
            <OutlineButton size="medium" onClick={onPrevious} type="button" text={t('back')} />
          </div>
        )}
      </div>

      <div className="mt-12">
        {stakeholders && stakeholders.length >= 1 && (
          <div className="">
            <Table
              type="stakeholders"
              data={stakeholders}
              deleteTableData={deleteTableData}
              handleDelete={removeStakeholder}
              handleEdit={handleEditStakeholder}
              tableHeaders={[t('stakeholderName'), t('stakeholderType'), t('actions')]}
              addButtonFunction={toggleModal}
              secondButtonFunction={toggleTypeModal}
              buttonText={t('addStakeholder')}
              secondBtnText={t('addStakeholderType')}
            />
            <div className="flex flex-row items-center justify-between mt-4">
              <OutlineButton text={t('back')} onClick={onPrevious} />
              <OutlineButton
                text={t('nextStep')}
                onClick={() => {
                  stakeholders.length <= 0 ? toast.error(t('pleaseAddStakeholdersFirst')) : navigate('/relations')
                }}
              />
            </div>
          </div>
        )}
      </div>

      {toggleUpdateModal && (
        <Modal closeModal={closeUpdateModal} isOpen={openUpdateModal} title={t('update')}>
          <UpdateStakeholder stakeholder={selectedStakeholder} closeModal={closeUpdateModal} />
        </Modal>
      )}

      {toggleModal && (
        <Modal closeModal={closeModal} isOpen={open} title={t('createStakeholder')}>
          <Form classes="flex flex-col gap-4">
            <Input required placeholder={t('stakeholderName')} value={label} onChange={(e) => setLabel(e.target.value)} />
            <Select
              OptionDefaultValue={t('stakeholderType')}
              items={stakeholdersTypes}
              itemsWithNoObjects
              value={selectType}
              onChange={(e) => setSelectType(e.target.value)}
            />
            <div className="flex items-center gap-3">
              <Button size="small" text={t('add')} onClick={createStakeholder} />
            </div>
          </Form>
        </Modal>
      )}

      {toggleTypeModal && (
        <Modal closeModal={closeTypeForm} isOpen={openTypeForm} title={t('addStakeholderType')}>
          <Form classes="flex flex-col gap-4">
            <Input required placeholder={t('stakeholderType')} value={type} onChange={(e) => setType(e.target.value)} />
            <div className="flex items-center gap-3">
              <Button size="small" text={t('add')} onClick={createStakeholderType} />
            </div>
          </Form>
        </Modal>
      )}
    </>
  )
}

export default CreateStakeholders
