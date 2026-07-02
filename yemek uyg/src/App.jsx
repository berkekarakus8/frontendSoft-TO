import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import RestaurantLayout from './layouts/RestaurantLayout';

// Public/Customer Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Restaurants from './pages/Restaurants';
import RestaurantDetail from './pages/RestaurantDetail';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminUsers from './pages/admin/AdminUsers';
import AdminRestaurants from './pages/admin/AdminRestaurants';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCategories from './pages/admin/AdminCategories';
import AdminCampaigns from './pages/admin/AdminCampaigns';

// Restaurant Pages
import RestaurantOrders from './pages/restaurant/RestaurantOrders';
import RestaurantProducts from './pages/restaurant/RestaurantProducts';
import RestaurantProfile from './pages/restaurant/RestaurantProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* Müşteri (User) Arayüzü */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="restaurants" element={<Restaurants />} />
          <Route path="restaurant/:id" element={<RestaurantDetail />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>

        {/* Admin Paneli Arayüzü */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/users" replace />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="restaurants" element={<AdminRestaurants />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="campaigns" element={<AdminCampaigns />} />
        </Route>

        {/* Restoran Sahibi Paneli Arayüzü */}
        <Route path="/restaurant-panel" element={<Navigate to="/restaurant/orders" replace />} />
        <Route path="/restaurant" element={<RestaurantLayout />}>
          <Route path="orders" element={<RestaurantOrders />} />
          <Route path="products" element={<RestaurantProducts />} />
          <Route path="profile" element={<RestaurantProfile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
