// ** React Imports
import { useState, Fragment, useRef } from 'react'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'
import config from 'utils/axiosconfig'
import { base_url } from 'utils/baseUrl'
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import Modal from '@mui/material/Modal'
import LinearProgress from '@mui/material/LinearProgress'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import InputAdornment from '@mui/material/InputAdornment'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import ClipboardJS from 'clipboard'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { useEffect } from 'react'
import Chip from '@mui/material/Chip'
import { Button } from '@mui/material'
import TablePagination from '@mui/material/TablePagination'

import { updateProduct, deleteProduct } from 'src/features/product/productService'
import Cookies from 'js-cookie'

const notify2 = message => toast.error(message)
const notify = message => toast.success(message)

const token = Cookies.get('token')

const TableCollapsible = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }

  // ClipboardJS
  const [isCopied, setIsCopied] = useState(false)
  const clipboardRef = useRef(null)

  const [singleProduct, setSingleProduct] = useState({})
  const [link, setLink] = useState('')
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [products, setproducts] = useState([])
  const [productId, setproductId] = useState('')

  const [title, settitle] = useState('')
  const [description, setdescription] = useState('')
  const [richDescription, setrichDescription] = useState('')
  const [price, setprice] = useState('')
  const [isFeatured, setisFeatured] = useState(false)
  const [isSpecial, setSpecial] = useState(false)
  const [quantity, setquantity] = useState(1)
  const [imageUrl1, setImageUrl1] = useState('')
  const [imageUrl2, setImageUrl2] = useState('')
  const [imageUrl3, setImageUrl3] = useState('')
  const [imageUrl4, setImageUrl4] = useState('')
  const [imageId, setImageId] = useState('')
  const [btnActive, setBtnActive] = useState(true)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const product = {
    title,
    description,
    richDescription,
    price,
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

  const handleisSpecialChange = event => {
    setSpecial(event.target.value)
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

  const handleImageIdChange = event => {
    setImageId(event.target.value)
  }

  const getProducts = async () => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers
      })
      const response = await api.get('products?limit=10000', config(token))
      setproducts(response.data.data)
      if (response.data.err == 'Not Authorized token expired, Please Login again') {
        notify2(response.data.err)
      }

      return response.data
    } catch (err) {
      console.log(err)
    }
  }

  const getSingleProduct = async id => {
    try {
      const api = axios.create({
        baseURL: base_url
      })

      const myPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await api.get(`products/${id}/`)

          if (response.status === 200) {
            resolve()
          }
          setSingleProduct(response.data.findProduct)
          settitle(response.data.findProduct.title)
          setdescription(response.data.findProduct.description)
          setrichDescription(response.data.findProduct.richDescription)
          setprice(response.data.findProduct.price)
          setisFeatured(response.data.findProduct.isFeatured ? true : false)
          setSpecial(response.data.findProduct.isSpecial ? true : false)
          setquantity(response.data.findProduct.quantity)
          response.data.findProduct.images.map((image, index) => {
            switch (index) {
              case 0:
                setImageUrl1(image.url)
                break
              case 1:
                setImageUrl2(image.url)
                break
              case 2:
                setImageUrl3(image.url)
                break
              case 3:
                setImageUrl4(image.url)
                break
              default:
                break
            }
            setImageId(image.public_id)
          })

          setLink(response.data.findProduct._id)
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

  useEffect(() => {
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

  const handleUpdateProduct = id => {
    setBtnActive(false)
    if (
      title.length < 1 ||
      description.length < 1 ||
      richDescription.length < 1 ||
      price.length < 1 ||
      imageUrl1.length < 1 ||
      imageUrl2.length < 1 ||
      imageUrl3.length < 1 ||
      imageUrl4.length < 1
    ) {
      return notify2('fill all fields to continue!'), setBtnActive(true)
    } else {
      updateProduct(product, id, token, setBtnActive, getProducts, handleClose)
    }
  }

  const handleDelete = id => {
    setBtnActive(false)

    deleteProduct(id, token, setBtnActive, getProducts, handleClose)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const statusObj = {
    'Not Processed': { color: 'info' },
    'Cash on Delivery': { color: 'primary' },
    Processing: { color: 'info' },
    Dispatched: { color: 'secondary' },
    Cancelled: { color: 'error' },
    Delivered: { color: 'success' }
  }

  const Row = ({ row }) => {
    // ** State
    const [open, setOpen] = useState(false)

    return (
      <Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
              {open ? <ChevronUp /> : <ChevronDown />}
            </IconButton>
          </TableCell>
          <TableCell component='th' scope='row'>
            {row.title}
          </TableCell>
          <TableCell align='right'>{row.price}</TableCell>
          <TableCell align='right'>{row.countInStock}</TableCell>
          <TableCell align='right'>{row.isFeatured ? 'true' : 'false'}</TableCell>
          <TableCell align='right'>{row.isSpecial ? 'true' : 'false'}</TableCell>
          <TableCell align='right'>{row.sold}</TableCell>
          <TableCell align='right'>{row.totalrating}</TableCell>
          <TableCell align='right'>
            <Chip
              label='Edit'
              color='primary'
              sx={{
                height: 24,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 }
              }}
              onClick={() => {
                setproductId(row._id)
                handleOpen()
                getSingleProduct(row._id)
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={6} sx={{ py: '0 !important' }}>
            {/* //collapsible tables  */}

            {/* product categories */}
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box sx={{ m: 2 }}>
                <Typography variant='h6' gutterBottom component='div'>
                  product categories
                </Typography>
                <Table size='small' aria-label='purchases'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>category</TableCell>
                      <TableCell align='right'>sub-category</TableCell>
                      <TableCell align='right'>iconurl</TableCell>
                      <TableCell align='right'>count</TableCell>
                      <TableCell align='right'>updatedAt</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.category.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell component='th' scope='row'>
                          {item._id}
                        </TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell align='right'>{item.title2}</TableCell>
                        <TableCell align='right'>{item.icon}</TableCell>
                        <TableCell align='right'>{item.quantity}</TableCell>
                        <TableCell align='right'>
                          {new Date(`${item.updatedAt}`).toLocaleString('en-GB', { hour12: false })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>

            {/* product brands */}
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box sx={{ m: 2 }}>
                <Typography variant='h6' gutterBottom component='div'>
                  product brands
                </Typography>
                <Table size='small' aria-label='purchases'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>name</TableCell>
                      <TableCell align='right'>model</TableCell>
                      <TableCell align='right'>count</TableCell>
                      <TableCell align='right'>updatedAt</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.brand.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell component='th' scope='row'>
                          {item._id}
                        </TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell align='right'>{item.model}</TableCell>
                        <TableCell align='right'>{item.quantity}</TableCell>
                        <TableCell align='right'>
                          {new Date(`${item.updatedAt}`).toLocaleString('en-GB', { hour12: false })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>

            {/* product colors */}
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box sx={{ m: 2 }}>
                <Typography variant='h6' gutterBottom component='div'>
                  product colors
                </Typography>
                <Table size='small' aria-label='purchases'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>name</TableCell>
                      <TableCell>code</TableCell>
                      <TableCell align='right'>url</TableCell>
                      <TableCell align='right'>count</TableCell>
                      <TableCell align='right'>updatedAt</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.colors.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell component='th' scope='row'>
                          {item._id}
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell align='right'>{item.code}</TableCell>
                        <TableCell align='right'>{item.image}</TableCell>
                        <TableCell align='right'>{item.availability}</TableCell>
                        <TableCell align='right'>
                          {new Date(`${item.updatedAt}`).toLocaleString('en-GB', { hour12: false })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>

            {/* product images */}
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box sx={{ m: 2 }}>
                <Typography variant='h6' gutterBottom component='div'>
                  product images
                </Typography>
                <Table size='small' aria-label='purchases'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>url</TableCell>
                      <TableCell align='right'>public id</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.images.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell component='th' scope='row'>
                          {item._id}
                        </TableCell>
                        <TableCell>{item.url}</TableCell>
                        <TableCell align='right'>{item.public_id}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>

            {/* product ratings */}
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box sx={{ m: 2 }}>
                <Typography variant='h6' gutterBottom component='div'>
                  product ratings
                </Typography>
                <Table size='small' aria-label='purchases'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell align='right'>stars</TableCell>
                      <TableCell>comment</TableCell>
                      <TableCell align='right'>postedby id</TableCell>
                      <TableCell align='right'>postedby email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.ratings.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell component='th' scope='row'>
                          to be implemented soon
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>

            {/* end of collapsible tables  */}
          </TableCell>
        </TableRow>
      </Fragment>
    )
  }

  return (
    <>
      <TableContainer component={Paper}>
        <div className='font-bold text-[25px] p-5 flex justify-between items-center'>
          <h2> Product details</h2>{' '}
          <Chip
            label={`count: ${products.length}`}
            color='primary'
            sx={{
              height: 24,
              fontSize: '0.75rem',
              textTransform: 'capitalize',
              '& .MuiChip-label': { fontWeight: 500 }
            }}
            onClick={() => {
              setproductId(row._id)
              handleOpen()
              getSingleProduct(row._id)
            }}
          />
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <>
            <Box sx={style} className='text-center text-[14px]'>
              <Toaster />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5 absolute top-3 right-1 text-red-500'
                onClick={handleClose}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>

              <Typography id='modal-modal-title' variant='h4' component='h4'>
                Update Product details
              </Typography>
              <div className='flex items-center space-x-3 pt-[10px]'>
                <h2>ID:</h2>
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
                      className='w-6 h-6 text-purple-500'
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

              <Box className='mt-[40px]'>
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
                      minRows={2}
                      maxRows={4}
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
                      minRows={2}
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
                      style={{ fontSize: '10px' }}
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
                      id='special'
                      name='special'
                      label='special'
                      fullWidth
                      variant='standard'
                      value={isSpecial}
                      onChange={handleisSpecialChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id='image id'
                      name='image id'
                      label='image id'
                      fullWidth
                      variant='standard'
                      value={imageId}
                      onChange={handleImageIdChange}
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

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox color='secondary' name='saveAddress' value='yes' />}
                      label='Make sure all inputs are correct'
                    />
                    <Grid className='flex justify-evenly'>
                      <Button
                        variant='outlined'
                        disabled={btnActive ? false : true}
                        onClick={() => handleDelete(productId)}
                      >
                        {btnActive ? 'Delete' : 'please wait...'}
                      </Button>

                      <Button
                        variant='contained'
                        onClick={() => handleUpdateProduct(productId)}
                        disabled={btnActive ? false : true}
                      >
                        {btnActive ? 'Update' : 'please wait...'}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </>
        </Modal>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>name</TableCell>
              <TableCell align='right'>price(ksh)</TableCell>
              <TableCell align='right'>count</TableCell>
              <TableCell align='right'>IsFeatured</TableCell>
              <TableCell align='right'>isSpecial</TableCell>
              <TableCell align='right'>sold</TableCell>
              <TableCell align='right'>Total rating</TableCell>
              <TableCell align='right'>edit</TableCell>
            </TableRow>
          </TableHead>

          {products.length > 0 ? (
            <TableBody>
              {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <Fragment key={index}>
                  <Row row={row} />
                </Fragment>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell className='w-[97vw] absolute'>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {products.length > 0 ? (
        <TablePagination
          rowsPerPageOptions={[10, 15, 25, 50, 75, 100]}
          component='div'
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : null}
    </>
  )
}

export default TableCollapsible
