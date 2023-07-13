import React, {useState} from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthProvider'

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoggingIn, setIsLoggingIn] = useState(true)
    const {login, signup} = useAuth()

    async function submitHandler() {
        if(!email || !password) {
            setError("Please enter email and password")
            return
        }
        if(isLoggingIn) {
            try {
                await login(email, password)
            } catch(err) {
                setError("Incorrect email or password")
                return;
            }
            router.push('/')
        }
        try { 
            await signup(email,password)
        } catch(err) {
            setError('Invalid registration info')
            return;
        }
        router.push('/')
    }

  return (
    <div className='flex-1 gap-2 sm:gap-4 text-xs sm:text-sm flex flex-col justify-center items-center'>
        <h1 className='font-extrabold select-none text-2xl sm:text-4xl uppercase'>{isLoggingIn ? 'LOGIN' : 'REGISTER'}</h1>
        {error && <div className='w-full max-w-[40ch] border-solid border text-center border-rose-300 text-rose-300 py-2'>{error}</div>}
        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email Address' className='duration-300 border-b-2 dark:bg-gray-900 border-solid border-white dark:border-black dark:focus:border-red-500 focus:border-cyan-300 outline-none text-slate-900 dark:text-rose-500 p-1 w-full max-w-[40ch]'/>
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' className='duration-300 dark:bg-gray-900 border-b-2 border-solid border-white dark:border-black dark:focus:border-red-500 focus:border-cyan-300 outline-none text-slate-900 dark:text-rose-500 p-1 w-full max-w-[40ch]'/>
        <button onClick={submitHandler} className='w-full max-w-[40ch] border border-white dark:border-black border-solid uppercase py-2 duration-300 hover:bg-white dark:hover:bg-black'>SUBMIT</button>
        <h2 className='duration-300 hover:scale-110' onClick={() => setIsLoggingIn(!isLoggingIn)}>{!isLoggingIn ? 'Login' : 'Register'}</h2>
    </div>
  )
}

export default Login