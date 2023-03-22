import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore2 = create(
  persist(
    set => ({
      productId: '',
      setProductId: id => {
        set({ productId: id })
      }
    }),
    {
      name: 'productId'
    }
  )
)

export default useStore2
