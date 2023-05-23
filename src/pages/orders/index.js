// ** React Imports
import { useState, Fragment } from 'react'
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
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TablePagination from '@mui/material/TablePagination'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { useEffect } from 'react'
import Chip from '@mui/material/Chip'
import { Button } from '@mui/material'
import Image from 'next/image'
import Cookies from 'js-cookie'

const notify2 = message => toast.error(message)
const notify = message => toast.success(message)

const token = Cookies.get('token')

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

const TableCollapsible = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [orders, setOrders] = useState([])
  const [orderId, setOrderId] = useState('')
  const [status, setStatus] = useState('Processing')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [orderActive, setOrderActive] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleChangeStatus = event => {
    setStatus(event.target.value)
  }

  const getOrders = async () => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers
      })
      console.log(token)
      const response = await api.get('user/orders/all/', config(token))
      setOrders(response.data)
      response.status == 200 && response.data.length < 1 ? setOrderActive(true) : null
      if (response.data.err == 'Not Authorized token expired, Please Login again') {
        notify2(response.data.err)
        setOrderActive(true)
      }

      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  const handleStatusUpdate = async id => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers
      })

      // console.log(id)

      const response = await api.put(`user/orders/${id}/status/`, { status: status }, config(token))
      console.log(response)
      if (response.status == 200) {
        notify('Order status updated')
        getOrders()
        setTimeout(() => {
          handleClose()
        }, 2000)
      }

      // console.log(response)

      return response.data
    } catch (err) {
      if (err.err == 'Not Authorized token expired, Please Login again') {
        notify2(err.err)
      }
      console.log(err)
    }
  }

  // console.log(orders, status, orderId)

  useEffect(() => {
    getOrders()
  }, [status])

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
            {row.orderBy.email}
          </TableCell>
          <TableCell align='right'>{row.orderBy._id}</TableCell>
          <TableCell align='right'>{row.products.reduce((sum, item) => sum + item.count, 0)}</TableCell>
          <TableCell align='right'>{row.paymentIntent.amount}</TableCell>
          <TableCell align='right'>{row.paymentIntent.method}</TableCell>
          <TableCell align='right'>
            <Chip
              label={row.orderStatus}
              color={statusObj[row.orderStatus].color}
              sx={{
                height: 24,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 }
              }}
              onClick={() => {
                setOrderId(row._id)
                handleOpen()
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={6} sx={{ py: '0 !important' }}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box sx={{ m: 2 }}>
                <Typography variant='h6' gutterBottom component='div'>
                  Order details
                </Typography>
                <Table size='small' aria-label='purchases'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Products</TableCell>
                      <TableCell align='right'>count</TableCell>
                      <TableCell align='right'>Amount</TableCell>
                      <TableCell align='right'>Total price (ksh)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.products?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell component='th' scope='row'>
                          {row.updatedAt}
                        </TableCell>
                        <TableCell>{item.product?.title}</TableCell>
                        <TableCell align='right'>{item.count}</TableCell>
                        <TableCell align='right'>{item.product?.price}</TableCell>
                        <TableCell align='right'>{Math.round(item.count * item.product?.price * 100) / 100}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    )
  }

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
          <Box sx={style} className='text-center'>
            <Typography id='modal-modal-title' variant='h4' component='h4'>
              Update Order status
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              Id: {orderId}
            </Typography>
            <Box className='flex items-center justify-evenly mt-[30px]'>
              <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
                <InputLabel id='demo-select-small'>Order status</InputLabel>
                <Select
                  labelId='demo-select-small'
                  id='demo-select-small'
                  value={status}
                  label='order status'
                  onChange={handleChangeStatus}
                >
                  <MenuItem value='Processing'>
                    <em>Processing</em>
                  </MenuItem>
                  <MenuItem value='Not Processed'>Not Processed</MenuItem>
                  <MenuItem value='Cancelled'>Cancelled</MenuItem>
                  <MenuItem value='Dispatched'>Dispatched</MenuItem>
                  <MenuItem value='Delivered'>Delivered</MenuItem>
                </Select>
              </FormControl>
              <Button onClick={() => handleStatusUpdate(orderId)}>Update</Button>
            </Box>
          </Box>
        </Modal>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Email</TableCell>
              <TableCell align='right'>Id</TableCell>
              <TableCell align='right'>total items</TableCell>
              <TableCell align='right'>Total price</TableCell>
              <TableCell align='right'>PAID</TableCell>
              <TableCell align='right'>status</TableCell>
            </TableRow>
          </TableHead>

          {orderActive ? (
            <div
              className='
            absolute transform lg:translate-x-[100%] md:translate-x-[50%] xxs:translate-x-[0%]   transform-y-[-50%]
            '
            >
              <div className='flex items-center relative'>
                <Image
                  src={'/images/pages/404.png'}
                  width={400}
                  height={350}
                  alt='404'
                  className='object-contain w-[200px] h-[600px] bg-red-0'
                />
                <h3 className='absolute right-10 text-[14px] text-black'>no data found!</h3>
              </div>
            </div>
          ) : orders.length > 0 ? (
            <TableBody>
              {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
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
      {orders.length > 0 ? (
        <TablePagination
          rowsPerPageOptions={[10, 15, 25, 50, 75, 100]}
          component='div'
          count={orders.length}
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
