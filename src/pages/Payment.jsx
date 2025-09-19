import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../config/axiosinstance'

export const Payment = () => {
    const {id} = useParams()
    console.log(id)

    useEffect(()=>{
        const getBooking = async ()=>{
            try {
                
            } catch (error) {
                
            }
        }
        getBooking()
    },[])
  return (
    <div>Payment</div>
  )
}


export default Payment
