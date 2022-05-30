import React from 'react'

const Form = ({ onSubmit, children, action, autoComplete, dir, className }) => {
  return (
    <form className={className} onSubmit={onSubmit} dir={dir} autoComplete={autoComplete} action={action}>
      {children}
    </form>
  )
}

export default Form
