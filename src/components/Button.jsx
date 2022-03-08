const Button = ({onClick, icon, text, color}) => {
  reurn(
    <button onClick={handleClear} className="flex items-center gap-2 bg-black px-5 py-1.5 my-4 text-white">
      {text}
      <MdClear color="white" size={20} />
    </button>
  )
}
export default Button
