import React from 'react'
import { useState } from 'react'
import Input from 'components/Input'
import Button from 'components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { addStakeholder, addStakeholdersTypes, clearStakeholders, deleteStakeholder } from 'redux/slices/stakeholderSlice'
import { useNavigate } from 'react-router-dom'
import Table from 'components/Table'
import { toast } from 'react-toastify'
import Form from 'components/Form'
import { MdAdd } from 'react-icons/md'
import { Modal } from 'components/Modal'
import UpdateStakeholder from './UpdateStakeholder'
import { t } from 'i18next'
import OutlineButton from 'components/OutlineButton'
const CreateStakeholders = ({ onPrevious }) => {
  const { stakeholders } = useSelector((s) => s.stakeholders)
  const [label, setLabel] = useState('')
  const [type, setType] = useState('')
  const [open, setOpen] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { stakeholdersTypes } = useSelector((s) => s.stakeholders)
  const [selectedStakeholder, setSelectedStakeholder] = useState(null)

  const toggleUpdateModal = () => setOpenUpdateModal(!openUpdateModal)
  const closeUpdateModal = () => setOpenUpdateModal(false)

  const createStakeholder = () => {
    if (!label || !type) {
      toast.error(t('fillInputs'))
    } else {
      if (!stakeholders.find((sk) => sk.label === label)) {
        var edgeSet = new Set([...stakeholdersTypes])
        const obj = { id: label, label, type, shape: 'box' }
        dispatch(addStakeholder(obj))
        edgeSet.add(type)
        dispatch(addStakeholdersTypes(Array.from(edgeSet)))
        setLabel('')
        setType('')
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
  return (
    <>
      <div className="mb-2 flex flex-col justify-center gap-5 items-center">
        <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl lg:w-full text-primary font-black leading-6 lg:leading-10 md:text-center text-center">
          {t('stakeholders')}
        </h1>
        {stakeholders && stakeholders.length <= 0 && (
          <div className="flex items-center gap-4">
            <Button onClick={toggleModal} icon={<MdAdd size={22} color="white" />} text={t('addStakeholder')} />
            <Button onClick={onPrevious} type="button" text={t('back')} classes="bg-transparent text-primary border border-primary hover:text-white" />
          </div>
        )}
      </div>

      <div className="mt-12">
        {stakeholders && stakeholders.length >= 1 && (
          <div className="">
            {/* <Button onClick={toggleModal} icon={<MdAdd size={22} color="white" />} text={t('addStakeholder')}/> */}
            <Table
              type="stakeholders"
              data={stakeholders}
              deleteTableData={deleteTableData}
              handleDelete={removeStakeholder}
              handleEdit={handleEditStakeholder}
              tableHeaders={[t('stakeholderName'), t('stakeholderType'), t('actions')]}
              addButtonFunction={toggleModal}
              buttonText={t('addStakeholder')}
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
          <Form className="flex flex-col gap-4">
            <Input required placeholder={t('stakeholderName')} value={label} onChange={(e) => setLabel(e.target.value)} />
            <Input required placeholder={t('stakeholderType')} value={type} onChange={(e) => setType(e.target.value)} />
            <div className="flex items-center gap-3">
              <Button text={t('add')} onClick={createStakeholder} />
            </div>
          </Form>
        </Modal>
      )}
    </>
  )
}

export default CreateStakeholders
