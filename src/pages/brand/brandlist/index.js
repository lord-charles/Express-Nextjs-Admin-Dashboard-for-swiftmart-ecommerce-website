// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination'
import { toast, Toaster } from 'react-hot-toast'
import config from 'utils/axiosconfig'
import { base_url } from 'utils/baseUrl'
import Chip from '@mui/material/Chip'
import axios from 'axios'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { LinearProgress } from '@mui/material'
import { deleteProductBrand, updateProductBrand } from 'src/features/brand/brandService'
import Cookies from 'js-cookie'

const notify2 = message => toast.error(message)
const notify = message => toast.success(message)

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },

  // hide last border
  '&:last-of-type td, &:last-of-type th': {
    border: 0
  }
}))

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

const token = Cookies.get('token')

const TableCustomized = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [brands, setBrands] = useState([])
  const [brand, setBrand] = useState({})
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [brandId, setBrandId] = useState('')
  const [brandName, setBrandName] = useState('')
  const [model, setModel] = useState('')
  const [quantity, setquantity] = useState('')
  const [btnActive, setBtnActive] = useState(true)

  const brandData = {
    title: brandName,
    model,
    quantity
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handlequantityChange = event => {
    setquantity(event.target.value)
  }

  const handleBrandChange = event => {
    setBrandName(event.target.value)
  }

  const handleModelChange = event => {
    setModel(event.target.value)
  }

  const getBrand = async id => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers
      })

      const myPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await api.get(`brand/${id}`, config(token))
          console.log(response)

          if (response.data.message == 'success') {
            resolve()
            setBrandName(response.data.brand.title)
            setModel(response.data.brand.model)
            setquantity(response.data.brand.quantity)
          }
          if (response.data.err == 'Not Authorized token expired, Please Login again') {
            notify2(response.data.err)
          }
        } catch (error) {
          if (error) reject()
        }
      })
      toast.promise(myPromise, {
        pending: 'Fetching and populating brand data...',
        success: 'populating complete 🎉 ',
        error: 'something went wrong'
      })
    } catch (err) {
      console.log(err)
    }
  }

  const getBrands = async () => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers
      })
      const response = await api.get(`brand/`, config(token))
      if (response.status == 200) {
        setBrands(response.data.brands)
      }
      if (response.data.err == 'Not Authorized token expired, Please Login again') {
        notify2(response.data.err)
      }
      console.log(response)

      return response.data
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateBrand = id => {
    setBtnActive(false)
    if (brandName.length < 1 || model.length < 1) {
      return notify2('fill all fields to continue!'), setBtnActive(true)
    } else {
      updateProductBrand(brandData, id, token, setBtnActive, getBrands, handleClose)
    }
  }

  const handleDelete = id => {
    setBtnActive(false)
    deleteProductBrand(id, token, setBtnActive, getBrands, handleClose)
  }

  useEffect(() => {
    getBrands()
  }, [])
  console.log(brands)

  return (
    <div>
      <TableContainer component={Paper}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <div>
            <Box sx={style} className='text-center'>
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
                Update Brand details
              </Typography>

              <Typography id='modal-modal-title' variant='h6' component='h6'>
                ID: {brandId}
              </Typography>
              <Box className='mt-[40px]'>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} className='p-3'>
                    <TextField
                      required
                      id='brand'
                      name='brand'
                      label='brand'
                      fullWidth
                      autoComplete='given-name'
                      variant='standard'
                      value={brandName}
                      onChange={handleBrandChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className='p-3'>
                    <TextField
                      required
                      id='model'
                      name='model'
                      label='model'
                      fullWidth
                      autoComplete='family-name'
                      variant='standard'
                      value={model}
                      onChange={handleModelChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} className='p-3'>
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

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox color='secondary' name='saveAddress' value='yes' />}
                      label='Make sure all inputs are correct'
                    />
                    <Grid className='flex justify-evenly'>
                      <Button
                        variant='outlined'
                        disabled={btnActive ? false : true}
                        onClick={() => handleDelete(brandId)}
                      >
                        {btnActive ? 'Delete' : 'please wait...'}
                      </Button>

                      <Button
                        variant='contained'
                        onClick={() => handleUpdateBrand(brandId)}
                        disabled={btnActive ? false : true}
                      >
                        {btnActive ? 'Update' : 'please wait...'}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </div>
        </Modal>
        <Toaster />

        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align='right'>Id</StyledTableCell>
              <StyledTableCell align='right'>Model</StyledTableCell>
              <StyledTableCell align='right'>Quantity</StyledTableCell>
              <StyledTableCell align='right'>CreatedAt</StyledTableCell>
              <StyledTableCell align='right'>UpdatedAt</StyledTableCell>
              <StyledTableCell align='right'>Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          {brands.length > 0 ? (
            <TableBody>
              {brands.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(brand => (
                <StyledTableRow key={brand._id}>
                  <StyledTableCell component='th' scope='row'>
                    {brand.title}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{brand._id}</StyledTableCell>
                  <StyledTableCell align='right'>{brand.model}</StyledTableCell>
                  <StyledTableCell align='right'>{brand.quantity}</StyledTableCell>
                  <StyledTableCell align='right'>
                    {new Date(`${brand.createdAt}`).toLocaleString('en-GB', { hour12: false })}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {new Date(`${brand.updatedAt}`).toLocaleString('en-GB', { hour12: false })}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <Chip
                      label='Edit'
                      color='error'
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { fontWeight: 500 }
                      }}
                      onClick={() => {
                        setBrandId(brand._id)
                        handleOpen()
                        getBrand(brand._id)
                      }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
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
      {brands.length > 0 ? (
        <TablePagination
          rowsPerPageOptions={[10, 15, 25, 50, 75, 100]}
          component='div'
          count={brands.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : null}
    </div>
  )
}

export default TableCustomized
