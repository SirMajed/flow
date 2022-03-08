const Button = ({ onClick, icon, text, color }) => {
  return (
    <button onClick={onClick} className={`flex items-center gap-2 ${color === 'primary' && 'bg-primary'} bg-black px-5 py-1.5 my-4 text-white`}>
      {text}
      {icon}
    </button>
  )
}
export default Button
