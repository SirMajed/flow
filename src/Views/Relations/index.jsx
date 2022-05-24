// import React from 'react'
// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import ReactTooltip from 'react-tooltip'
// import Button from '../../components/Button'
// import CreateRelationsForm from './CreateRelationsForm'

// const CreateStakeholders = () => {
//   return (
//     <>
//       <div className="flex items-center gap-10 justify-center h-screen bg-zinc-50" id="main">
//         <div className="flex-col w-11/12 md:w-2/3 lg:w-2/6">
//           <div className="mt-4 mb-2 text-center">
//             <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl lg:w-full text-primary font-black leading-6 lg:leading-10 md:text-center text-center">
//               إنشاء العلاقات بين اصحاب المصلحة
//             </h1>
//           </div>

//           <CreateRelationsForm />

//           {/* <Table data={stakeholders} handleDelete={removeStakeholder} tableHeaders={['اسم المساهم', 'نوع المساهم', 'خيارات']} /> */}

//           <div className="flex flex-row-reverse items-center justify-between mt-4">
//             {/* <CSVLink filename="stakeholders" className="py-1.5 text-white px-2 rounded-md bg-button_primary" data={stakeholdersData}>
//               .csv تصدير الجدول بصيغة
//             </CSVLink> */}
//             <Link to={'/stakeholders/create'}>
//               <Button classes={'rounded-md'} text="الخلف" onClick={() => {}} />
//             </Link>
//             <Link to={'/relations'}>
//               <Button classes={'rounded-md'} text="النتائج" onClick={() => {}} />
//             </Link>
//           </div>
//         </div>
//         {/*  */}
//       </div>
//       <ReactTooltip />
//     </>
//   )
// }

// export default CreateStakeholders

import React from 'react'
import { useState } from 'react'
import CSVReader from 'react-csv-reader'
import { BsUpload } from 'react-icons/bs'
import { IoCreateOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { addRelationArray, clearStakeholders } from '../../redux/slices/stakeholderSlice'
const Index = () => {
  const [fileName, setFileName] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleForce = (data, fileInfo) => {
    dispatch(addRelationArray(data))
    setFileName(fileInfo.name)
    navigate('/relations/create')
  }
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
  }
  return (
    <>
      <div className="flex items-center gap-10 justify-center  h-screen ">
        {/* <div className="flex items-center gap-3 rounded-md bg-black hover:bg-gray-900 transition text-white font-bold  border shadow-lg p-5 cursor-pointer">
          <BsUpload size={22} />
          رفع الملف <CSVReader inputId="CSVReader" inputStyle={{ display: 'none' }} onFileLoaded={handleForce} parserOptions={papaparseOptions} />
        </div> */}
        <label className="rounded-md bg-black hover:bg-gray-900 transition text-white font-bold  border shadow-lg p-5 cursor-pointer" style={{ height: 'fit-content' }}>
          <p className="flex items-center gap-3">
            {fileName ?? ' رفع الملف'}
            <BsUpload size={22} />
          </p>
          <CSVReader inputId="CSVReader" inputStyle={{ display: 'none' }} onFileLoaded={handleForce} parserOptions={papaparseOptions} />
        </label>
        <p>او</p>
        <div
          onClick={() => {
            navigate('/relations/create')
            dispatch(clearStakeholders())
          }}
          className="flex items-center gap-2 rounded-md bg-black hover:bg-gray-900 transition text-white font-bold  border shadow-lg p-5 cursor-pointer"
        >
          <IoCreateOutline size={25} />
          إنشاء العلاقات
        </div>
      </div>

      {/* {selectStep === 'create' ? <CreateStakeholder /> : <ImportStakeholder />} */}
    </>
  )
}

export default Index
