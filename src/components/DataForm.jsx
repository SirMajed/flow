import { useState } from 'react'
import Input from './Input'
import Button from './Button'
import Select from './Select'
import { CSVLink, CSVDownload } from 'react-csv'

const DataForm = () => {
  const colors = ['red', 'black', 'green', 'blue', 'yellow']
  const [stakeholders, setStakeholders] = useState([
    { name: 'Stakeholder1', type: 'T1' },
    { name: 'Stakeholder2', type: 'T2' },
    { name: 'Stakeholder3', type: 'T2' },
    { name: 'Stakeholder4', type: 'T1' },
    { name: 'Stakeholder5', type: 'T1' },
  ])
  const [relations, setRelations] = useState([])

  const [stakeholderName, setStakeholderName] = useState('')
  const [stakeholderType, setStakeholderType] = useState('')

  // For relations
  const [selectedStakeholder1, setSelectedStakeholder1] = useState('')
  const [selectedStakeholder2, setSelectedStakeholder2] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [weight, setWeight] = useState(0)
  const [relation, setRelation] = useState('')
  const [relationType, setRelationType] = useState(0)
  const addStakeholder = () => {
    const obj = { name: stakeholderName, type: stakeholderType }
    setStakeholders([...stakeholders, obj])
    setStakeholderName('')
    setStakeholderType('')
  }
  const addRelation = () => {
    const data = {
      FROM: selectedStakeholder1,
      TO: selectedStakeholder2,
      REL: relation,
      Weight: weight,
      relType: relationType,
      RELCOLOR: selectedColor,
    }
    setRelations([...relations, data])
  }
  const stakeholdersData = stakeholders
  const relationsData = relations
  return (
    <>
      <div className="flex flex-col items-center justify-around h-screen" id="main">
        <div className="flex-col">
          <div className="mt-4 mb-2">
            <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl lg:w-full text-primary font-black leading-6 lg:leading-10 md:text-center text-center">
              Data Entry - Stakeholders
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-6">
            <h1>Stakeholder:</h1>
            <div>
              <Input placeholder="Name" value={stakeholderName} onChange={(e) => setStakeholderName(e.target.value)} />
            </div>

            <div>
              <Input placeholder="Type" value={stakeholderType} onChange={(e) => setStakeholderType(e.target.value)} />
            </div>
            <Button text="Add Stakeholder" onClick={addStakeholder} classes="rounded-md py-2 focus:bg-opacity-80 transition" />
            {/* <IoMdAddCircleOutline size={25} className="text-gray-500" /> */}
          </div>
          <div className="relative h-72 overflow-y-auto overflow-x-auto shadow-md sm:rounded-lg">
            {stakeholders.length >= 1 && (
              <table className="w-full  text-sm text-center text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Stakeholder Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Stakeholder Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stakeholders.map((s, i) => {
                    return (
                      <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">{s.name}</td>
                        <td>{s.type}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* <Button text="Download Stakeholders .csv" onClick={downloadCsv} classes="rounded-md py-2 focus:bg-opacity-80 transition" /> */}
          {/* <CSVLink filename="stakeholders" className="py-2 text-white px-2 rounded-md bg-black mt-3" data={csvData}>
            Download .csv
          </CSVLink> */}

          <h1 className="text-xl md:text-2xl mt-7 lg:text-4xl xl:text-4xl lg:w-full text-primary font-black leading-6 lg:leading-10 md:text-center text-center">
            Data Entry - Relations
          </h1>

          <div className="grid grid-cols-2 gap-y-4 mt-8 items-center">
            <div>
              <h1>From:</h1>
              <Select items={stakeholders} onChange={(e) => setSelectedStakeholder1(e.target.value)} value={selectedStakeholder1} />
            </div>
            <div>
              <h1>To:</h1>
              <Select items={stakeholders} onChange={(e) => setSelectedStakeholder2(e.target.value)} value={selectedStakeholder2} />
            </div>
            <div>
              <h1>Relation:</h1>
              <Input value={relation} onChange={(e) => setRelation(e.target.value)} placeholder="Relation" />
            </div>
            <div>
              <h1>Weight:</h1>
              <Input value={weight} onChange={(e) => setWeight(e.target.value)} type={'number'} placeholder="Weight" />
            </div>
            <div>
              <h1>Relation Type:</h1>
              <Input value={relationType} onChange={(e) => setRelationType(e.target.value)} type={'number'} placeholder="Relation type" />
            </div>
            <div>
              <h1>Relation color:</h1>
              <Select itemsWithNoObjects items={colors} onChange={(e) => setSelectedColor(e.target.value)} value={selectedColor} />
            </div>
          </div>

          <p>{JSON.stringify(relations)}</p>
          <Button text={'Submit relation'} onClick={addRelation} />
          <CSVLink filename="stakeholders" className="py-2 text-white px-2 rounded-md bg-black mt-3" data={stakeholdersData}>
            Download .csv
          </CSVLink>
          <CSVLink filename="stakeholders" className="py-2 text-white px-2 rounded-md bg-black mt-3" data={relationsData}>
            Download .csv
          </CSVLink>
        </div>
        {/*  */}

        <div className="flex flex-col items-center h-full w-full mt-4">
          <div className="w-11/12 h-5/6 my-t-4 mb-1 relative"></div>
        </div>
      </div>
    </>
  )
}
export default DataForm
