import axios from 'axios'
import { toast } from 'react-hot-toast'
import config from 'utils/axiosconfig'
import { base_url } from 'utils/baseUrl'

const notify = message => toast.success(message)
const notify2 = message => toast.error(message)

export const getCoupons = async () => {
  const response = await axios.get(`${base_url}coupon/`, config)

  return response.data
}

export const createCoupons = async (coupon, token, setBtnActive, handleNextPage, setSuccessRateBrand, setProductId) => {
  try {
    const api = axios.create({
      baseURL: base_url,
      headers: config(token).headers
    })
    console.log(token)
    const response = await api.post('coupon/', coupon, config(token))
    if (response.data.message == 'coupon added successfully') {
      notify(response.data.message)
      setSuccessRateBrand(true)
      setBtnActive ? setBtnActive(true) : null
      handleNextPage ? handleNextPage() : null
    }
    if (response.data.err == 'Not Authorized token expired, Please Login again') {
      notify2(response.data.err)
      setSuccessRateBrand(false)
      setBtnActive ? setBtnActive(true) : null
    }
    setProductId(response.data.coupon._id)
    console.log(response)

    return response.data
  } catch (err) {
    if (err.response?.data == 'Coupon with the same name already exists.') {
      notify2(err.response.data), setSuccessRateBrand(false), setBtnActive ? setBtnActive(true) : null
    }
    if (err.message == 'Network Error') {
      notify2(err.message), setSuccessRateBrand(false), setBtnActive ? setBtnActive(true) : null
    }
    console.log(err)
  }
}

export const getCoupon = async id => {
  const response = await axios.get(`${base_url}coupon/${id}`, config)

  return response.data
}

export const updateProductCoupon = async (couponData, id, token, setBtnActive, getCoupons, handleClose) => {
  try {
    const api = axios.create({
      baseURL: base_url,
      headers: config(token).headers
    })
    const response = await api.put(`coupon/${id}`, couponData, config(token))
    if (response.data.err == 'Not Authorized token expired, Please Login again') {
      return notify2('Token expired, please login again as Admin to continue!'), setBtnActive(true)
    }
    if (response.status === 200) {
      return (
        notify('coupon updated successfully!'),
        getCoupons(),
        setBtnActive(true),
        setTimeout(() => {
          handleClose()
        }, 1500)
      )
    }
    console.log(response)
  } catch (err) {
    console.log(err)
  }
}

export const deleteProductCoupon = async (id, token, setBtnActive, getCoupons, handleClose) => {
  try {
    const api = axios.create({
      baseURL: base_url,
      headers: config(token).headers
    })
    console.log(token)
    const response = await api.delete(`coupon/${id}`, config(token))
    if (response.data.err == 'Not Authorized token expired, Please Login again') {
      return notify2('Token expired, please login again as Admin to continue!'), setBtnActive(true)
    }
    if (response.status === 200) {
      return (
        notify('coupon deleted successfully!'),
        getCoupons(),
        setBtnActive(true),
        setTimeout(() => {
          handleClose()
        }, 1500)
      )
    }
    console.log(response)
  } catch (err) {
    if (err.response.data.message == 'Product not found') {
      return (
        notify2('no product with this brand found, but am deleting the brand!'),
        getColors(),
        setBtnActive(true),
        setTimeout(() => {
          handleClose()
        }, 1900)
      )
    }
    console.log(err)
  }
}
