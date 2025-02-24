import React from 'react'

const Navigation = () => { 
  return (
    <div className='bg-black text-white w-1/5 h-screen relative'>
      <div className="logo flex gap-1 w-fit text-4xl mx-auto my-4">
        <span className="material-symbols-outlined pt-1 large-logo-icon text-purple-900">robot</span><span className='pb-1'>ChatBot</span>
      </div>
      <div className="previous-chats px-4 text-center">
        <h2 className='text-neutral-500'>Previous Conversations</h2>
        <div>

        </div>
      </div>
      <button type='button' className='absolute bottom-8 right-1/6 left-1/6 bg-violet-900 p-2 rounded-4xl'>New Conversation</button>
    </div>
  );
}

export default Navigation