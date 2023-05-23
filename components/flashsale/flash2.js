import * as React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useState, forwardRef } from 'react'
import { Button } from '@mui/material'
import { toast, Toaster } from 'react-hot-toast'
import useStore3 from 'utils/Store3'
import useStore2 from 'utils/Store2'
import Cookies from 'js-cookie'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { base_url } from 'utils/baseUrl'
import config from 'utils/axiosconfig'
import axios from 'axios'

const notify = message => toast.success(message)
const notify2 = message => toast.error(message)

export default function Flash2({ handleNext }) {
  const { setProductId } = useStore2()
  const [productId, setproductId] = useState('')
  const [date, setDate] = useState(null)
  const [date2, setDate2] = useState(null)
  const [discountPercentage, setdiscount] = useState(3)
  const [btnActive, setBtnActive] = useState(true)
  const [quantity, setQuantity] = useState(1)

  const inputDate1 = new Date(date)
  const outputDate1 = new Date(inputDate1.setHours(inputDate1.getHours() + 3)).toISOString()

  const inputDate2 = new Date(date2)
  const outputDate2 = new Date(inputDate2.setHours(inputDate2.getHours() + 3)).toISOString()

  const flashSaleData = {
    productId,
    discountPercentage,
    quantity,
    startTime: outputDate1,
    endTime: outputDate2
  }
  console.log(flashSaleData)

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

  const handleAddFlashSaleData = async () => {
    if (productId.length < 1 || date == null || date2 == null) {
      return notify2('Please fill all fields to continue')
    }

    setBtnActive(false)
    try {
      const token = Cookies.get('token')

      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers
      })
      const response = await api.post('flashSale/add-product', flashSaleData, config(token))
      console.log(response)
      if (response.data.success) {
        return (
          notify('Flash Sale added successfully'),
          setTimeout(() => {
            handleNext()
          }, 2500),
          setBtnActive(true),
          setProductId(response.data.flashSaleProduct._id)
        )
      }

      if (response.data.err == 'Not Authorized token expired, Please Login again') {
        notify2(response.data.err)
        setBtnActive(true)
      }

      // setProductId(response.data.coupon._id)

      console.log(response)

      return response.data
    } catch (err) {
      if (err.message == 'Network Error') {
        notify2(err.message)
      }
      if (
        err.response?.data?.message === 'Start time must be in the future' ||
        err.response?.data?.message === 'End time must be after start time' ||
        err.response?.data?.message === 'Product is already in flash sale' ||
        err.response?.data?.message === 'Product not found'
      ) {
        notify2(err.response.data.message)
        setBtnActive(true)
      }

      console.log(err)
    }
  }

  const CustomInput = forwardRef((props, ref) => {
    return <TextField inputRef={ref} label='Start Time' fullWidth {...props} />
  })

  const CustomInput2 = forwardRef((props, ref) => {
    return <TextField inputRef={ref} label='End Time' fullWidth {...props} />
  })

  return (
    <>
      <Typography variant='h4' gutterBottom>
        Product
      </Typography>
      <Toaster />

      <Grid item xs={12} md={8} className='pb-[20px]'>
        <TextField
          required
          id='id'
          label='id'
          helperText='unique'
          variant='standard'
          value={productId}
          onChange={event => setproductId(event.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6} className='pb-[20px]'>
        <DatePickerWrapper>
          <DatePicker
            selected={date}
            showYearDropdown
            showMonthDropdown
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            timeCaption='Time'
            dateFormat='MM-dd-yyyy h:mm aa'
            id='account-settings-date'
            placeholderText='MM-DD-YYYY hh:mm AM/PM'
            customInput={<CustomInput />}
            onChange={date => setDate(date)}
          />
        </DatePickerWrapper>
      </Grid>

      <Grid item xs={12} sm={6} className='pb-[10px]'>
        <DatePickerWrapper>
          <DatePicker
            selected={date2}
            showYearDropdown
            showMonthDropdown
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            timeCaption='Time'
            dateFormat='MM-dd-yyyy h:mm aa'
            id='account-settings-date'
            placeholderText='MM-DD-YYYY hh:mm AM/PM'
            customInput={<CustomInput2 />}
            onChange={date => setDate2(date)}
          />
        </DatePickerWrapper>
      </Grid>

      <Grid item xs={12} md={8} className='pb-[20px]'>
        <TextField
          required
          id='Percentage discount'
          type='number'
          label='Percentage discount'
          variant='standard'
          value={discountPercentage}
          onChange={event => setdiscount(event.target.value)}
        />
      </Grid>

      <Grid item xs={12} md={8} className='pb-[20px]'>
        <TextField
          required
          id='quantity'
          type='number'
          label='quantity'
          variant='standard'
          value={quantity}
          onChange={event => setQuantity(event.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox color='secondary' name='saveAddress' value='yes' />}
          label='Make sure all inputs are correct'
        />
        <Button
          variant='contained'
          onClick={handleAddFlashSaleData}
          sx={{ alignItems: 'center', ml: 25 }}
          sm={{ mt: 3, ml: 1 }}
          disabled={btnActive ? false : true}
        >
          {btnActive ? 'Add Flash ' : 'please wait...'}
        </Button>
      </Grid>
    </>
  )
}
