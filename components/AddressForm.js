import * as React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import InputAdornment from '@mui/material/InputAdornment'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import Button from '@mui/material/Button'
import toast, { Toaster } from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'

import { useState } from 'react'
import axios from 'axios'
import useStore from 'utils/Store'
import useStore2 from 'utils/Store2'

import { addProduct } from 'src/features/product/productService'
import { useEffect } from 'react'
import Image from 'next/image'

import Cookies from 'js-cookie'

const token = Cookies.get('token')

export default function AddressForm({ handleNext, disableNext }) {
  const notify = () => toast.error('fill all fields to proceed!')

  const { userDetails } = useStore()
  const { setProductId } = useStore2()

  const [btnActive, setBtnActive] = useState(true)

  const [title, settitle] = useState('')
  const [description, setdescription] = useState('')
  const [richDescription, setrichDescription] = useState('')
  const [price, setprice] = useState('')
  const [countInStock, setcountInStock] = useState(10)
  const [isFeatured, setisFeatured] = useState(false)
  const [isSpecial, setisSpecial] = useState(false)
  const [quantity, setquantity] = useState(1)
  const [imageUrl1, setImageUrl1] = useState('')
  const [imageUrl2, setImageUrl2] = useState('')
  const [imageUrl3, setImageUrl3] = useState('')
  const [imageUrl4, setImageUrl4] = useState('')

  const [imageId, setImageId] = useState('')

  const product = {
    title,
    description,
    richDescription,
    price,
    countInStock,
    isFeatured,
    isSpecial,
    quantity,
    images: [
      { public_id: imageId, url: imageUrl1 },
      { public_id: imageId, url: imageUrl2 },
      { public_id: imageId, url: imageUrl3 },
      { public_id: imageId, url: imageUrl4 }
    ]
  }

  const handleAddProduct = async () => {
    setBtnActive(false)
    if (
      description.length < 1 ||
      richDescription.length < 1 ||
      title.length < 1 ||
      price.length < 1 ||
      isFeatured.length < 1 ||
      quantity.length < 1 ||
      imageUrl1.length < 1
    ) {
      return notify(), setBtnActive(true)
    }
    addProduct(product, token, setProductId, handleNext, setBtnActive)
  }

  const handletitleChange = event => {
    settitle(event.target.value)
  }

  const handledescriptionChange = event => {
    setdescription(event.target.value)
  }

  const handlerichDescriptionChange = event => {
    setrichDescription(event.target.value)
  }

  const handlepriceChange = event => {
    setprice(event.target.value)
  }

  const handleisFeaturedChange = event => {
    setisFeatured(event.target.value)
  }

  const handlequantityChange = event => {
    setquantity(event.target.value)
  }

  const handleImageUrlChange1 = event => {
    setImageUrl1(event.target.value)
  }

  const handleImageUrlChange2 = event => {
    setImageUrl2(event.target.value)
  }

  const handleImageUrlChange3 = event => {
    setImageUrl3(event.target.value)
  }

  const handleImageUrlChange4 = event => {
    setImageUrl4(event.target.value)
  }

  const handleIsSpecial = event => {
    setisSpecial(event.target.value)
  }

  // upload section
  const [selectedFiles, setSelectedFiles] = useState([])
  const [thumbnails, setThumbnails] = useState([])

  const handleFileChange = files => {
    const newSelectedFiles = Array.from(files)

    // Create thumbnails for the selected files
    const newThumbnails = []
    for (const file of newSelectedFiles) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const img = new Image()
        img.src = reader.result
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          canvas.width = 150
          canvas.height = (canvas.width / img.width) * img.height
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          newThumbnails.push(canvas.toDataURL('image/jpeg'))
          setThumbnails([...newThumbnails])
        }
      }
    }

    setSelectedFiles([...selectedFiles, ...newSelectedFiles])
  }

  const handleUpload = () => {
    axios.post('/api/upload').then(response => {
      console.log(response.data)
    })
  }

  const handleRemoveFile = index => {
    const newSelectedFiles = [...selectedFiles]
    newSelectedFiles.splice(index, 1)
    setSelectedFiles(newSelectedFiles)

    const newThumbnails = [...thumbnails]
    newThumbnails.splice(index, 1)
    setThumbnails(newThumbnails)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      handleFileChange(acceptedFiles)
    }
  })

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Product details
      </Typography>
      <Toaster />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='name'
            name='name'
            label='product name'
            fullWidth
            autoComplete='given-name'
            variant='standard'
            value={title}
            onChange={handletitleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='price'
            name='price'
            label='price'
            type='number'
            fullWidth
            autoComplete='family-name'
            variant='standard'
            value={price}
            onChange={handlepriceChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            multiline
            minRows={3}
            label='description'
            placeholder='small description...'
            sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <MessageOutline />
                </InputAdornment>
              )
            }}
            value={description}
            onChange={handledescriptionChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            multiline
            minRows={5}
            label='description'
            placeholder='rich description...'
            sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <MessageOutline />
                </InputAdornment>
              )
            }}
            value={richDescription}
            onChange={handlerichDescriptionChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='quantity'
            name='quantity'
            label='quantity'
            type='number'
            fullWidth
            variant='standard'
            value={quantity}
            onChange={handlequantityChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='featured'
            name='featured'
            label='featured'
            fullWidth
            variant='standard'
            value={isFeatured}
            onChange={handleisFeaturedChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='isSpecial'
            name='isSpecial'
            label='isSpecial'
            fullWidth
            variant='standard'
            value={isSpecial}
            onChange={handleIsSpecial}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='image url'
            name='image url1'
            label='image url1'
            fullWidth
            variant='standard'
            value={imageUrl1}
            onChange={handleImageUrlChange1}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='image url'
            name='image url2'
            label='image url2'
            fullWidth
            variant='standard'
            value={imageUrl2}
            onChange={handleImageUrlChange2}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='image url'
            name='image url3'
            label='image url3'
            fullWidth
            variant='standard'
            value={imageUrl3}
            onChange={handleImageUrlChange3}
          />
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='image url'
              name='image url4'
              label='image url4'
              fullWidth
              variant='standard'
              value={imageUrl4}
              onChange={handleImageUrlChange4}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div>
            <h2>Upload Images</h2>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <div className='w-[100%] h-[100%] bg-orange-700'>Drop the files here ...</div>
              ) : (
                <p>Drag and drop some files here, or click to select files</p>
              )}
            </div>
            {selectedFiles.length > 0 && (
              <div>
                {selectedFiles.map((file, index) => (
                  <div key={file.name} className='flex items-start space-x-2'>
                    <div>
                      <Image src={thumbnails[index]} height={100} width={100} alt='thumnail' />
                      <p>{file.name}</p>
                    </div>

                    <button onClick={() => handleRemoveFile(index)}>Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color='secondary' name='saveAddress' value='yes' />}
            label='Make sure all inputs are correct'
          />
          <Button
            variant='contained'
            onClick={handleAddProduct}
            sx={{ alignItems: 'center', ml: 25 }}
            sm={{ mt: 3, ml: 1 }}
            disabled={btnActive ? false : true}
          >
            {btnActive ? 'Add product' : 'please wait...'}
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
