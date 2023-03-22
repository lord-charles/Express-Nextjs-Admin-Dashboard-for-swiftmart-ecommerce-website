import * as React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { base_url } from 'utils/baseUrl'
import Image from 'next/image'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ClipboardJS from './Clipboard'

export default function AddColor3() {
  // ClipboardJS
  const [isCopied, setIsCopied] = useState(false)
  const clipboardRef = useRef(null)

  const [product, setProduct] = useState({})
  const [link, setLink] = useState('')

  const getSingleProduct = async () => {
    try {
      const getProductIDFromLocalStorage = localStorage.getItem('productId')
        ? JSON.parse(localStorage.getItem('productId'))
        : null

      const productId = getProductIDFromLocalStorage.state.productId

      const api = axios.create({
        baseURL: base_url
      })

      const myPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await api.get(`products/${productId}/`)
          if (response.status === 200) {
            resolve()
          }
          setProduct(response.data)
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
        pending: 'Fetching and populating products data...',
        success: 'populating complete 🎉 ',
        error: 'something went wrong'
      })
    } catch (err) {
      console.log(err)
    }
  }
  console.log(product)
  useEffect(() => {
    getSingleProduct()

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
      <ToastContainer />

      <Typography variant='h3' sx={{ mt: 2 }}>
        Product details
      </Typography>
      <div className='flex justify-between'>
        <Typography variant='body2' sx={{ fontWeight: 700 }}>
          Name: {product?.title}
        </Typography>
        <div>
          <button ref={clipboardRef} data-clipboard-text={link} className='flex'>
            {link}{' '}
            {isCopied ? (
              'Copied!'
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z'
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <Typography variant='body2' sx={{ mt: 2, fontWeight: 700 }}>
        Price : ksh {product?.price}
      </Typography>
      <Typography variant='body2' sx={{ mt: 2, fontWeight: 700 }}>
        description: {product?.description}
      </Typography>
      <Typography variant='body2' sx={{ mt: 2, fontWeight: 700 }}>
        richDescription: {product?.richDescription}
      </Typography>
      <Typography variant='body2' sx={{ mt: 2, fontWeight: 700 }}>
        quantity: {product?.quantity}
      </Typography>
      <Typography variant='body2' sx={{ mt: 2, fontWeight: 700 }}>
        isFeatured: {product?.isFeatured ? 'true' : 'false'}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h5' sx={{ mt: 2 }}>
            Category details
          </Typography>
          <Grid sx={{ mt: 2 }}>
            Category:{' '}
            {product.category?.map((product, index) => {
              return (
                <Grid container key={index} className='relative left-[100px] top-[-23px]'>
                  {product.title}
                </Grid>
              )
            })}
          </Grid>
          <Grid>
            Sub-Category:
            {product.category?.map((product, index) => {
              return (
                <Grid container key={index} className='relative left-[120px] top-[-23px]'>
                  {product.title2}
                </Grid>
              )
            })}
          </Grid>
          <Grid>
            Category quantity:
            {product.category?.map((product, index) => {
              return (
                <Grid container key={index} className='relative left-[150px] top-[-23px]'>
                  {product.quantity}
                </Grid>
              )
            })}
          </Grid>
        </Grid>

        <Grid item>
          <Typography variant='h5' sx={{ mt: 2 }}>
            Brand details
          </Typography>
          <Grid sx={{ mt: 2 }}>
            Brand name:{' '}
            {product.brand?.map((product, index) => {
              return (
                <Grid container key={index} className='relative left-[100px] top-[-23px]'>
                  {product.title}
                </Grid>
              )
            })}
          </Grid>
          <Grid>
            Brand model:
            {product.brand?.map((product, index) => {
              return (
                <Grid container key={index} className='relative left-[110px] top-[-23px]'>
                  {product.model}
                </Grid>
              )
            })}
          </Grid>
          <Grid>
            Brand quantity:
            {product.brand?.map((product, index) => {
              return (
                <Grid container key={index} className='relative left-[120px] top-[-23px]'>
                  {product.quantity}
                </Grid>
              )
            })}
          </Grid>
        </Grid>

        <Grid item container direction='column'>
          <Typography variant='h5' sx={{ mt: 2 }}>
            Colors details
          </Typography>
          <Grid>
            <Grid sx={{ mt: 2 }}>
              Color name:{' '}
              {product.colors?.map((product, index) => {
                return (
                  <Grid container key={index} className='relative left-[100px] top-[-23px]'>
                    {product.name}
                  </Grid>
                )
              })}
            </Grid>
            <Grid>
              Color code:
              {product.colors?.map((product, index) => {
                return (
                  <Grid container key={index} className='relative left-[100px] top-[-23px]'>
                    {product.code}
                  </Grid>
                )
              })}
            </Grid>
            <Grid>
              Color quantity:
              {product.colors?.map((product, index) => {
                return (
                  <Grid container key={index} className='relative left-[120px] top-[-23px]'>
                    {product.availability}
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item container direction='column'>
          <Typography variant='h6' sx={{ mt: 2 }}>
            Images
          </Typography>
          <Grid>
            {product.images?.map((product, index) => {
              return (
                <Grid container spacing={2} key={index}>
                  <Image src={product.url} width={500} height={300} alt='image' />
                </Grid>
              )
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
