const Select = ({ onChange, items, value, itemsWithNoObjects = false }) => {
  return (
    <select
      className="border border-gray-300 focus:outline-none focus:ring-0 focus:border-primary py-1.5 px-3 rounded-md w-3/4"
      placeholder="Select stakeholder"
      onChange={onChange}
      value={value}
      id=""
    >
      {items.map((item, i) => {
        return <option key={i}>{itemsWithNoObjects ? item : item.name}</option>
      })}
    </select>
  )
}
export default Select
