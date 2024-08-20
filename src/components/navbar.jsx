import React from 'react'

const navbar = () => {
    return (
        <nav className='bg-#121111' >
            {/* <img src="https://img.icons8.com/?size=100&id=fxFxDuWsCTtA&format=png&color=000000" alt="" srcset="" /> */}
            <div className='mycontainer  flex justify-between items-center px-4 py-5 h-14 rounded-md  text-white text-xl' >

                <div className='logo font-bold text-2xl'>
                    <span className=' text-white'>&lt;</span>
                    Lock
                    <span className='text-green-500'>
                        VAULT
                    </span>
                    <span className=' text-white'>/&gt;</span>

                </div>
                <ul>
                    {/* <li className='flex gap-4'>
                        <a className='hover:font-bold hover:text-green-400' href="/">Home</a>
                        <a className='hover:font-bold hover:text-green-400' href="#">About</a>
                        <a className='hover:font-bold hover:text-green-400' href="#">Contact</a>
                    </li> */}
                </ul>
                <button className='ring-white ring-2 flex items-center justify-between text-white bg-slate-900 rounded-full px-1 mt-3 '>
                    <img className='' width={55} src="/icons/github1.svg" alt="github logo" />
                    GitHub &nbsp;
                </button>
            </div>
        </nav>
    )
}

export default navbar
