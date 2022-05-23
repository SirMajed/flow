const Button = ({ onClick, icon, text, color = 'primary', classes, children }) => {
  return (
    <button onClick={onClick} className={`flex items-center gap-2 ${color === 'primary' && 'bg-primary'} bg-button_primary px-3 py-1.5 text-white ${classes}`}>
      {text}
      {icon}
    </button>
  )
}
export default Button
