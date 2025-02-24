import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import { toast } from 'react-hot-toast'


const RegisterPage = () => {
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const { mutate, isError, error } = useMutation({
        mutationFn: async ({ username, password }) => {
            try {
                let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ username, password }),
                    credentials: 'include'
                })

                const data = await res.json()

                if (!res.ok) throw new Error(data.error)

                return data

            } catch (error) {
                throw new Error(error.message)
            }
        },
        onSuccess: (() => {
            toast.success('user has been created.')
            navigate('/login')
        })
    })


    let submitForm = (e) => {
        e.preventDefault()
        mutate(formData)

    }

    let handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className='w-screen h-dvh bg-white relative flex items-center justify-center'>

            <div className='w-[370px] z-[10]  flex items-center justify-center flex-col p-5'>
                <div className='font-bold text-black'>Create Your Account</div>

                <form type='submit' className='w-[100%]  flex items-center justify-center flex-col gap-4 pt-5' onSubmit={submitForm}>
                    <input type="text" placeholder="Username" className="input input-bordered w-full max-w-xs bg-white text-black" name='username' onChange={handleInputChange} />
                    <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs bg-white text-black" name='password' onChange={handleInputChange} />
                    {isError && <div className="text-red-500">{error.message}</div>}

                    <button className="btn btn-neutral bg-black w-[97%]">Register</button>
                </form>
                <div className='pt-10 text-black'> Already have an account? Login! </div>

                <Link to='/login'>
                    <button className="btn btn-sm" >Login</button>
                </Link>

            </div>
        </div>
    )
}

export default RegisterPage