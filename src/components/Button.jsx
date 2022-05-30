import { IconContext } from 'react-icons'

const Button = ({ onClick, type, icon, text, classes }) => {
  return (
    <button type={type} onClick={onClick} className={`flex items-center gap-2 rounded-md bg-accent hover:bg-primaryHover transition px-3 py-[7px] text-white ${classes}`}>
      {text}
      {icon}
    </button>
  )
}
export default Button
