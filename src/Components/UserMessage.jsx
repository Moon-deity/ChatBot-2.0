import React from 'react'

const UserMessage = (props) => {
  return (
    <div key={props.index} className="user-message flex flex-col items-end my-2 gap-2">
      <div className="bg-violet-900 rounded-4xl w-5 h-5"></div>
      <div className='bg-neutral-700 rounded-3xl w-fit max-w-3/4 h-fit flex p-2'>
        {props.message}
      </div>
    </div>
  );
}

export default UserMessage