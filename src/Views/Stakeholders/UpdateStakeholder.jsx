import Button from 'components/Button'
import Form from 'components/Form'
import Input from 'components/Input'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addStakeholdersTypes, updateStakeholder } from 'redux/slices/stakeholderSlice'

const UpdateStakeholder = ({ stakeholder, closeModal }) => {
  const { stakeholdersTypes } = useSelector((s) => s.stakeholders)

  const [label, setLabel] = useState('')
  const [type, setType] = useState('')
  const [oldLabel, setOldLabel] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    if (stakeholder) {
      setOldLabel(stakeholder.label)
      setLabel(stakeholder.label)
      setType(stakeholder.type)
    }
  }, [])

  const handleUpdate = () => {
    var edgeSet = new Set([...stakeholdersTypes])

    dispatch(updateStakeholder({ id: oldLabel, label, type }))
    edgeSet.add(type)
    dispatch(addStakeholdersTypes(Array.from(edgeSet)))

    closeModal()
    toast.success('تم التحديث')
  }
  return (
    <Form className="flex flex-col gap-4">
      <Input required placeholder="الأسم" value={label} onChange={(e) => setLabel(e.target.value)} />
      <Input required placeholder="النوع" value={type} onChange={(e) => setType(e.target.value)} />
      <div className="flex items-center gap-3">
        <Button text="تحديث" onClick={handleUpdate} />
      </div>
    </Form>
  )
}

export default UpdateStakeholder