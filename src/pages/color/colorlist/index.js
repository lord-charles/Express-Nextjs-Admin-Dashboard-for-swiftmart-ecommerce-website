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
import Autocomplete from '@mui/material/Autocomplete'
import { deleteProductColor, updateProductColor } from 'src/features/color/colorService'
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
  const colorsList = [
    { name: 'red', hex: '#FF0000' },
    { name: 'green', hex: '#00FF00' },
    { name: 'blue', hex: '#0000FF' },
    { name: 'black', hex: '#000000' },
    { name: 'white', hex: '#FFFFFF' },
    { name: 'yellow', hex: '#FFFF00' },
    { name: 'purple', hex: '#800080' },
    { name: 'gray', hex: '#808080' },
    { name: 'cyan', hex: '#00FFFF' },
    { name: 'lime', hex: '#00FF00' },
    { name: 'gold', hex: '#FFD700' },
    { name: 'silver', hex: '#C0C0C0' },
    { name: 'indigo', hex: '#4B0082' },
    { name: 'violet', hex: '#EE82EE' },
    { name: 'beige', hex: '#F5F5DC' },
    { name: 'khaki', hex: '#F0E68C' },
    { name: 'orchid', hex: '#DA70D6' },
    { name: 'plum', hex: '#DDA0DD' },
    { name: 'pink', hex: '#FFC0CB' },
    { name: 'brown', hex: '#A52A2A' },
    { name: 'turquoise', hex: '#40E0D0' },
    { name: 'navy', hex: '#000080' },
    { name: 'lavender', hex: '#E6E6FA' },
    { name: 'maroon', hex: '#800000' },
    { name: 'teal', hex: '#008080' },
    { name: 'magenta', hex: '#FF00FF' },
    { name: 'olive', hex: '#808000' },
    { name: 'salmon', hex: '#FA8072' },
    { name: 'crimson', hex: '#DC143C' },
    { name: 'coral', hex: '#FF7F50' },
    { name: 'sienna', hex: '#A0522D' },
    { name: 'firebrick', hex: '#B22222' },
    { name: 'chocolate', hex: '#D2691E' },
    { name: 'peru', hex: '#CD853F' },
    { name: 'tan', hex: '#D2B48C' },
    { name: 'rosybrown', hex: '#BC8F8F' },
    { name: 'cadetblue', hex: '#5F9EA0' },
    { name: 'skyblue', hex: '#87CEEB' },
    { name: 'steelblue', hex: '#4682B4' },
    { name: 'midnightblue', hex: '#191970' },
    { name: 'navajowhite', hex: '#FFDEAD' },
    { name: 'saddlebrown', hex: '#8B4513' },
    { name: 'goldenrod', hex: '#DAA520' },
    { name: 'darkgoldenrod', hex: '#B8860B' },
    { name: 'magenta pink', hex: '#FF66FF' },
    { name: 'baby blue', hex: '#89CFF0' },
    { name: 'sage green', hex: '#BCB88A' },
    { name: 'deep sea blue', hex: '#0077BE' },
    { name: 'burnt orange', hex: '#CC5500' },
    { name: 'electric purple', hex: '#BF00FF' },
    { name: 'hunter green', hex: '#355E3B' },
    { name: 'dusty rose', hex: '#DCAE96' },
    { name: 'ocean blue', hex: '#4F42B5' },
    { name: 'brick red', hex: '#8B0000' },
    { name: 'pastel yellow', hex: '#FDFD96' },
    { name: 'navy blue', hex: '#000080' },
    { name: 'seafoam green', hex: '#8FE5B5' },
    { name: 'olive green', hex: '#808000' },
    { name: 'dusty blue', hex: '#6699CC' },
    { name: 'blush pink', hex: '#FFB6C1' },
    { name: 'dark teal', hex: '#008080' },
    { name: 'lilac', hex: '#C8A2C8' },
    { name: 'burgundy', hex: '#800020' }
  ]

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [colors, setColors] = useState([])
  const [category, setCategory] = useState({})

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [colorId, setcolorId] = useState('')
  const [colorName, setColorName] = useState('')
  const [code, setCode] = useState('')
  const [quantity, setquantity] = useState('')
  const [btnActive, setBtnActive] = useState(true)

  const colorData = {
    name: colorName,
    code,
    availability: quantity
  }

  const handlequantityChange = event => {
    setquantity(event.target.value)
  }

  const handleChangeColor = event => {
    setColorName(event.target.value)
  }

  const handleChangeCode = event => {
    setCode(event.target.value)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const getColors = async () => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers
      })
      const response = await api.get(`color/`, config(token))
      if (response.status == 200) {
        setColors(response.data.color)
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

  const getColor = async id => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers
      })

      const myPromise = new Promise(async (resolve, reject) => {
        try {
          const response = await api.get(`color/${id}`, config(token))
          console.log(response)

          if (response.data.message == 'success') {
            resolve()
            setColorName(response.data.color.name)
            setCode(response.data.color.code)
            setquantity(response.data.color.availability)
          }
          if (response.data.err == 'Not Authorized token expired, Please Login again') {
            notify2(response.data.err)
          }
        } catch (error) {
          if (error) reject()
        }
      })
      toast.promise(myPromise, {
        pending: 'Fetching and populating color data...',
        success: 'populating complete 🎉 ',
        error: 'something went wrong'
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateColor = id => {
    setBtnActive(false)
    if (colorName.length < 1 || code.length < 1) {
      return notify2('fill all fields to continue!'), setBtnActive(true)
    } else {
      updateProductColor(colorData, id, token, setBtnActive, getColors, handleClose)
    }
  }

  const handleDelete = id => {
    setBtnActive(false)
    deleteProductColor(id, token, setBtnActive, getColors, handleClose)
  }

  useEffect(() => {
    getColors()
  }, [])
  console.log(colors)
  const areOptionsEqual = (option, value) => option.name === value.name && option.hex === value.hex

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
                Update Color details
              </Typography>

              <Typography id='modal-modal-title' variant='h6' component='h6'>
                ID: {colorId}
              </Typography>
              <Box className='mt-[40px]'>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} className='p-3'>
                    <TextField
                      required
                      id='color'
                      name='color'
                      label='color'
                      fullWidth
                      autoComplete='given-name'
                      variant='standard'
                      value={colorName}
                      onChange={handleChangeColor}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Autocomplete
                      id='multiple-select'
                      sx={{ width: 300 }}
                      options={colorsList}
                      autoHighlight
                      getOptionLabel={option => option.name}
                      renderOption={(props, option) => (
                        <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                          {option.name}
                          {'-'}
                          {option.hex}{' '}
                          {<div className={`w-[15px] h-[15px] ml-5`} style={{ backgroundColor: `${option.hex}` }} />}
                        </Box>
                      )}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='Choose color'
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password' // disable autocomplete and autofill
                          }}
                        />
                      )}
                      onChange={(event, value) => {
                        setColorName(value.name), setCode(value.hex)
                      }}
                      isOptionEqualToValue={areOptionsEqual}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className='p-3'>
                    <TextField
                      required
                      id='code'
                      name='code'
                      label='code'
                      fullWidth
                      autoComplete='family-name'
                      variant='standard'
                      value={code}
                      onChange={handleChangeCode}
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
                        onClick={() => handleDelete(colorId)}
                      >
                        {btnActive ? 'Delete' : 'please wait...'}
                      </Button>

                      <Button
                        variant='contained'
                        onClick={() => handleUpdateColor(colorId)}
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
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell align='right'>Color</StyledTableCell>
              <StyledTableCell align='right'>Code</StyledTableCell>
              <StyledTableCell align='right'>Id</StyledTableCell>
              <StyledTableCell align='right'>Quantity</StyledTableCell>
              <StyledTableCell align='right'>UpdatedAt</StyledTableCell>
              <StyledTableCell align='right'>CreatedAt</StyledTableCell>
              <StyledTableCell align='right'>Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          {colors.length > 0 ? (
            <TableBody>
              {colors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(colors => (
                <StyledTableRow key={colors._id}>
                  <StyledTableCell component='th' scope='row'>
                    {colors.name}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{colors.code}</StyledTableCell>
                  <StyledTableCell align='right'>{colors._id}</StyledTableCell>
                  <StyledTableCell align='right'>{colors.availability}</StyledTableCell>
                  <StyledTableCell align='right'>
                    {new Date(`${colors.createdAt}`).toLocaleString('en-GB', { hour12: false })}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {new Date(`${colors.updatedAt}`).toLocaleString('en-GB', { hour12: false })}
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
                        setcolorId(colors._id)
                        handleOpen()
                        getColor(colors._id)
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
      {colors.length > 0 ? (
        <TablePagination
          rowsPerPageOptions={[10, 15, 25, 50, 75, 100]}
          component='div'
          count={colors.length}
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
