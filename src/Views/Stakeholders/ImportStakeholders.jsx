import { useState } from 'react'
import CSVReader from 'react-csv-reader'
import { Link } from 'react-router-dom'
import Table from 'components/Table'
import Button from 'components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { addStakeholderArray, deleteStakeholder } from 'redux/slices/stakeholderSlice'
const ImportStakeholder = () => {
  const [fileName, setFileName] = useState(null)
  const dispatch = useDispatch()
  const { stakeholders } = useSelector((s) => s.stakeholders)
  const handleForce = (data, fileInfo) => {
    dispatch(addStakeholderArray(data))
    setFileName(fileInfo.name)
  }
  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, '_'),
  }
  const removeStakeholder = (name) => {
    dispatch(deleteStakeholder(name))
  }
  return (
    <>
      <div className="flex flex-col items-center gap-10 justify-center h-screen bg-zinc-50" id="main">
        <div className="flex-col w-11/12 md:w-2/3 lg:w-2/6">
          <div className="text-center mt-4 mb-2">
            <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-4xl lg:w-full text-primary font-black leading-6 lg:leading-10 md:text-center text-center">
              استيراد المساهمين
            </h1>
            <p className="text-tlight">قم برفع ملف الإكسل لعرض الجدول وتعديل البيانات</p>
          </div>
          <div className="flex flex-col items-center mt-8">
            <div className="flex flex-row-reverse justify-center items-center gap-3">
              <p className="text-primary my-8">إختر الملف المراد رفعه</p>
              <label className="" style={{ height: 'fit-content' }}>
                <p className="bg-primary bg-opacity-10 rounded-full px-4 py-2 text-primary">{fileName ?? 'إختر الملف'}</p>
                <CSVReader inputId="CSVReader" inputStyle={{ display: 'none' }} onFileLoaded={handleForce} parserOptions={papaparseOptions} />
              </label>
            </div>
          </div>
          {stakeholders.length >= 1 && <Table data={stakeholders} handleDelete={removeStakeholder} tableHeaders={['اسم المساهم', 'نوع المساهم', 'خيارات']} />}
          <div className="flex items-center justify-between mt-4">
            {/* <CSVLink filename="stakeholders" className="py-1.5 text-white px-2 rounded-md bg-button_primary" data={stakeholdersData}>
              .csv تصدير الجدول بصيغة
            </CSVLink> */}
            <Link to={'/stakeholders'}>
              <Button classes={'rounded-md'} text="الخلف" onClick={() => {}} />
            </Link>
            {stakeholders.length >= 1 && (
              <Link to={'/relations'}>
                <Button classes={'rounded-md'} text="الخطوة التالية" onClick={() => {}} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default ImportStakeholder
