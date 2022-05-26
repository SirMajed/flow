const Select = ({ onChange, required, items, value, itemsWithNoObjects = false }) => {
  return (
    <select
      required={required}
      className="border border-gray-300 focus:outline-none focus:ring-0 focus:border-primary py-1.5 px-3 rounded-md w-3/4"
      placeholder="Select stakeholder"
      onChange={onChange}
      value={value}
      id=""
    >
      <option disabled={true} value="">
        إختر
      </option>
      {items.map((item, i) => {
        return (
          <option value={item.value} key={i}>
            {itemsWithNoObjects ? item : item.name || item.label}
          </option>
        )
      })}
    </select>
  )
}
export default Select
