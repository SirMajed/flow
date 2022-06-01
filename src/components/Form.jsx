import React from 'react'

const Form = ({ onSubmit, children, dir, className }) => {
  return (
    <form className={className} onSubmit={onSubmit} dir={dir}>
      {children}
    </form>
  )
}

export default Form
