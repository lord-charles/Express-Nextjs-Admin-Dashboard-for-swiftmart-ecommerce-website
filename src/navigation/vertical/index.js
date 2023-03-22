// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

import Cart from 'mdi-material-ui/Cart'
import StarCircleOutline from 'mdi-material-ui/StarCircleOutline'
import Eyedropper from 'mdi-material-ui/Eyedropper'
import Tag from 'mdi-material-ui/Tag'
import TruckDelivery from 'mdi-material-ui/TruckDelivery'
import AccountMultiple from 'mdi-material-ui/AccountMultiple'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/dashboard'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Auth'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true
    },
    {
      title: 'Error',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true
    },
    {
      sectionTitle: 'Customer Management'
    },
    {
      title: 'Customers',
      icon: AccountMultiple,
      path: '/customers'
    },

    {
      sectionTitle: 'Catalog Management'
    },
    {
      title: 'Add product',
      path: '/products/addproduct',
      icon: Cart
    },
    {
      title: 'Product list',
      path: '/products/productlist',
      icon: Cart
    },
    {
      title: 'Add brand',
      icon: StarCircleOutline,
      path: '/brand/addbrand'
    },
    {
      title: 'Brand list',
      path: '/brand/brandlist',
      icon: StarCircleOutline
    },
    {
      title: 'Add Category',
      path: '/category/addcategory',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Category list',
      path: '/category/categorylist',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Add Color',
      path: '/color/addcolor',
      icon: Eyedropper
    },
    {
      title: 'Color list',
      path: '/color/colorlist',
      icon: Eyedropper
    },

    {
      sectionTitle: 'Marketing Management'
    },
    {
      title: 'Add coupon',
      path: '/coupon/addcoupon',
      icon: Tag
    },
    {
      title: 'Coupon list',
      icon: Tag,
      path: '/coupon/couponlist'
    },
    {
      title: 'Add blogs',
      icon: Table,
      path: '/blog/addblog'
    },
    {
      title: 'Blogs list',
      icon: Table,
      path: '/blog/bloglist'
    },

    {
      sectionTitle: 'Orders Management'
    },
    {
      title: 'Orders',
      path: '/orders',
      icon: TruckDelivery
    },
    {
      sectionTitle: 'Enquiries Management'
    },

    {
      title: 'Enquiries',
      icon: CubeOutline,
      path: '/enquiries'
    },

    {
      sectionTitle: 'leaning section'
    },
    {
      title: 'Coupon list',
      icon: Tag,
      path: '/cards'
    },
    {
      title: 'Add blogs',
      icon: Table,
      path: '/tables'
    },
    {
      title: 'Blogs list',
      icon: Table,
      path: '/form-layouts'
    }
  ]
}

export default navigation
