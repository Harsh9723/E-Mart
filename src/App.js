
import React from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';

function App() {
  // Parse localStorage data
  // const localStorageData = JSON.parse(localStorage.getItem("persist:root"));
  
  // Extract isAdmin status from localStorageData, handling null case
  // const isAdmin = localStorageData && localStorageData.user && JSON.parse(localStorageData.user)?.currentUser.isAdmin;


  return (
    <Router>
       
       <Routes>
        <>
        <Route path='/login' element={<Login />} />
          <Topbar />
          <div className='container'>
            <Sidebar />
              <Route path='/' element={<Home />} />
              <Route path='/users' element={<UserList />} />
              <Route path='/user/:userId' element={<User />} />
              <Route path='/newUser' element={<NewUser />} />
              <Route path='/products' element={<ProductList />} />
              <Route path='/product/:productId' element={<Product />} />
              <Route path='/newproduct' element={<NewProduct />} />
              {/* Redirect to home if route not found */}
              <Route path='*' element={<Navigate to='/' />} />
          </div>
          </>

            </Routes>
     
        <Routes>
          <Route path='/login' element={<Login />} />
          {/* Redirect to login if user is not admin */}
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
    
    </Router>
  );
}

export default App;

