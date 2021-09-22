import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreens/ShippingScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import ProductListScreen from "./screens/ProductListScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path="/login" component={LoginScreen} exact />
          <Route path="/register" component={RegisterScreen} exact />
          <Route path="/profile" component={ProfileScreen} exact />
          <Route path="/admin/users" component={UserListScreen} exact />
          <Route
            path="/admin/users/:id/edit"
            component={UserEditScreen}
            exact
          />
          <Route path="/admin/products" component={ProductListScreen} exact />
          <Route
            path="/admin/products/:pageNumber"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/products/:id/edit"
            component={ProductEditScreen}
            exact
          />
          <Route path="/admin/orders" component={OrderListScreen} exact />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/cart" component={CartScreen} exact />
          <Route path="/shipping" component={ShippingScreen} exact />
          <Route path="/orders/:id" component={OrderScreen} exact />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomeScreen}
            exact
          />
          <Route path="/" exact component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
