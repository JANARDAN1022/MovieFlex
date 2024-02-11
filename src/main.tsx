import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.css'
import { MovieBannerContextProvider } from './Context/MovieBannerContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MovieBannerContextProvider>  
    <App />
  </MovieBannerContextProvider>
)
