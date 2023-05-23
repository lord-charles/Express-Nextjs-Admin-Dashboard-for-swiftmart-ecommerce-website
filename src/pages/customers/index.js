// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** React Imports

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'
import config from 'utils/axiosconfig'
import { base_url } from 'utils/baseUrl'
import Chip from '@mui/material/Chip'

// import { Button } from '@mui/material'

const notify2 = message => toast.error(message)
const notify = message => toast.success(message)

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

// ** MUI Imports

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import LinearProgress from '@mui/material/LinearProgress'
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff'
import BlockIcon from '@mui/icons-material/Block'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'
import BadgeIcon from '@mui/icons-material/Badge'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Cookies from 'js-cookie'

// import Button from '@mui/material/Button'

const token = Cookies.get('token')

const columns = [
  { id: 'firstname', label: 'Name', minWidth: 170 },
  { id: '_id', label: 'id', minWidth: 200 },
  {
    id: 'email',
    label: 'email',
    minWidth: 200,
    align: 'right',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'mobile',
    label: 'mobile',
    minWidth: 180,
    align: 'right',
    format: value => value.toLocaleString('en-US')
  }
]

const Customers = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [users, setUsers] = useState([])
  const [user, setUser] = useState([])
  const [userId, setUserId] = useState('')
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleClose1 = () => setShow1(false)
  const handleShow1 = () => setShow1(true)
  const [status, setStatus] = useState(true)
  const [name, setName] = useState('')
  const [blocked, setBlocked] = useState(false)
  const [emails, setEmails] = useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const getCustomers = async (sort = '-dateJoined') => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers
      })
      const response = await api.get(`user/users/get-all?sort=${sort}`, config(token))
      setUsers(response.data)
      if (response.data.err == 'Not Authorized token expired, Please Login again') {
        notify2(response.data.err)
      }

      return response.data
    } catch (err) {
      console.log(err)
    }
  }

  const getCustomer = async id => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers
      })
      const response = await api.get(`user/users/get/${id}/`, config(token))
      if (response.status == 200) {
        setUser(response.data)
        handleShow1()
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

  useEffect(() => {
    getCustomers()
  }, [])

  // console.log(users)

  const handleBlock = async (id, name) => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers
      })
      console.log(id)
      const response = await api.put(`user/users/${id}/block/`, config(token))
      if (response.status == 200) {
        notify(`${name}, has been blocked!`)
        getCustomers()
        setTimeout(() => handleClose(), 2000)
      }
      console.log(response)

      return response.data
    } catch (err) {
      if (err.err == 'Not Authorized token expired, Please Login again') {
        notify2(err.err)
      }
      console.log(err)
    }
  }

  const handleUnBlock = async (id, name) => {
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers
      })
      console.log(id)
      const response = await api.put(`user/users/${id}/unblock/`, config(token))
      if (response.status == 200) {
        notify(`${name}, has been unblocked successfully`)
        getCustomers()
        setTimeout(() => handleClose(), 2000)
      }
      console.log(response)

      return response.data
    } catch (err) {
      if (err.err == 'Not Authorized token expired, Please Login again') {
        notify2(err.err)
      }
      console.log(err)
    }
  }

  const statusObj = {
    true: { color: 'success' },
    false: { color: 'info' }
  }

  const statusObj2 = {
    true: { color: 'error' },
    false: { color: 'primary' }
  }

  const handleOnSearch = async string => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string)
    try {
      const api = axios.create({
        baseURL: base_url,
        headers: config(token).headers
      })
      const response = await api.get(`user/users/get-email?search=${string}`, config(token))
      setEmails(response.data)
      console.log(response)

      return response.data
    } catch (err) {
      if (err.err == 'Not Authorized token expired, Please Login again') {
        notify2(err.err)
      }
      console.log(err)
    }
  }

  return (
    <>
      <div className='relative'>
        <Modal
          show={show}
          onHide={handleClose}
          className='absolute transform translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] bg-gray-300 rounded-lg p-1'
        >
          <Modal.Header closeButton>
            <Modal.Title className='text-red-500 text-[25px] text-center'>Block/ unBlock account!</Modal.Title>
            <Modal.Title className='text-red-500 text-[13px] text-center'>
              {userId}: {name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='text-[15px] text-center mb-[10px] text-black'>
            Please make sure you follow regulations, are you sure you want to continue?
          </Modal.Body>
          <Modal.Footer className='flex justify-between'>
            <Button variant='secondary' onClick={handleClose} className='bg-red-400 p-1 mx-[10px] mb-[10px] ml-[20px]'>
              cancel
            </Button>
            {blocked ? (
              <Button
                variant='primary'
                className='bg-red-400 p-1 mx-[10px] mb-[10px]'
                onClick={() => handleUnBlock(userId, name)}
              >
                unBlock
              </Button>
            ) : (
              <Button
                variant='primary'
                className='bg-red-400 p-1 mx-[10px] mb-[10px]'
                onClick={() => handleBlock(userId, name)}
              >
                Block
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
      <div className='relative'>
        <Modal
          show={show1}
          onHide={handleClose1}
          className='absolute transform translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] bg-gray-300 rounded-lg p-3'
        >
          <Modal.Header closeButton>
            <Modal.Title className='text-green-500 text-[20px]'>{user?.email}</Modal.Title>
            <Modal.Title className='text-black text-[13px]'>id:{user?._id}</Modal.Title>
            <Modal.Title className='text-black text-[13px]'> firstname:{user?.firstname}</Modal.Title>
            <Modal.Title className='text-black text-[13px]'>Lastname: {user?.lastname}</Modal.Title>
            <Modal.Title className='text-black text-[13px]'>phone:{user?.mobile}</Modal.Title>
            <Modal.Title className='text-black text-[13px]'>dateJoined:{user.dateJoined}</Modal.Title>
            <Modal.Title className='text-black text-[13px]'>role: {user?.isAdmin ? 'Admin' : 'Customer'}</Modal.Title>
            <Modal.Title className='text-black text-[13px]'>
              status: {user?.isBlocked ? 'Deactivated' : 'Active'}
            </Modal.Title>
            <Modal.Title className='text-black text-[13px]'>cart:{user?.cart?.length}</Modal.Title>
            <Modal.Title className='text-black text-[13px]'>wishlist:{user?.wishlist?.length}</Modal.Title>
          </Modal.Header>

          <Modal.Footer className='flex justify-between'>
            <Button variant='secondary' onClick={handleClose1} className='bg-red-400 p-1 mx-[10px] mb-[10px] ml-[10px]'>
              cancel
            </Button>
            {user.isBlocked ? (
              <Button
                variant='primary'
                className='bg-red-400 p-1 mx-[10px] mb-[10px]'
                onClick={() => handleUnBlock(user._id, user.firstname)}
              >
                unBlock
              </Button>
            ) : (
              <Button
                variant='primary'
                className='bg-red-400 p-1 mx-[10px] mb-[10px]'
                onClick={() => handleBlock(user._id, user.firstname)}
              >
                Block
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
      <Grid container spacing={6}>
        <Toaster />
        <Grid item xs={12}>
          <Card>
            <div className='flex justify-between items-center p-2 relative'>
              <h2 className='text-[25px] font-bold'>Customers</h2>

              <div className='absolute right-4 top-2 z-[999] xxs:w-[200px] md:w-[400px] '>
                <ReactSearchAutocomplete
                  items={emails.map(item => ({ id: item._id, name: item.email }))}
                  onSearch={handleOnSearch}
                  onHover={item => console.log(item)}
                  onSelect={item => {
                    getCustomer(item.id)
                  }}
                  autoFocus
                />
              </div>
            </div>

            <h2 className='pl-[20px]'>SortBy</h2>

            <Card className='flex space-x-5 items-center justify-center'>
              <Button
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                onClick={() => {
                  notify('Sorting by date, please hold on..'), getCustomers('dateJoined')
                }}
              >
                <h3 className='text-[10px] text-blue-500'>date</h3>
                <HistoryToggleOffIcon className='text-purple-500' />
              </Button>
              <Button
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                onClick={() => {
                  notify('Sorting by mobile number, please hold on..'), getCustomers('mobile')
                }}
              >
                <h3 className='text-[10px] text-blue-500'>phone</h3>
                <PhoneAndroidIcon className='text-black-500' />
              </Button>
              <Button
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                onClick={() => {
                  notify('Sorting by email, please hold on..'), getCustomers('email')
                }}
              >
                <h3 className='text-[10px] text-blue-500'>Email</h3>
                <MarkEmailReadIcon className='text-red-400' />
              </Button>
              <Button
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                onClick={() => {
                  notify('Sorting by name, please hold on..'), getCustomers('firstname')
                }}
              >
                <h3 className='text-[10px] text-blue-500'>name</h3>
                <BadgeIcon className='text-green-500' />
              </Button>
              <Button
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                onClick={() => {
                  notify('Sorting by isAdmin, please hold on..'), getCustomers('isAdmin')
                }}
              >
                <h3 className='text-[10px] text-blue-500'>isAdmin</h3>
                <AdminPanelSettingsIcon className='text-green-500' />
              </Button>
              <Button
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                onClick={() => {
                  notify('Sorting by isBlocked, please hold on..'), getCustomers('isBlocked')
                }}
              >
                <h3 className='text-[10px] text-blue-500'>isBlocked</h3>
                <BlockIcon className='text-red-500' />
              </Button>
            </Card>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 740 }} className='z-0' style={{ zIndex: 0.5 }}>
                <Table stickyHeader aria-label='sticky table'>
                  <TableHead>
                    <TableRow>
                      {columns.map((column, index) => (
                        <TableCell key={index} align={column.align} sx={{ minWidth: column.minWidth }}>
                          {column.label}
                        </TableCell>
                      ))}

                      <TableCell key='JoinedAT'>JoinedAT</TableCell>
                      <TableCell key='ModifiedAt'>ModifiedAt</TableCell>
                      <TableCell key='blocked'>Blocked</TableCell>
                      <TableCell key='isAdmin'>isAdmin</TableCell>
                    </TableRow>
                  </TableHead>

                  {users.length > 0 ? (
                    <TableBody>
                      {users?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => {
                        return (
                          <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                            {columns.map(column => {
                              const value = user[column.id]

                              return (
                                <TableCell key={column.id} align={column.align} onClick={() => getCustomer(user._id)}>
                                  {column.format && typeof value === 'number' ? column.format(value) : value}
                                </TableCell>
                              )
                            })}

                            <TableCell align='right'>
                              {new Date(`${user.dateJoined}`).toLocaleString('en-GB', { hour12: false })}
                            </TableCell>
                            <TableCell align='right'>
                              {new Date(`${user.updatedAt}`).toLocaleString('en-GB', { hour12: false })}
                            </TableCell>

                            <TableCell key={index * 10 + 100}>
                              <Chip
                                label={user.isBlocked ? 'true' : 'false'}
                                color={statusObj2[user.isBlocked ? 'true' : 'false'].color}
                                sx={{
                                  height: 24,
                                  fontSize: '0.75rem',
                                  textTransform: 'capitalize',
                                  '& .MuiChip-label': { fontWeight: 500 }
                                }}
                                onClick={() => {
                                  setUserId(user._id)
                                  setName(user.firstname)
                                  setBlocked(user.isBlocked ? true : false)
                                  setShow(!show)
                                }}
                              />
                            </TableCell>
                            <TableCell key={index * 20 + 2000}>
                              <Chip
                                label={user.isAdmin ? 'true' : 'false'}
                                color={statusObj[user.isAdmin ? 'true' : 'false'].color}
                                sx={{
                                  height: 24,
                                  fontSize: '0.75rem',
                                  textTransform: 'capitalize',
                                  '& .MuiChip-label': { fontWeight: 500 }
                                }}
                                onClick={() => {
                                  // setUserId(user._id),
                                  //   setName(user.firstname),
                                  notify2('you are not allowed to perform this operation!, contact superior Admin')
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        )
                      })}
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
              {users.length > 0 ? (
                <>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component='div'
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                  <Chip
                    label={`Customers count: ${users.length}`}
                    color='primary'
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                    className='absolute ml-2 mt-2'
                  />
                </>
              ) : null}
            </Paper>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Customers
