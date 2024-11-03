import React from 'react'

const Refresh = () => {
    const handleRefresh = ()=>{
        window.location.reload()
    }
  return (
    <div className='w-full my-3 flex items-center justify-center '>
        <button onClick={handleRefresh} className='bg-primary hover:bg-accent transition-all duration-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-offset-2 ring-accent '>
            Refresh Page
        </button>
    </div>
  )
}

export default Refresh