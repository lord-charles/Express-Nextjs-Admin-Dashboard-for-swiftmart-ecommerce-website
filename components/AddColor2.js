import * as React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import Autocomplete from '@mui/material/Autocomplete'
import { useState } from 'react'
import { Button } from '@mui/material'
import { createBrand } from 'src/features/brand/brandService'
import { toast, Toaster } from 'react-hot-toast'
import { createCategory } from 'src/features/pcategory/pcategoryService'
import { createColor } from 'src/features/color/colorService'
import useStore3 from 'utils/Store3'
import useStore2 from 'utils/Store2'

import { useEffect } from 'react'

const notify = message => toast.error(message)

const token =
  typeof window !== 'undefined' && localStorage.getItem('useDetails')
    ? JSON.parse(localStorage.getItem('useDetails'))
    : null

export default function AddColor2({ handleNext }) {
  const [btnActive, setBtnActive] = useState(true)
  const [colorSuccess, setSuccessFromLocalStorage] = useState(false)
  const { setSuccessRateColor } = useStore3()
  const { setProductId } = useStore2()
  const [productId, setproductId] = useState('')

  //for color
  const [name, setName] = useState('')
  const [quantity, setquantity] = useState('1')

  useEffect(() => {
    const getsuccessFromLocalStorage =
      typeof window !== 'undefined' && localStorage.getItem('successRate')
        ? JSON.parse(localStorage.getItem('successRate'))
        : null
    setSuccessFromLocalStorage(getsuccessFromLocalStorage.state.successRateColor)
  }, [])

  const colorData = {
    name: name?.name,
    code: name?.hex,
    availability: quantity,
    productId: productId,
    image: ''
  }

  //   const successRateBrand = getsuccessFromLocalStorage.state.successRateBrand
  console.log(colorData, colorSuccess)

  const handleNextPage = () => {
    if (colorSuccess) {
      setTimeout(() => {
        handleNext()
      }, 3000)
    } else {
      notify('Something went wrong, please try again. if error persists, contact developer')
    }
  }

  const handleAddProductDetails = () => {
    setProductId(productId)
    setBtnActive(false)
    createColor(colorData, token.state.userDetails.token, setSuccessRateColor, setBtnActive, handleNextPage)
  }

  return (
    <>
      <Typography variant='h5' gutterBottom>
        product details
      </Typography>
      <Toaster />

      {/* color */}
      <Grid item xs={12} md={8}>
        <TextField
          required
          id='productId'
          label='productId'
          helperText='unique'
          variant='standard'
          value={productId}
          onChange={event => setproductId(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Autocomplete
          id='multiple-select'
          sx={{ width: 300 }}
          options={colors}
          autoHighlight
          getOptionLabel={option => option.name}
          renderOption={(props, option) => (
            <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              {option.name}
              {'-'}
              {option.hex} {<div className={`w-[15px] h-[15px] ml-5`} style={{ backgroundColor: `${option.hex}` }} />}
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
          onChange={(event, value) => setName(value)}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <TextField
          required
          id='brand model'
          label='quantity(color)'
          helperText='quantity of products with above color'
          fullWidth
          type='number'
          variant='standard'
          value={quantity}
          onChange={event => setquantity(event.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox color='secondary' name='saveAddress' value='yes' />}
          label='Make sure all inputs are correct'
        />
        <Button
          variant='contained'
          onClick={handleAddProductDetails}
          sx={{ alignItems: 'center', ml: 25 }}
          sm={{ mt: 3, ml: 1 }}
          disabled={btnActive ? false : true}
        >
          {btnActive ? 'Add Details' : 'please wait...'}
        </Button>
      </Grid>
    </>
  )
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/category.js
const categories = [
  { category: 'Clothing and Accessories' },
  { category: 'Electronics and Gadgets' },
  { category: 'Home and Kitchen' },
  { category: 'Beauty and Personal Care' },
  { category: 'Health and Wellness' },
  { category: 'Baby and Kids' },
  { category: 'Books and Media' },
  { category: 'Automotive' },
  { category: 'Sports and Outdoors' },
  { category: 'Pet Supplies' }
]

const subcategories = [
  { subcategory: "Men's Clothing" },
  { subcategory: "Women's Clothing" },
  { subcategory: "Kid's Clothing" },
  { subcategory: 'Shoes' },
  { subcategory: 'Accessories' },
  { subcategory: 'Smartphones' },
  { subcategory: 'Tablets' },
  { subcategory: 'Laptops' },
  { subcategory: 'TVs' },
  { subcategory: 'Headphones' },
  { subcategory: 'Kitchen Appliances' },
  { subcategory: 'Furniture' },
  { subcategory: 'Bedding' },
  { subcategory: 'Makeup' },
  { subcategory: 'Skincare' },
  { subcategory: 'Haircare' },
  { subcategory: 'Vitamins and Supplements' },
  { subcategory: 'Fitness Equipment' },
  { subcategory: 'Baby Gear' },
  { subcategory: 'Diapers and Wipes' },
  { subcategory: "Children's Books" },
  { subcategory: 'Adult Books' },
  { subcategory: 'Movies' },
  { subcategory: 'TV Shows' },
  { subcategory: 'Automotive Parts' },
  { subcategory: 'Tires' },
  { subcategory: 'Camping and Hiking' },
  { subcategory: 'Cycling' },
  { subcategory: 'Fishing' },
  { subcategory: 'Pet Food' },
  { subcategory: 'Pet Toys' },
  { subcategory: 'Pet Health and Wellness' }
]

const brands = [
  { brand: "Levi's" },
  { brand: 'Under Armour' },
  { brand: 'Converse' },
  { brand: 'Vans' },
  { brand: 'Coach' },
  { brand: 'Michael Kors' },
  { brand: 'Ray-Ban' },
  { brand: 'Timberland' },
  { brand: 'The North Face' },
  { brand: 'Apple' },
  { brand: 'Samsung' },
  { brand: 'Sony' },
  { brand: 'Bose' },
  { brand: 'Canon' },
  { brand: 'Nikon' },
  { brand: 'Fitbit' },
  { brand: 'GoPro' },
  { brand: 'DJI' },
  { brand: 'IKEA' },
  { brand: 'Home Depot' },
  { brand: 'Wayfair' },
  { brand: 'Williams-Sonoma' },
  { brand: 'Pottery Barn' },
  { brand: 'Crate and Barrel' },
  { brand: 'Restoration Hardware' },
  { brand: 'Bed Bath & Beyond' },
  { brand: 'Kohler' },
  { brand: 'Neutrogena' },
  { brand: 'MAC' },
  { brand: 'LUSH' },
  { brand: 'Aveeno' },
  { brand: 'Bath & Body Works' },
  { brand: "Kiehl's" },
  { brand: 'Origins' },
  { brand: "Burt's Bees" },
  { brand: 'TRESemmé' },
  { brand: 'GNC' },
  { brand: 'MyFitnessPal' },
  { brand: 'Beachbody' },
  { brand: 'Garmin' },
  { brand: 'Omron' },
  { brand: 'Bowflex' },
  { brand: 'Vitamix' },
  { brand: 'NutriBullet' },
  { brand: "Carter's" },
  { brand: 'Gerber' },
  { brand: 'Graco' },
  { brand: 'Fisher-Price' },
  { brand: 'BabyBjorn' },
  { brand: 'Pampers' },
  { brand: 'Huggies' },
  { brand: 'Enfamil' },
  { brand: "Johnson's Baby" },
  { brand: 'Amazon Kindle' },
  { brand: 'Barnes & Noble' },
  { brand: 'Audible' },
  { brand: 'Spotify' },
  { brand: 'Apple Music' },
  { brand: 'Pandora' },
  { brand: 'Google Play Books' },
  { brand: 'Netflix' },
  { brand: 'Hulu' },
  { brand: 'Michelin' },
  { brand: 'Bridgestone' },
  { brand: 'Firestone' },
  { brand: 'Goodyear' },
  { brand: 'Bosch' },
  { brand: '3M' },
  { brand: 'Castrol' },
  { brand: 'Valvoline' },
  { brand: 'Mobil' },
  { brand: 'Patagonia' },
  { brand: 'Columbia' },
  { brand: 'REI' },
  { brand: 'Yeti' },
  { brand: 'CamelBak' },
  { brand: 'Coleman' }
]

const colors = [
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
