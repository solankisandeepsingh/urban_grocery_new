import React from 'react'

const Memo = (props) => {
    // console.log("Comp Ran")
  return (
    <div className='p-4'>
        {console.log("comp ran in render")}
          {props.text}
    </div>
  )
}

export default React.memo(Memo)