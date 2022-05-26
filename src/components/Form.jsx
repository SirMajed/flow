import React from 'react'

const Form = ({ onSubmit, children, action, autoComplete, dir }) => {
  return (
    <form onSubmit={onSubmit} dir={dir} autoComplete={autoComplete} action={action}>
      {children}
    </form>
  )
}

export default Form
