import { MdDeleteOutline, MdOutlineModeEditOutline } from 'react-icons/md'
const Table = ({ data, handleEdit, handleDelete, tableHeaders }) => {
  return (
    <div className="relative h-72 overflow-y-auto overflow-x-auto shadow-md sm:rounded-lg mt-4">
      {data.length >= 1 ? (
        <table dir="rtl" className="w-full  text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 shadow-md">
            <tr>
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
            {data.map((item, i) => {
              return (
                // dark:bg-gray-800 dark:border-gray-700
                <tr key={i} className="bg-white border-b ">
                  <td className="px-6 py-4">{item.name || 'الإسم'}</td>
                  <td>{item?.type || 'النوع'}</td>
                  <td className="px-6 py-4 flex items-center justify-center gap-4">
                    <MdDeleteOutline onClick={() => handleDelete(item.name)} className="cursor-pointer" size={20} />
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
  )
}

export default Table
