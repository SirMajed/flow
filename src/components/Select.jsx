import { t } from 'i18next'

const Select = ({ onChange, required, items, value, itemsWithNoObjects = false, disabled = false, OptionDefaultValue, fullWidth = true }) => {
  return (
    <select
      required={required}
      className={`${fullWidth ? 'w-full' : 'w-auto'} border border-gray-300 focus:outline-none focus:ring-0  focus:border-primary rounded-md ${
        disabled && 'bg-gray-100'
      }`}
      onChange={onChange}
      value={value}
      id=""
      disabled={disabled}
    >
      <option value="none">{OptionDefaultValue || t('choose')}</option>
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
