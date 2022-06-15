import { createSlice } from '@reduxjs/toolkit'
import i18next from 'i18next'
const initialState = {
  language: 'ar',
}
export const uiSlice = createSlice({
  name: 'uiSlice',
  initialState,
  reducers: {
    initLang: (state) => {
      let localLang = localStorage.getItem('language')
      if (localLang === 'ar') {
        state.language = 'ar'
        document.documentElement.lang = 'ar'
        document.documentElement.dir = 'rtl'
      } else if (localLang === 'en') {
        state.language = 'en'
        document.documentElement.lang = 'en'
        document.documentElement.dir = 'ltr'
        i18next.changeLanguage(state.language)
      } else {
        localStorage.setItem('language', 'ar')
      }
    },
    changeLanguage: (state) => {
      if (state.language === 'ar') {
        state.language = 'en'
        document.documentElement.lang = 'en'
        document.documentElement.dir = 'ltr'
        i18next.changeLanguage(state.language)
        localStorage.setItem('language', state.language)
      } else {
        state.language = 'ar'
        document.documentElement.lang = 'ar'
        document.documentElement.dir = 'rtl'
        i18next.changeLanguage(state.language)
        localStorage.setItem('language', state.language)
      }
    },
  },
})

export const { changeLanguage, initLang } = uiSlice.actions

export default uiSlice.reducer
