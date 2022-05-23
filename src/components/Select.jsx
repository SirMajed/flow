const Select = ({ onChange, items, value, itemsWithNoObjects = false }) => {
  return (
    <select className="block  border rounded-md border-gray-400 w-3/4 py-1" placeholder="Select stakeholder" onChange={onChange} value={value} id="">
      {items.map((item, i) => {
        return <option key={i}>{itemsWithNoObjects ? item : item.name}</option>
      })}
    </select>
  )
}
export default Select
