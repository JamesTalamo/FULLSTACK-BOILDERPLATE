
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'

const Sidebar = () => {

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: async () => {
            try {
                let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json'
                    },
                    credentials: 'include'
                })

                let data = await res.json()

                if (!res.ok) throw new Error(data.message)

                return data

            } catch (error) {
                throw new Error(error.message)
            }
        },
        onSuccess: (() => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] })
            window.location.reload()
        })
    })

    let handleLogout = () => {
        mutate()
    }

    const { data: authUser } = useQuery({ queryKey: ["authUser"] })

    console.log(authUser)

    return (
        <div className=' h-full w-[80px] fixed left-0 top-0 z-10 flex flex-col items-center justify-between'>
            <div className='w-[100%] h-[60%] bg-red-500'></div>

            <div className='w-full mb-[30%] flex items-center justify-center '>

                <div className="dropdown dropdown-right dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1  bg-black"></div>

                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow outline outline-[1px] outline-[rgba(0,0,0,0.4)]">
                        <li className='text-red-600 font-bold' onClick={handleLogout}><a>Logout</a></li>
                    </ul>

                </div>

            </div>
        </div>
    )
}

export default Sidebar