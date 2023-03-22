import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore3 = create(
  persist(
    set => ({
      successRateCategory: false,
      successRateBrand: false,
      successRateColor: false,
      successRateCategory2: false,
      successRateBrand2: false,
      successRateColor2: false,

      setSuccessRateCategory: boolean => {
        set({ successRateCategory: boolean })
      },
      setSuccessRateBrand: boolean => {
        set({ successRateBrand: boolean })
      },
      setSuccessRateColor: boolean => {
        set({ successRateColor: boolean })
      },
      setSuccessRateCategory2: boolean => {
        set({ successRateCategory2: boolean })
      },
      setSuccessRateBrand2: boolean => {
        set({ successRateBrand2: boolean })
      },
      setSuccessRateColor2: boolean => {
        set({ successRateColor2: boolean })
      }
    }),
    {
      name: 'successRate'
    }
  )
)

export default useStore3
