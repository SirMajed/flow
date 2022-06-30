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
      localStorage.setItem('language', 'ar')
      let localLang = localStorage.getItem('language')
      if (localLang === 'ar') {
        state.language = 'ar'
        document.documentElement.lang = 'ar'
        document.documentElement.dir = 'rtl'
        i18next.changeLanguage('ar')
      } else if (localLang === 'en') {
        state.language = 'en'
        document.documentElement.lang = 'en'
        document.documentElement.dir = 'ltr'
        i18next.changeLanguage(state.language)
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
    setArabic: (state) => {
      state.language = 'ar'
    },
    setEnglish: (state) => {
      state.language = 'en'
    },
  },
})

export const { changeLanguage, initLang, setArabic, setEnglish } = uiSlice.actions

export default uiSlice.reducer
