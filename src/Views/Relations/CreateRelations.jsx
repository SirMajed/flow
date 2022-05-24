import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Button from '../../components/Button'
import { addRelation } from '../../redux/slices/stakeholderSlice'
import { Link } from 'react-router-dom'
import Table from '../../components/Table'
const CreateRelations = () => {
  const [selectedStakeholder1, setSelectedStakeholder1] = useState('')
  const [selectedStakeholder2, setSelectedStakeholder2] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [weight, setWeight] = useState(0)
  const [relation, setRelation] = useState('')
  const [relationType, setRelationType] = useState(0)
  const { stakeholders } = useSelector((s) => s.stakeholders)
  const { relations } = useSelector((s) => s.stakeholders)
  const colors = [
    { name: 'احمر', value: 'red' },
    { name: 'ازرق', value: 'blue' },
    { name: 'اصفر', value: 'yellow' },
    { name: 'بني', value: 'brown' },
    { name: 'اخضر', value: 'green' },
    { name: 'برتقالي', value: 'orange' },
  ]
  const dispatch = useDispatch()
  const createRelation = () => {
    const data = {
      FROM: selectedStakeholder1,
      TO: selectedStakeholder2,
      REL: relation,
      Weight: weight,
      relType: relationType,
      RELCOLOR: selectedColor,
    }
    dispatch(addRelation(data))
  }

  const removeRelation = () => {}
  return (
    <>
      <div className="flex items-center gap-10 justify-center h-screen bg-zinc-50" id="main">
        <div className="flex-col w-11/12 md:w-2/3 lg:w-2/5">
          <div className="mt-4 mb-2 text-center">
            <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl lg:w-full text-primary font-black leading-6 lg:leading-10 md:text-center text-center">
              إنشاء العلاقات بين اصحاب المصلحة
            </h1>
          </div>

          <div dir="rtl" className="grid grid-cols-3 gap-y-4 mt-6 bg-white px-5 py-4 rounded-md my-2 shadow-md">
            <div>
              <h1>من:</h1>
              <Select items={stakeholders} onChange={(e) => setSelectedStakeholder1(e.target.value)} value={selectedStakeholder1} />
            </div>
            <div>
              <h1>إلى:</h1>
              <Select items={stakeholders} onChange={(e) => setSelectedStakeholder2(e.target.value)} value={selectedStakeholder2} />
            </div>
            <div>
              <h1>العلاقة:</h1>
              <Input value={relation} onChange={(e) => setRelation(e.target.value)} placeholder="Relation" />
            </div>
            <div>
              <h1>وزن الخط:</h1>
              <Input value={weight} onChange={(e) => setWeight(e.target.value)} type={'number'} placeholder="Weight" />
            </div>
            <div>
              <h1>نوع العلاقة:</h1>
              <Input value={relationType} onChange={(e) => setRelationType(e.target.value)} type={'number'} placeholder="Relation type" />
            </div>
            <div>
              <h1>اللون:</h1>
              <Select isColors items={colors} onChange={(e) => setSelectedColor(e.target.value)} value={selectedColor} />
            </div>
            <div>
              <Button text="إنشاء علاقة" onClick={createRelation} />
            </div>
          </div>

          <Table type="relations" data={relations} handleDelete={removeRelation} tableHeaders={['من', 'الى', 'العلاقة', 'وزن الخط', 'نوع العلاقة', 'اللون', 'خيارات']} />

          <div className="flex flex-row-reverse items-center justify-between mt-4">
            {/* <CSVLink filename="stakeholders" className="py-1.5 text-white px-2 rounded-md bg-button_primary" data={stakeholdersData}>
              .csv تصدير الجدول بصيغة
            </CSVLink> */}
            <Link to={'/stakeholders/create'}>
              <Button classes={'rounded-md'} text="الخلف" onClick={() => {}} />
            </Link>
            <Link to={'/relations'}>
              <Button classes={'rounded-md'} text="النتائج" onClick={() => {}} />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateRelations
