import React from 'react'

const Memo = (props) => {
  return (
    <div className='p-4'>
          {props.text}
    </div>
  )
}

export default React.memo(Memo)