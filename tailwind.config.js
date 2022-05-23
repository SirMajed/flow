module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Cairo'],
      },
      colors: {
        dark_primary: '#121317',
        dark_accent: '#1A1C23',
        primary: '#185D83',
        primary2: '#0e8a8a',
        accent: '#164F6E',
        primaryHover: '#14435D',
        accentHover: '#275F6D',
        hoverColor: '#EDF6F4',
        button_primary: '#14415a',
        button_accent: '#164F6E',
        alert_success: '#52AB98',
        alert_error: '#DC1010',
        alert_info: '#E9C05E',
        field: '#FBFCFD',
        tdark: '#e8e8e8',
        tdark_accent: '#a2a1a4',
        tlight: '#4B5563',
        tlight_accent: '#9CA3AF',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
