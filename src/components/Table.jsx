import { CSVLink } from 'react-csv'
import { MdDeleteOutline, MdOutlineModeEditOutline } from 'react-icons/md'
const Table = ({ type, data, handleEdit, handleDelete, tableHeaders, deleteTableData }) => {
  return (
    <>
      <div className="flex justify-between items-center mt-4 mx-2">
        <h1 onClick={deleteTableData} className="text-primary2 text-sm cursor-pointer">
          حذف الجدول
        </h1>
        <CSVLink filename={type === 'stakeholders' ? 'stakeholders' : 'relations'} className="text-sm text-primary2" data={data}>
          تحميل البيانات بصيغة (csv.)
        </CSVLink>
      </div>
      <div className="relative h-[20rem] overflow-y-auto overflow-x-auto shadow-md sm:rounded-lg mt-2">
        {data.length >= 1 ? (
          <table dir="rtl" className="w-full  text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-zinc-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0 shadow-md">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                {tableHeaders.map((item, i) => {
                  return (
                    <th key={i} scope="col" className="px-6 py-3">
                      {item}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {type === 'stakeholders'
                ? data.map((item, i) => {
                    return (
                      // dark:bg-gray-800 dark:border-gray-700
                      <tr key={i} className="bg-white border-b ">
                        <td className="px-6 py-4">{i + 1}</td>
                        <td className="px-6 py-4">{item.label || 'الإسم'}</td>
                        <td>{item?.type || 'النوع'}</td>
                        <td className="px-6 py-4 flex items-center justify-center gap-4">
                          <MdDeleteOutline onClick={() => handleDelete(item.name)} className="cursor-pointer" size={20} />
                          <MdOutlineModeEditOutline onClick={() => handleEdit(item)} className="cursor-pointer" size={20} />
                        </td>
                      </tr>
                    )
                  })
                : data.map((item, i) => {
                    return (
                      // dark:bg-gray-800 dark:border-gray-700
                      <tr key={i} className="bg-white border-b ">
                        <td className="px-6 py-4">{i + 1}</td>
                        <td className="px-6 py-4">{item.from}</td>
                        <td className="px-6 py-4">{item.to}</td>
                        <td className="px-6 py-4">{item.rel}</td>
                        <td className="px-6 py-4">{item.weight}</td>
                        <td className="px-6 py-4">{item.reltype}</td>
                        <td className="px-6 py-4">{item.relcolor}</td>
                        <td className="px-6 py-4 flex items-center justify-center gap-4">
                          <MdDeleteOutline onClick={() => handleDelete(i)} className="cursor-pointer" size={20} />
                          <MdOutlineModeEditOutline onClick={() => handleEdit(item)} className="cursor-pointer" size={20} />
                        </td>
                      </tr>
                    )
                  })}
            </tbody>
          </table>
        ) : (
          <p className="flex justify-center text-gray-500 ">لا توجد بيانات, قم بإنشاؤها </p>
        )}
      </div>
    </>
  )
}

export default Table
