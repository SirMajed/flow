import { Button } from 'baseet'
import Form from 'components/Form'
import Input from 'components/Input'
import Select from 'components/Select'
import { t } from 'i18next'
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
  const [level, setLevel] = useState(1)
  const [detailedRelations, setDetailedRelations] = useState('')

  const dispatch = useDispatch()
  useEffect(() => {
    if (relation) {
      setSelectedStakeholder1(relation.from)
      setSelectedStakeholder2(relation.to)
      setColor(relation.color)
      setWidth(relation.width)
      setLabel(relation.label)
      setType(relation.type)
      setLevel(relation.level)
    }
  }, [])

  const handleUpdate = () => {
    var edgeSet = new Set([...relationsTypes])
    if (!label || !width || !type || !color) {
      toast.error(t('fillInputs'))
    } else {
      edgeSet.add(parseInt(type))
      dispatch(
        updateRelation({
          id: relation.id,
          color,
          label,
          width,
          type,
          level,
        })
      )
      dispatch(addRelationsTypes(Array.from(edgeSet)))
      toast.info(t('updated'))
      closeModal()
    }
  }
  return (
    <Form className="flex flex-col gap-4">
      <div>
        <h1>{t('from')}</h1>
        <Select disabled items={stakeholders} onChange={(e) => setSelectedStakeholder1(e.target.value)} value={selectedStakeholder1} />
      </div>
      <div>
        <h1>{t('to')}</h1>
        <Select
          disabled
          items={stakeholders.filter((item) => item.label !== selectedStakeholder1)}
          onChange={(e) => setSelectedStakeholder2(e.target.value)}
          value={selectedStakeholder2}
        />
      </div>
      <div>
        <h1>{t('relation')}</h1>
        <Input required value={label} onChange={(e) => setLabel(e.target.value)} placeholder={t('relation')} />
      </div>
      <div>
        <h1>
          {t('fontWeight')} <span className="text-sm text-gray-500">{t('fontWeightDescription')}</span>
        </h1>{' '}
        <Input required value={width} onChange={(e) => setWidth(e.target.value)} type={'number'} placeholder={t('fontWeight')} />
      </div>
      <div>
        <h1>{t('relationLevel')}</h1>
        <Input required value={level} onChange={(e) => setLevel(e.target.value)} type={'number'} placeholder={t('relationLevel')} />
      </div>
      {level === '2' && (
              <div>
                <h1>{t('secondLevelRelation')}</h1>
                <Input required value={detailedRelations} onChange={(e) => setDetailedRelations(e.target.value)} type={'text'} placeholder={t('detailedRelations')} />
              </div>
            )}
      <div>
        <h1>{t('relationType')}</h1>
        <Input required value={type} onChange={(e) => setType(e.target.value)} type={'number'} placeholder={t('numberOnly')} />
      </div>
      <div>
        <h1>{t('relationColor')}</h1>
        <Select isColors items={colors} onChange={(e) => setColor(e.target.value)} value={color} />
      </div>
      <div className="flex items-center gap-3">
        <Button type="button" text={t('update')} onClick={handleUpdate} />
      </div>
    </Form>
  )
}

export default UpdateRelation
