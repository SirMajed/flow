const Button = ({ onClick, type, icon, text, classes }) => {
  return (
    <button type={type} onClick={onClick} className={`flex items-center gap-2 rounded-md bg-accent hover:bg-primaryHover transition px-4 py-1.5 text-white ${classes}`}>
      {icon}
      {text}
    </button>
  )
}
export default Button
