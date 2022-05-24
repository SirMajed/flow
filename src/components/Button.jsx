const Button = ({ onClick, icon, text, classes }) => {
  return (
    <button onClick={onClick} className={`flex items-center gap-2 rounded-md bg-primary hover:bg-primaryHover transition px-3 py-1.5 text-white ${classes}`}>
      {text}
      {icon}
    </button>
  )
}
export default Button
