import axios from 'axios'
import { toast } from 'react-hot-toast'
import config from 'utils/axiosconfig'
import { base_url } from 'utils/baseUrl'

const notify = message => toast.success(message)
const notify2 = message => toast.error(message)

export const getBrands = async () => {
  const response = await axios.get(`${base_url}brand/`)

  return response.data
}

export const createBrand = async (brand, token, setSuccessRateBrand, setBtnActive, handleNextPage) => {
  try {
    const api = axios.create({
      baseURL: base_url,
      headers: config(token).headers
    })
    console.log(token)
    const response = await api.post('brand/', brand, config(token))
    if (response.data.message == 'brand added to product') {
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
    console.log(response)

    return response.data
  } catch (err) {
    if (err.response?.data.message == 'brand model already exists, but am pushing brand provided to your product') {
      return (
        notify(err.response.data.message),
        setSuccessRateBrand(true),
        setBtnActive ? setBtnActive(true) : null,
        handleNextPage ? handleNextPage() : null
      )
    }
    if (err.response?.data.message == 'Product not found') {
      notify2(err.response.data.message), setSuccessRateBrand(false), setBtnActive ? setBtnActive(true) : null
    }

    console.log(err)
  }
}

export const updateProductBrand = async (brandData, id, token, setBtnActive, getBrands, handleClose) => {
  try {
    const api = axios.create({
      baseURL: base_url,
      headers: config(token).headers
    })
    const response = await api.put(`brand/${id}`, brandData, config(token))
    if (response.data.err == 'Not Authorized token expired, Please Login again') {
      return notify2('Token expired, please login again as Admin to continue!'), setBtnActive(true)
    }
    if (response.data.message == 'product updated') {
      return (
        notify('brand updated successfully!'),
        getBrands(),
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

export const getBrand = async id => {
  const response = await axios.get(`${base_url}brand/${id}`, config)

  return response.data
}

export const deleteProductBrand = async (id, token, setBtnActive, getBrands, handleClose) => {
  try {
    const api = axios.create({
      baseURL: base_url,
      headers: config(token).headers
    })
    console.log(token)
    const response = await api.delete(`brand/${id}`, config(token))
    if (response.data.err == 'Not Authorized token expired, Please Login again') {
      return notify2('Token expired, please login again as Admin to continue!'), setBtnActive(true)
    }
    if (response.data.message == 'Brand deleted successfully') {
      return (
        notify('brand deleted successfully!'),
        getBrands(),
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
        getBrands(),
        setBtnActive(true),
        setTimeout(() => {
          handleClose()
        }, 1900)
      )
    }
    console.log(err)
  }
}
