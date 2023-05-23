import * as React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { base_url } from 'utils/baseUrl'
import Image from 'next/image'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ClipboardJS from '../Clipboard'

export default function Flash3() {
  const [data, setData] = useState({})

  const getFlashSaleProduct = async () => {
    try {
      const getFlashIdFromLocalStorage = localStorage.getItem('productId')
        ? JSON.parse(localStorage.getItem('productId'))
        : null
      const id = getFlashIdFromLocalStorage.state.productId

      const api = axios.create({
        baseURL: base_url
      })

      const myPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await api.get(`flashSale/${id}/`)
          console.log(response)
          if (response.status === 200) {
            resolve()
          }
          setData(response.data.flashSaleProduct)
          setLink(response.data._id)
        } catch (error) {
          if (error) {
            reject()
          } else {
            reject()
          }
        }
      })

      toast.promise(myPromise, {
        pending: 'Fetching and populating coupon data...',
        success: 'populating complete 🎉 ',
        error: 'something went wrong'
      })
    } catch (err) {
      console.log(err)
    }
  }
  console.log(data)
  useEffect(() => {
    getFlashSaleProduct()
  }, [])

  const handleCopySuccess = () => {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <>
      <ToastContainer />

      <Grid>
        <Typography>Product Name: {data.productId?.title}</Typography>
        <Typography>isSpecialProduct:{data.productId?.isSpecial ? 'True' : 'False'}</Typography>
        <Typography>isFeaturedProduct:{data.productId?.isFeatured ? 'True' : 'False'}</Typography>
        <Typography>Discount:{data.discountPercentage}%</Typography>
        <Typography>Quantity:{data.quantity}</Typography>
        <Typography>Start time:{data.startTime}</Typography>
        <Typography>End time:{data.endTime}</Typography>
      </Grid>
    </>
  )
}
