
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductList from "./pages/ProductList"
import Register from './pages/Register';
import Cart from './pages/Cart'
import Product from './pages/Product';
import {
  BrowserRouter as Router, Routes, Route,


} from 'react-router-dom'
import Success from './pages/Success'
import { useSelector } from 'react-redux';

function App() {
  
  const user = useSelector((state) => state.user.currentUser)
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}>

        </Route>
        <Route path='/products/:category' element={<ProductList />}>

        </Route>
        <Route path='/product/:id' element={<Product />}>

        </Route>
        <Route path='/cart' element={<Cart />}>

        </Route>
        <Route path='/success' element={<Success />}>

        </Route>
        <Route path="/login" element={<Login />}>
          {/* {user ? <redirect to='/'/>: <Login />} */}
        </Route>
        <Route path="/register" element={<Register />}>
        {/* {user ? <redirect to='/'/>: <Register />} */}
        </Route>
      </Routes>
    </Router>

  )
}

export default App;
