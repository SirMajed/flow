import Button from 'components/Button'
import Form from 'components/Form'
import Input from 'components/Input'
import Select from 'components/Select'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addRelationsTypes, addStakeholdersTypes, updateRelation, updateStakeholder } from 'redux/slices/stakeholderSlice'

const UpdateRelation = ({ relation, closeModal, colors }) => {
  const { stakeholdersTypes, stakeholders } = useSelector((s) => s.stakeholders)
  const [selectedStakeholder1, setSelectedStakeholder1] = useState('')
  const [selectedStakeholder2, setSelectedStakeholder2] = useState('')
  const { relationsTypes } = useSelector((s) => s.stakeholders)
  const [color, setColor] = useState('')
  const [width, setWidth] = useState(0)
  const [label, setLabel] = useState('')
  const [type, setType] = useState(0)
  const dispatch = useDispatch()
  useEffect(() => {
    if (relation) {
      setSelectedStakeholder1(relation.from)
      setSelectedStakeholder2(relation.to)
      setColor(relation.color)
      setWidth(relation.width)
      setLabel(relation.label)
      setType(relation.type)
    }
  }, [])

  const handleUpdate = () => {
    var edgeSet = new Set([...relationsTypes])
    if (!label || !width || !type || !color) {
      toast.error('قم بتعبئة الحقول')
    } else {
      edgeSet.add(parseInt(type))
      dispatch(
        updateRelation({
          id: relation.id,
          color,
          label,
          width,
          type,
        })
      )
      dispatch(addRelationsTypes(Array.from(edgeSet)))
      toast.info('تم تحديث العلاقة بنجاح')
      closeModal()
    }
  }
  return (
    <Form className="flex flex-col gap-4">
      <div>
        <h1>من:</h1>
        <Select disabled items={stakeholders} onChange={(e) => setSelectedStakeholder1(e.target.value)} value={selectedStakeholder1} />
      </div>
      <div>
        <h1>إلى:</h1>
        <Select
          disabled
          items={stakeholders.filter((item) => item.label !== selectedStakeholder1)}
          onChange={(e) => setSelectedStakeholder2(e.target.value)}
          value={selectedStakeholder2}
        />
      </div>
      <div>
        <h1>العلاقة:</h1>
        <Input required value={label} onChange={(e) => setLabel(e.target.value)} placeholder="العلاقة" />
      </div>
      <div>
        <h1>وزن الخط:</h1>
        <Input required value={width} onChange={(e) => setWidth(e.target.value)} type={'number'} placeholder="سماكة الخط" />
      </div>
      <div>
        <h1>نوع العلاقة:</h1>
        <Input required value={type} onChange={(e) => setType(e.target.value)} type={'number'} placeholder="نوع العلاقة (رقم فقط)" />
      </div>
      <div>
        <h1>اللون:</h1>
        <Select isColors items={colors} onChange={(e) => setColor(e.target.value)} value={color} />
      </div>
      <div className="flex items-center gap-3">
        <Button type="button" text="تحديث" onClick={handleUpdate} />
      </div>
    </Form>
  )
}

export default UpdateRelation
