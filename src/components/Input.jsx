const Input = ({ value, placeholder, required, onChange, isError = false, type = 'text' | 'number' | 'email' | 'password' }) => {
  return (
    <>
      <input
        required={required}
        type={type}
        step={type === 'number' ? '0.01' : 'any'}
        className={`border border-gray-300 ${
          isError && 'border-red-500 placeholder-red-500 focus:border-red-500'
        } focus:outline-none focus:ring-0 focus:border-primary py-1.5 px-3 rounded-md w-3/4`}
        value={value}
        onChange={onChange}
        placeholder={isError ? 'يجب عدم ترك الحقل فارغ' : placeholder}
      />
    </>
  )
}

export default Input
