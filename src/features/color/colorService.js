import axios from 'axios'
import { base_url } from 'utils/baseUrl'
import config from 'utils/axiosconfig'
import { toast } from 'react-hot-toast'

const notify = message => toast.success(message)
const notify2 = message => toast.error(message)

export const getColors = async () => {
  const response = await axios.get(`${base_url}color/`)

  return response.data
}

export const createColor = async (color, token, setSuccessRateColor, setBtnActive, handleNextPage) => {
  try {
    const api = axios.create({
      baseURL: base_url,
      headers: config(token).headers
    })
    console.log(token)
    const response = await api.post('color/', color, config(token))
    if (response.data.message == 'Color added to product') {
      notify(response.data.message)
      setSuccessRateColor(true)
      setBtnActive ? setBtnActive(true) : null, handleNextPage ? handleNextPage() : null
    }
    if (response.data.err == 'Not Authorized token expired, Please Login again') {
      notify2(response.data.err)
      setSuccessRateColor(false), setBtnActive ? setBtnActive(true) : null
    }
    console.log(response)

    return response.data
  } catch (err) {
    if (err.response?.data.message == 'Color already exists, but am pushing provided color to your product') {
      return (
        notify(err.response.data.message),
        setSuccessRateColor(true),
        setBtnActive ? setBtnActive(true) : null,
        handleNextPage ? handleNextPage() : null
      )
    }
    if (err.response?.data.message == 'Product not found') {
      setSuccessRateColor(false)
      notify2(err.response.data.message), setBtnActive ? setBtnActive(true) : null
    }

    console.log(err)
  }
}

export const updateProductColor = async (colorData, id, token, setBtnActive, getColors, handleClose) => {
  try {
    const api = axios.create({
      baseURL: base_url,
      headers: config(token).headers
    })
    const response = await api.put(`color/${id}`, colorData, config(token))
    if (response.data.err == 'Not Authorized token expired, Please Login again') {
      return notify2('Token expired, please login again as Admin to continue!'), setBtnActive(true)
    }
    if (response.data.message == 'Success') {
      return (
        notify('color updated successfully!'),
        getColors(),
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

export const getColor = async id => {
  const response = await axios.get(`${base_url}color/${id}`, config)

  return response.data
}

export const deleteProductColor = async (id, token, setBtnActive, getColors, handleClose) => {
  try {
    const api = axios.create({
      baseURL: base_url,
      headers: config(token).headers
    })
    console.log(token)
    const response = await api.delete(`color/${id}`, config(token))
    if (response.data.err == 'Not Authorized token expired, Please Login again') {
      return notify2('Token expired, please login again as Admin to continue!'), setBtnActive(true)
    }
    if (response.data.message == 'color deleted successfully') {
      return (
        notify('color deleted successfully!'),
        getColors(),
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
