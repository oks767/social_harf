// main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'; // ✅ Импортируем
import App from './App'
import store from './store/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>  {/* ✅ Оборачиваем в Router */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);