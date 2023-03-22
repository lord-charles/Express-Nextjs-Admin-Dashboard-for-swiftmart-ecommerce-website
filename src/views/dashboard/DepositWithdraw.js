// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiDivider from '@mui/material/Divider'

const depositData = [
  {
    logoWidth: 56,
    logoHeight: 29,
    amount: '+ksh1,112,650',
    subtitle: 'Paybill',
    title: 'Mpesa Account',
    logo: '/images/misc/mpesa.png'
  },
  {
    logoWidth: 56,
    logoHeight: 38,
    amount: '+ksh992,705',
    title: 'Equity Bank',
    subtitle: 'Bank transfer',
    logo: '/images/misc/equity.png'
  },

  {
    logoWidth: 56,
    logoHeight: 42,
    amount: '+ksh76,837',
    title: 'paypal Account',
    subtitle: 'Wallet deposit',
    logo: '/images/misc/paypal.png'
  },
  {
    logoWidth: 56,
    logoHeight: 42,
    amount: '+ksh52,957',
    title: 'Mastercard',
    subtitle: 'Bank Transfer',
    logo: '/images/logos/mastercard-label.png'
  },
  {
    logoWidth: 56,
    logoHeight: 42,
    amount: '+ksh11.446',
    title: 'Stripe Account',
    subtitle: 'iOS Application',
    logo: '/images/logos/stripe.png'
  }
]

const withdrawData = [
  {
    logoWidth: 56,
    logoHeight: 50,
    amount: '-ksh145',
    title: 'Referal',
    subtitle: 'Mpesa deposit',
    logo: '/images/misc/referal.png'
  },
  {
    logoWidth: 56,
    logoHeight: 34,
    amount: '-ksh1870',
    title: 'Coupons',
    logo: '/images/misc/coupon.png',
    subtitle: 'System discount'
  },
  {
    logoWidth: 56,
    logoHeight: 40,
    amount: '-ksh450',
    title: 'Discount',
    subtitle: 'Discounts',
    logo: '/images/misc/discount.png'
  },
  {
    logoWidth: 56,
    logoHeight: 30,
    amount: '-ksh540',
    title: 'flash sale loss',
    subtitle: 'Fast sales',
    logo: '/images/misc/flash-sale.png'
  },
  {
    logoWidth: 56,
    logoHeight: 41,
    amount: '-ksh21',
    title: 'lucky customer',
    logo: '/images/misc/lucky.png',
    subtitle: 'Best seller of month'
  }
]

// Styled Divider component
const Divider = styled(MuiDivider)(({ theme }) => ({
  margin: theme.spacing(5, 0),
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 'none',
    margin: theme.spacing(0, 5),
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const DepositWithdraw = () => {
  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: ['column', 'column', 'row'] }}>
      <Box sx={{ width: '100%' }}>
        <CardHeader
          title='Deposit'
          sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          action={<Typography variant='caption'>View All</Typography>}
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
        />
        <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
          {depositData.map((item, index) => {
            return (
              <Box
                key={item.title}
                sx={{ display: 'flex', alignItems: 'center', mb: index !== depositData.length - 1 ? 6 : 0 }}
              >
                <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'center' }}>
                  <img src={item.logo} alt={item.title} width={item.logoWidth} height={item.logoHeight} />
                </Box>
                <Box
                  sx={{
                    ml: 4,
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.title}</Typography>
                    <Typography variant='caption'>{item.subtitle}</Typography>
                  </Box>
                  <Typography variant='subtitle2' sx={{ fontWeight: 600, color: 'success.main' }}>
                    {item.amount}
                  </Typography>
                </Box>
              </Box>
            )
          })}
        </CardContent>
      </Box>

      <Divider flexItem />

      <Box sx={{ width: '100%' }}>
        <CardHeader
          title='Withdraw'
          sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          action={<Typography variant='caption'>View All</Typography>}
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
        />
        <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
          {withdrawData.map((item, index) => {
            return (
              <Box
                key={item.title}
                sx={{ display: 'flex', alignItems: 'center', mb: index !== depositData.length - 1 ? 6 : 0 }}
              >
                <Box sx={{ minWidth: 36, display: 'flex', justifyContent: 'center' }}>
                  <img src={item.logo} alt={item.title} width={item.logoWidth} height={item.logoHeight} />
                </Box>
                <Box
                  sx={{
                    ml: 4,
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.title}</Typography>
                    <Typography variant='caption'>{item.subtitle}</Typography>
                  </Box>
                  <Typography variant='subtitle2' sx={{ fontWeight: 600, color: 'error.main' }}>
                    {item.amount}
                  </Typography>
                </Box>
              </Box>
            )
          })}
        </CardContent>
      </Box>
    </Card>
  )
}

export default DepositWithdraw
