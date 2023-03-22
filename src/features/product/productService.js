import axios from 'axios'
import { base_url } from 'utils/baseUrl'
import useStore from 'utils/Store'
import config from 'utils/axiosconfig'
import toast, { Toaster } from 'react-hot-toast'
import { fabClasses } from '@mui/material'

const notify = () => toast.success('product added successfully')
const notify2 = message => toast.error(message)

// export const getProductList = async () => {
//   const { token } = addDetails

//   const api = axios.create({
//     baseURL: base_url,
//     headers: config(token).headers
//   })
//   try {
//     const response = await api.get('products/')

//     return response.data
//   } catch (error) {
//     console.error(error)
//     throw new Error('Failed to get product list')
//   }
// }

// export const getSingleProduct = async () => {
//   try {
//     const getProductIDFromLocalStorage = localStorage.getItem('productId')
//       ? JSON.parse(localStorage.getItem('productId'))
//       : null

//     const productId = getProductIDFromLocalStorage.state.productId

//     const api = axios.create({
//       baseURL: base_url
//     })
//     const response = await api.get(`products/${productId}/`)
//     console.log(response)
//   } catch (err) {
//     console.log(err)
//   }
// }

export const addProduct = async (product, token, setProductId, handleNext, setBtnActive) => {
  try {
    setBtnActive(false)

    const api = axios.create({
      baseURL: base_url,
      headers: config(token).headers
    })
    console.log(token)
    const response = await api.post('products/', product, config(token))
    console.log(response)
    console.log(response.data._id)
    setProductId(response.data._id)
    setBtnActive(true)
    if (response.data.err == 'Not Authorized token expired, Please Login again') {
      return notify2('please login again as Admin to continue!'), setBtnActive(true)
    }
    if (response.data.err || response.data.message) {
      return notify2('something went wrong!, try again or contact developer if problem persists'), setBtnActive(true)
    }
    if (response.status == 200) {
      notify()
      setTimeout(() => {
        handleNext()
      }, 2000)
    }

    const getProductIDFromLocalStorage = localStorage.getItem('productId')
      ? JSON.parse(localStorage.getItem('productId'))
      : null

    // console.log(getProductIDFromLocalStorage.state.productId)

    return response.data
  } catch (error) {
    console.error(error)
    if (error.code == 'ERR_NETWORK') {
      notify2('Network error!')
    }
    setBtnActive(true)
  }
}

export const updateProduct = async (product, id, token, setBtnActive, getProducts, handleClose) => {
  try {
    const api = axios.create({
      baseURL: base_url,
      headers: config(token).headers
    })

    console.log(id)

    const myPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await api.patch(`products/${id}/`, product, config(token))

        if (response.data.message == 'success') {
          return (
            resolve(),
            getProducts(),
            setBtnActive(true),
            setTimeout(() => {
              handleClose()
            }, 2000)
          )
        }
        if (response.data.err._message == 'Product validation failed') {
          return reject(), notify2('fill all fields'), setBtnActive(true)
        }
        if (response.data.err == 'Not Authorized token expired, Please Login again') {
          return notify2('please login again as Admin to continue!'), setBtnActive(true)
        }
        console.log(response)
      } catch (error) {
        reject()
        setBtnActive(true)
      }
    })

    toast.promise(myPromise, {
      pending: 'Updating product...',
      success: 'update complete 🎉 ',
      error: 'something went wrong'
    })
  } catch (error) {
    console.log(error)
    setBtnActive(true)
  }
}

export const deleteProduct = async (id, token, setBtnActive2, getProducts, handleClose) => {
  try {
    const api = axios.create({
      baseURL: base_url,
      headers: config(token).headers
    })

    // console.log(id)

    const myPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await api.delete(`products/${id}/`, config(token))
        if (response.data.message == "Cannot read property 'save' of null") {
          notify2('product already deleted!')
          resolve()
          setBtnActive2(true)
          setTimeout(() => {
            handleClose()
          }, 2000)
        }
        if (response.data.message == 'Product deleted successfully') {
          resolve()
          getProducts()
          setBtnActive2(true)
          setTimeout(() => {
            handleClose()
          }, 2000)
        }
        if (response.data.err == 'Not Authorized token expired, Please Login again') {
          return notify2('please login again as Admin to continue!'), setBtnActive2(true)
        }
        console.log(response)
      } catch (error) {
        reject()
        setBtnActive2(true)
      }
    })

    toast.promise(myPromise, {
      pending: 'deleting product...',
      success: 'product deleted successfully 🎉 ',
      error: 'something went wrong'
    })
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to delete product ${id}`)
  }
}
