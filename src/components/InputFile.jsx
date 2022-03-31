const InputFile = ({ re, onChange, label }) => {
  return (
    <>
      <p className="text-sm mt-3">{label}</p>
      <label className="block mt-1">
        <input
          ref={re}
          accept=".csv,.xlsx,.xls"
          onChange={onChange}
          type="file"
          className="block w-full text-xs text-tlight dark:text-tdark
                          file:py-2 file:px-4
                          file:border-0
                          file:text-sm file:font-semibold
                          file:bg-primary file:dark:bg-darkField file:text-white dark:text-opacity-50
                          hover:file:bg-opacity-80
                          focus:outline-none
                        "
        />
      </label>
    </>
  )
}
export default InputFile
