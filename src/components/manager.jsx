import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const getpasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setpasswordArray(passwords)
    }


    useEffect(() => {
        getpasswords()


    }, [])

    const copyText = (text) => {
        toast.success('Text Copied', {
            position: "bottom-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const showpassword = async () => {

        if (ref.current.src.includes("icons/hide.png")) {
            passwordref.current.type = "password"
            ref.current.src = "icons/show.png"
        }
        else {
            passwordref.current.type = "text"
            ref.current.src = "icons/hide.png"
        }

    }
    const savepassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])

            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
            // console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            toast('Error: Password not saved!');
        }
    }
    const deletepassword = async (id) => {

        let c = confirm("Do you want to delete this password ?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

            toast.success('Password Deleted', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            // console.log(passwordArray)
        }
    }
    const editpassword = (id) => {

        console.log("edit password with id", id)
        setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setpasswordArray(passwordArray.filter(item => item.id !== id))

    }
    const handlechange = async (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (


        <>
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            >
            </ToastContainer>


            <div className="absolute inset-0 -z-10 h-full w-full items-center w- px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            <div className="p-2 m-4 md:p-0 md:mycontainer min-h-[79.5vh]">

                <h1 className='text-4xl text-white text-center w-'>
                    <span className=' text-white'>&lt;</span>
                    Lock
                    <span className='text-green-500'>
                        VAULT
                    </span>
                    <span className=' text-white'>/&gt;</span>
                </h1>
                <p className='text-white font-bold text-lg px-6 text-center w-'>Your Own
                    <span className='text-green-500'>
                        &nbsp; PASSWORD MANAGER
                    </span>
                </p>
                <div className='text-white flex flex-col p-6 mx-8 md:p-8 gap-6 items-center '>
                    <input value={form.site} onChange={handlechange} placeholder='Enter Website URL' className='rounded-full border border-green-400 w-full text-white bg-black px-2 text-lg font-medium' type="text" name='site' id='site' />
                    <div className='flex flex-col md:flex-row w-full justify-between p-4 gap-8 '>
                        <input value={form.username} onChange={handlechange} placeholder='Enter Username ' className='rounded-full border w-full border-green-400  bg-black text-white px-2 text-lg font-medium' type="text" name="username" id="username" />
                        <div className="relative">

                            <input ref={passwordref} value={form.password} onChange={handlechange} placeholder='Enter Password' className='rounded-full border border-green-400 w-full bg-black text-white px-2 text-lg font-medium' type="password" name="password" id="password" />
                            <span className='absolute right-2 top-0 cursor-pointer' onClick={showpassword} >
                                <img ref={ref} className='p-1' width={30} src="icons/show.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savepassword} className='flex gap-1 rounded-full bg-slate-900 px-6 py-3 items-center w- border-2 justify-center w-       hover:font-bold hover:bg-violet-950  ' trigger="lord">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            colors="primary:#22C55E"
                        >
                        </lord-icon>
                        Save</button>
                </div>
                <div className="passwords">
                    <h2 className='text-white font-bold py-4 text-2xl text-center'> Your password</h2>
                    {passwordArray.length === 0 && <div className='text-white text-xl text-center'>No Passwords To Show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden text-white mb-6">
                            <thead className='bg-green-700 font-bold '>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-slate-950 '>
                                {passwordArray.map((items, index) => {
                                    return <tr key={index}>
                                        <td className=' border border-white py-2 text-center '>
                                            <div className=' flex  items-center gap-2'>
                                                <a href={items.site} target='_blank' className='mx-1' >{items.site}</a>

                                                <img className='cursor-pointer mx-1' width={20} src="icons/copy2.png" alt="" onClick={() => { copyText(items.site) }} />

                                            </div>
                                        </td >
                                        <td className='border border-white py-2 text-center '>
                                            <div className=' flex items-center  gap-2'>
                                                <span className='mx-1'>
                                                    {items.username}
                                                </span>
                                                <img className=' cursor-pointer mx-1' width={20} src="icons/copy2.png" alt="" onClick={() => { copyText(items.username) }} />
                                            </div>
                                        </td >
                                        <td className='border border-white py-2 text-center '>
                                            <div className=' flex items-center  gap-2'>
                                                <span className='mx-1'>{"*".repeat(items.password.length)}
                                                </span>
                                                <img className=' cursor-pointer mx-1' width={20} src="icons/copy2.png" alt="" onClick={() => { copyText(items.password) }} />
                                            </div>
                                        </td>
                                        <td className=' border border-white py-2 text-center '>
                                            <div className='flex items-center justify-around'>

                                                <span className='cursor-pointer' onClick={() => { editpassword(items.id) }}>
                                                    <img className='mx-1' src="icons/edit.png" alt="Edit" width={17} />
                                                </span>
                                                <span className='cursor-pointer' onClick={() => { deletepassword(items.id) }}>
                                                    <img className='mx-1' src="icons/delete.png" alt="delete" width={20} />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>

                                })}
                            </tbody>
                        </table>}
                </div>

            </div>
        </>
    )
}

export default manager
