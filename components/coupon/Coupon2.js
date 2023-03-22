import * as React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useState } from 'react'
import { Button } from '@mui/material'
import { toast, Toaster } from 'react-hot-toast'
import useStore3 from 'utils/Store3'
import useStore2 from 'utils/Store2'
import { createCoupons } from 'src/features/coupon/couponService'
import { useEffect } from 'react'

const notify = message => toast.error(message)

const token =
  typeof window !== 'undefined' && localStorage.getItem('useDetails')
    ? JSON.parse(localStorage.getItem('useDetails'))
    : null

export default function AddBrand({ handleNext }) {
  const { setProductId } = useStore2()
  const [productId, setproductId] = useState('')
  const [name, setname] = useState('')
  const [expiry, setexpiry] = useState('')
  const [discount, setdiscount] = useState('')
  const [btnActive, setBtnActive] = useState(true)
  const [brandSuccess, setSuccessFromLocalStorage] = useState(false)
  const { setSuccessRateBrand } = useStore3()

  const couponData = {
    name,
    expiry,
    discount
  }
  console.log(couponData)

  const handleNextPage = () => {
    setBtnActive(false)

    const getsuccessFromLocalStorage =
      typeof window !== 'undefined' && localStorage.getItem('successRate')
        ? JSON.parse(localStorage.getItem('successRate'))
        : null

    if (getsuccessFromLocalStorage.state.successRateBrand) {
      setTimeout(() => {
        handleNext()
      }, 3000)
    } else {
      notify('Something went wrong, please try again. if error persists, contact developer')
      setBtnActive(true)
    }
  }

  const handleAddCouponDetails = () => {
    setBtnActive(false)
    createCoupons(
      couponData,
      token.state.userDetails.token,
      setBtnActive,
      handleNextPage,
      setSuccessRateBrand,
      setProductId
    )
  }

  return (
    <>
      <Typography variant='h4' gutterBottom>
        Coupon
      </Typography>
      <Toaster />

      <Grid item xs={12} md={8}>
        <TextField
          required
          id='name'
          label='name'
          helperText='unique'
          variant='standard'
          value={name}
          onChange={event => setname(event.target.value)}
        />
      </Grid>

      <Grid item xs={12} md={8}>
        <TextField
          required
          id='Expire date'
          label='Expire date'
          variant='standard'
          value={expiry}
          onChange={event => setexpiry(event.target.value)}
          onBlur={event => {
            const regex = /^([A-Z][a-z]{2}),\s(\d{2})\s([A-Z][a-z]{2})\s(\d{4})\s(\d{2}):(\d{2}):(\d{2})\sGMT$/
            if (!regex.test(event.target.value)) {
              setexpiry('')
              alert('Invalid date format. Please enter the date in the format: "Thu, 01 Dec 2022 07:35:55 GMT"')
            }
          }}
        />
      </Grid>

      <Grid item xs={12} md={8}>
        <TextField
          required
          id='Percentage discount'
          type='number'
          label='Percentage discount'
          variant='standard'
          value={discount}
          onChange={event => setdiscount(event.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox color='secondary' name='saveAddress' value='yes' />}
          label='Make sure all inputs are correct'
        />
        <Button
          variant='contained'
          onClick={handleAddCouponDetails}
          sx={{ alignItems: 'center', ml: 25 }}
          sm={{ mt: 3, ml: 1 }}
          disabled={btnActive ? false : true}
        >
          {btnActive ? 'Add Coupon' : 'please wait...'}
        </Button>
      </Grid>
    </>
  )
}
