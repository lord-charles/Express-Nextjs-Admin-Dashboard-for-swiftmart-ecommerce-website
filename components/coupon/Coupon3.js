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

export default function AddBrand3() {
  // ClipboardJS
  const [isCopied, setIsCopied] = useState(false)
  const clipboardRef = useRef(null)

  const [coupon, setcoupon] = useState({})
  const [link, setLink] = useState('')

  const getSinglecoupon = async () => {
    try {
      const getcouponIdFromLocalStorage = localStorage.getItem('productId')
        ? JSON.parse(localStorage.getItem('productId'))
        : null
      const couponId = getcouponIdFromLocalStorage.state.productId

      const api = axios.create({
        baseURL: base_url
      })

      const myPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await api.get(`coupon/${couponId}/`)
          if (response.status === 200) {
            resolve()
          }
          setcoupon(response.data)
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
  console.log(coupon)
  useEffect(() => {
    getSinglecoupon()

    //for ClipboardJS
    if (clipboardRef.current) {
      const clipboard = new ClipboardJS(clipboardRef.current)
      clipboard.on('success', handleCopySuccess)

      return () => clipboard.destroy()
    }
  }, [link])

  const handleCopySuccess = () => {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <>
      <Grid>
        <Typography>name: {coupon.name}</Typography>
        <Typography>expiry:{coupon.expiry}</Typography>
        <Typography>discount:{coupon.discount}%</Typography>
      </Grid>
    </>
  )
}
