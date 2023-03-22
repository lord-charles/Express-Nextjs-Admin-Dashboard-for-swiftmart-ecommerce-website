import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    set => ({
      userDetails: {
        email: '',
        token: ''
      },
      addDetails: details => {
        set({
          userDetails: details
        })
      },

      getDetailsFromStorage: () => {
        const storedDetails = localStorage.getItem('useDetails')
        if (storedDetails) {
          set({
            userDetails: JSON.parse(storedDetails)
          })
        }
      }
    }),
    { name: 'useDetails' }
  )
)

export default useStore
