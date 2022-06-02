const Select = ({ onChange, required, items, value, itemsWithNoObjects = false, disabled = false }) => {
  return (
    <select
      required={required}
      className={`border border-gray-300 focus:outline-none focus:ring-0 focus:border-primary py-1.5 px-3 rounded-md w-full ${disabled && 'bg-gray-100'}`}
      onChange={onChange}
      value={value}
      id=""
      disabled={disabled}
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
