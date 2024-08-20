import React from 'react'

const footer = () => {
    return (

        <div className='text-white flex flex-col items-center justify-center bg-slate-900 p-1 w-full'>
             <div className='logo font-bold text-2xl'>
                    <span className=' text-white'>&lt;</span>
                    Lock
                    <span className='text-green-500'>
                        VAULT
                    </span>
                    <span className=' text-white'>/&gt;</span>

                </div>
            <div>
                Created with by AP
            </div>
        </div>
    )
}

export default footer
