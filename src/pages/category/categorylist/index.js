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
import InputAdornment from '@mui/material/InputAdornment'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'

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

import React, { useState, useEffect } from 'react'
import { LinearProgress } from '@mui/material'
import { deleteProductCategory, updateProductCategory } from 'src/features/pcategory/pcategoryService'
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

const token = Cookies.get('token')

const TableCustomized = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [sub, setSub] = useState('')

  const [categoryId, setCategoryId] = useState('')
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [quantity, setquantity] = useState(1)
  const [btnActive, setBtnActive] = useState(true)

  const categoryData = {
    title: category,
    title2: sub,
    quantity: quantity
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

  const handleSubChange = event => {
    setSub(event.target.value)
  }

  const handleCategoryChange = event => {
    setCategory(event.target.value)
  }

  const getCategory = async id => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers
      })

      const myPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await api.get(`categories/${id}`, config(token))
          console.log(response)

          if (response.data.message == 'success') {
            resolve()
            setSub(response.data.category.title2)
            setCategory(response.data.category.title)
            setquantity(response.data.category.quantity)
          }
          if (response.data.err == 'Not Authorized token expired, Please Login again') {
            notify2(response.data.err)
          }
        } catch (error) {
          if (error) reject()
        }
      })
      toast.promise(myPromise, {
        pending: 'Fetching and populating category data...',
        success: 'populating complete 🎉 ',
        error: 'something went wrong'
      })
    } catch (err) {
      console.log(err)
    }
  }

  const getCategories = async () => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers
      })
      const response = await api.get(`categories/`, config(token))
      if (response.status == 200) {
        setCategories(response.data.categories)
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

  const handleUpdateCategory = id => {
    setBtnActive(false)
    if (category.length < 1 || sub.length < 1) {
      return notify2('fill all fields to continue!'), setBtnActive(true)
    } else {
      updateProductCategory(categoryData, id, token, setBtnActive, getCategories, handleClose)
    }
  }

  const handleDelete = id => {
    setBtnActive(false)

    deleteProductCategory(id, token, setBtnActive, getCategories, handleClose)
  }

  useEffect(() => {
    getCategories()
  }, [])
  console.log(categories)

  return (
    <>
      <TableContainer component={Paper}>
        <Toaster />

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <>
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
                Update Category details
              </Typography>

              <Typography id='modal-modal-title' variant='h6' component='h6'>
                ID: {categoryId}
              </Typography>

              <Box className='mt-[40px]'>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} className='p-3'>
                    <TextField
                      required
                      id='name'
                      name='name'
                      label='category'
                      fullWidth
                      autoComplete='given-name'
                      variant='standard'
                      value={category}
                      onChange={handleCategoryChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className='p-3'>
                    <TextField
                      required
                      id='sub-category'
                      name='sub-category'
                      label='sub-category'
                      fullWidth
                      autoComplete='family-name'
                      variant='standard'
                      value={sub}
                      onChange={handleSubChange}
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
                        onClick={() => handleDelete(categoryId)}
                      >
                        {btnActive ? 'Delete' : 'please wait...'}
                      </Button>

                      <Button
                        variant='contained'
                        onClick={() => handleUpdateCategory(categoryId)}
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
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell align='right'>Category</StyledTableCell>
              <StyledTableCell align='right'>sub-Category</StyledTableCell>
              <StyledTableCell align='right'>Id</StyledTableCell>
              <StyledTableCell align='right'>Quantity</StyledTableCell>
              <StyledTableCell align='right'>CreatedAt</StyledTableCell>
              <StyledTableCell align='right'>UpdatedAt</StyledTableCell>
              <StyledTableCell align='right'>Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          {categories.length > 0 ? (
            <TableBody>
              {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(categories => (
                <StyledTableRow key={categories._id}>
                  <StyledTableCell component='th' scope='row'>
                    {categories.title}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{categories.title2}</StyledTableCell>
                  <StyledTableCell align='right'>{categories._id}</StyledTableCell>
                  <StyledTableCell align='right'>{categories.quantity}</StyledTableCell>
                  <StyledTableCell align='right'>
                    {new Date(`${categories.createdAt}`).toLocaleString('en-GB', { hour12: false })}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {new Date(`${categories.updatedAt}`).toLocaleString('en-GB', { hour12: false })}
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
                        setCategoryId(categories._id)
                        handleOpen()
                        getCategory(categories._id)
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
      {categories.length > 0 ? (
        <TablePagination
          rowsPerPageOptions={[10, 15, 25, 50, 75, 100]}
          component='div'
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : null}
    </>
  )
}

export default TableCustomized
