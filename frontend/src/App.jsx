
import { Routes, Route, Navigate } from "react-router-dom"
import Loading from "./pages/loading/Loading.jsx"

import RegisterPage from "./pages/register/RegisterPage.jsx"
import LoginPage from "./pages/login/LoginPage.jsx"

import Sidebar from "./components/sidebar/Sidebar.jsx"

import { Toaster } from 'react-hot-toast';

import { useQueryClient, useQuery } from '@tanstack/react-query'

import { axiosReq } from "./lib/axios.js"

function App() {

  const queryClient = useQueryClient()

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {

        let res = await axiosReq.get('/auth/me')
        return res.data

      } catch (error) {
        throw new Error(error.message)
      }
    },
    retry: false
  })

  if (isLoading) {
    return (
      <div className='w-full h-[100vh] flex items-center justify-center'>
        <Loading />
      </div>
    )
  }


  return (
    <div className='w-screen h-dvh flex justify-center items-end'>

      {authUser && <Sidebar />}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: '',
          style: {
            border: '1px solid #000000',
            padding: '16px',
            color: '#713200',
          },
        }}
      />
      <Routes>
        <Route path='/' element={authUser ? <div> Welcome</div> : <Navigate to='/login' />} />


        <Route path='/register' element={authUser ? <Navigate to='/' /> : <RegisterPage />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <LoginPage />} />


      </Routes>
    </div>
  )
}

export default App
