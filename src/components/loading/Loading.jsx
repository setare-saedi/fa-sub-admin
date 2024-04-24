import { BallTriangle } from 'react-loader-spinner'


export default function Loading(){

    return(
        <div className=" h-screen top-0 right-0 w-full absolute bg-gray-600 opacity-80 z-50">
           <div className='flex flex-col font-bold text-2xl justify-center items-center text-ceter w-3/5  py-12 absolute top-[30%] right-[20%] rounded-md text-white'>
           <span className=' text-center '>
            درحال پردازش، لطفا صبر کنید.
           </span>
           <BallTriangle color='#0b6170' />
           </div>
        </div>
    )
}