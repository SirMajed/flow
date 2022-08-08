import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from 'components/Input'
import Select from 'components/Select'
import Button from 'components/Button'
import { addRelation, addRelationsTypes, clearRelations, deleteRelation } from 'redux/slices/stakeholderSlice'
import { Link } from 'react-router-dom'
import Table from 'components/Table'
import Form from 'components/Form'
import { toast } from 'react-toastify'
import { Modal } from 'components/Modal'
import NoStakeholdersAlert from './NoStakeholdersAlert'
import { MdAdd, MdRowing } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'
import UpdateRelation from './UpdateRelation'
import { t } from 'i18next'
import OutlineButton from 'components/OutlineButton'
const CreateRelations = ({ onPrevious }) => {
  const [selectedStakeholder1, setSelectedStakeholder1] = useState('')
  const [selectedStakeholder2, setSelectedStakeholder2] = useState('')
  const [color, setColor] = useState('')
  const [width, setWidth] = useState(1)
  const [label, setLabel] = useState('')
  const [type, setType] = useState(1)
  const [level, setLevel] = useState(1)
  const { stakeholders } = useSelector((s) => s.stakeholders)
  const { relations } = useSelector((s) => s.stakeholders)
  const [open, setOpen] = useState(false)
  const { relationsTypes } = useSelector((s) => s.stakeholders)
  const [selectedRelation, setSelectedRelation] = useState(null)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [detailedRelations, setDetailedRelations] = useState('')
  const relationLevelArray = [1, 2]
  const toggleModal = () => {
    setOpen(!open)
  }
  const closeModal = () => {
    setOpen(false)
    setSelectedRelation(null)
  }
  const toggleUpdateModal = () => setOpenUpdateModal(!openUpdateModal)
  const closeUpdateModal = () => setOpenUpdateModal(false)

  const colors = [
    { name: t('black'), value: 'black' },
    { name: t('red'), value: 'red' },
    { name: t('blue'), value: 'blue' },
    { name: t('yellow'), value: 'yellow' },
    { name: t('brown'), value: 'brown' },
    { name: t('green'), value: 'green' },
    { name: t('orange'), value: 'orange' },
  ]
  const dispatch = useDispatch()

  const createRelation = (e) => {
    e.preventDefault()
    var edgeSet = new Set([...relationsTypes])

    if (!selectedStakeholder1 || !selectedStakeholder2 || !label || !width || !type || !color) {
      toast.error(t('fillInputs'))
    } else {
      let length = 0 
      if (level !== 1){
          const x = relations.filter((item) => {
              return item.from === selectedStakeholder1 && item.to === selectedStakeholder2 && item.level === 1
          })
          length = x[0].length
      }
      else if (level === 1){
        length = Math.round(2000 / (2 * Math.sqrt(width)))
      }
      const data = {
        id: uuidv4(),
        from: selectedStakeholder1,
        to: selectedStakeholder2,
        arrows: 'to',
        label,
        width: parseInt(width),
        type: parseInt(type),
        level: parseInt(level),
        color,
        hidden: level !== 1 ? true: false,
        length: length,
      }
      if (level === '2'){
        var titleArr = detailedRelations.split('-')
        var title = ''
        titleArr.forEach((item) =>{
          title += item +` - `+ `</br>` 
        })
        console.log(titleArr);
        data.title = title
      }
      edgeSet.add(parseInt(type))
      dispatch(addRelation(data))
      dispatch(addRelationsTypes(Array.from(edgeSet)))
      toast.success(t('relationHasBeenCreated'))
      // clearInputs()
      setOpen(false)
    }
  }

  const clearInputs = () => {
    setLabel('')
    setType(0)
    setWidth(0)
    setColor('')
    setLevel(1)
    setSelectedStakeholder2('')
    setSelectedStakeholder1('')
  }

  const removeRelation = (index) => {
    dispatch(deleteRelation(index))
  }
  const clearTable = () => {
    dispatch(clearRelations())
  }
  const handleEditRelation = (relation) => {
    setSelectedRelation(relation)
    toggleUpdateModal()
  }
  return (
    <>
      <div className="mb-2 flex flex-col justify-center gap-5 items-center">
        <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl lg:w-full text-primary font-black leading-6 lg:leading-10 md:text-center text-center">
          {t('relations')}
        </h1>
        {relations && relations.length <= 0 && (
          <div className="flex items-center gap-4">
            <Button onClick={toggleModal} icon={<MdAdd size={22} color="white" />} text={t('createRelations')} />
            <Button onClick={onPrevious} type="button" text={t('back')} classes="bg-transparent text-primary border border-primary hover:text-white" />
          </div>
        )}
      </div>

      <div className="mt-12">
        {relations && relations.length >= 1 && (
          <div className="">
            <Table
              type="relations"
              data={relations}
              deleteTableData={clearTable}
              handleEdit={handleEditRelation}
              handleDelete={removeRelation}
              tableHeaders={[t('from'), t('to'), t('relation'), t('fontWeight'), t('relationLevel'), t('relationType'), t('relationColor'), t('actions')]}
              addButtonFunction={toggleModal}
              buttonText={t('createRelation')}
            />
            <div className="flex flex-row items-center justify-between mt-4">
              <OutlineButton text={t('back')} onClick={onPrevious} />
              <Link to={'/results'}>
                <OutlineButton text={t('results')} onClick={() => {}} />
              </Link>
            </div>
          </div>
        )}
      </div>

      {toggleUpdateModal && (
        <Modal isOpen={openUpdateModal} closeModal={closeUpdateModal} title={t('updateRelation')}>
          <UpdateRelation closeModal={closeUpdateModal} relation={selectedRelation} colors={colors} />
        </Modal>
      )}

      {toggleModal && (
        <Modal isOpen={open} closeModal={closeModal} title={t('createRelation')}>
          <Form className="flex flex-col gap-4" onSubmit={createRelation}>
            <div>
              <h1>{t('from')}</h1>
              <Select required items={stakeholders} onChange={(e) => setSelectedStakeholder1(e.target.value)} value={selectedStakeholder1} />
            </div>
            <div>
              <h1>{t('to')}</h1>
              <Select
                required
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
              </h1>
              <Input required value={width} onChange={(e) => setWidth(e.target.value)} type={'number'} placeholder={t('fontWeight')} />
            </div>
            <div>
              <h1>{t('relationLevel')}</h1>
              <Select items={relationLevelArray} onChange={(e) => setLevel(e.target.value)} value={level} itemsWithNoObjects />
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
              <Button text={t('createRelation')} />
              <Button onClick={onPrevious} type="button" text={t('back')} classes="bg-transparent text-primary border border-primary hover:text-white" />
            </div>
          </Form>
        </Modal>
      )}
    </>
  )
}

export default CreateRelations
