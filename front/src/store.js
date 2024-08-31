import { legacy_createStore as createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  theme: 'light',
  AiData: [],
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case 'AddData':
      const updatedAiData = rest.data
      const localeStoreData = localStorage.getItem('vulnerabilities') || []
      if (localeStoreData.length === 0) {
        console.log('el sotrage feragh')
        const datatoLoad = JSON.stringify(updatedAiData)
        localStorage.setItem('vulnerabilities', datatoLoad)
      }
      return { AiData: updatedAiData }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
