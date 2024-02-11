import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';import Home from './Components/Home';
import MoviePlayer from './Components/MoviePlayer';
import Categories from './Components/Categories';
import MoreInfo from './Components/MoreInfo';


const App = () => {


  return (
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/watch/:MovieName' element={<MoviePlayer />} />
      <Route path='/Category/:category' element={<Categories />} />
      <Route path='/Info/:MovieName' element={<MoreInfo />} />
    </Routes>
  </Router>
    )
}

export default App