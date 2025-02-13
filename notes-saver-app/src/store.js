import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from '../src/redux/pasteSlice'
export const store = configureStore({
  reducer: {
    paste: pasteReducer
  },
})