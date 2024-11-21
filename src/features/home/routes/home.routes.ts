import NotFound from '../../../components/NotFound/NotFound';
import PaymentCancel from '../../../components/PaymentCancel/PaymentCancel';
import PaymentSuccess from '../../../components/PaymentSuccess/PaymentSuccess';
import { RouteItemDef } from '../../../types/routes.types';
import { HomePathsEnum } from '../constants/home.paths';
import AboutUs from '../screens/AboutUs/AboutUs';
import AccountPeron from '../screens/AccountPerson/AccountPeron';
import Blog from '../screens/Blog/Blog';
import DetailProduct from '../screens/DetailProduct/DetailProduct';
import HomePage from '../screens/HomePage/HomePage';
import OrderPage from '../screens/OrderPage/OrderPage';
import Product from '../screens/Product/Product';
import ShoppingCart from '../screens/ShoppingCart/ShoppingCart';
import Wishlist from '../screens/Wishlist/Wishlist';

export const HOME_SCREEN: RouteItemDef = {
  id: 'home',
  path: HomePathsEnum.HOME,
  element: HomePage,
  pageTitle: 'Home Page',
  isAuthRoute: false,
};

export const SHOP_SCREEN: RouteItemDef = {
  id: 'shop',
  path: HomePathsEnum.SHOP,
  element: HomePage,
  pageTitle: 'Shop Page',
  isAuthRoute: false,
};

export const PRODUCT_SCREEN: RouteItemDef = {
  id: 'product',
  path: HomePathsEnum.PRODUCT,
  element: Product,
  pageTitle: 'Product Page',
  isAuthRoute: false,
};

export const PRODUCT_DETAIL_SCREEN: RouteItemDef = {
  id: 'product_detail',
  path: HomePathsEnum.PRODUCT_DETAIL,
  element: DetailProduct,
  pageTitle: 'Product detail Page',
  isAuthRoute: false,
};

export const BLOG_SCREEN: RouteItemDef = {
  id: 'blog',
  path: HomePathsEnum.BLOG,
  element: Blog,
  pageTitle: 'Blog Page',
  isAuthRoute: false,
};

export const CONTACT_SCREEN: RouteItemDef = {
  id: 'contact',
  path: HomePathsEnum.CONTACT,
  element: NotFound,
  pageTitle: 'Home Page',
  isAuthRoute: false,
};

export const CART_SCREEN: RouteItemDef = {
  id: 'cart',
  path: HomePathsEnum.CART,
  element: ShoppingCart,
  pageTitle: 'Cart Page',
  isAuthRoute: true,
};

export const ACCOUNT_SCREEN: RouteItemDef = {
  id: 'account',
  path: HomePathsEnum.ACCOUNT,
  element: AccountPeron,
  pageTitle: 'ACCOUNT Page',
  isAuthRoute: true,
};

export const WISHLIST_SCREEN: RouteItemDef = {
  id: 'wishlist',
  path: HomePathsEnum.WISHLIST,
  element: Wishlist,
  pageTitle: 'Wishlist Page',
  isAuthRoute: true,
};

export const RANDOM_ROUTE: RouteItemDef = {
  id: 'random',
  path: HomePathsEnum.RANDOM_ROUTE,
  element: HomePage,
  pageTitle: 'Home Page',
  isAuthRoute: false,
};

export const PAYMENT_SUCCESS_SCREEN: RouteItemDef = {
  id: 'payment_success',
  path: HomePathsEnum.PAYMENT_SUCCESS,
  element: PaymentSuccess,
  pageTitle: 'Payment Success',
  isAuthRoute: true,
};

export const PAYMENT_CANCEL_SCREEN: RouteItemDef = {
  id: 'payment_cancel',
  path: HomePathsEnum.PAYMENT_CANCEL,
  element: PaymentCancel,
  pageTitle: 'Payment Cancel',
  isAuthRoute: true,
};

export const ORDER_SCREEN: RouteItemDef = {
  id: 'order',
  path: HomePathsEnum.ORDER,
  element: OrderPage,
  pageTitle: 'Order Page',
  isAuthRoute: true,
};

export const ABOUT_US_SCREEN: RouteItemDef = {
  id: 'about_us',
  path: HomePathsEnum.ABOUT_US,
  element: AboutUs,
  pageTitle: 'About Us',
  isAuthRoute: false,
};

export const HOME_ROUTES = [
  HOME_SCREEN,
  SHOP_SCREEN,
  PRODUCT_SCREEN,
  BLOG_SCREEN,
  CONTACT_SCREEN,
  CART_SCREEN,
  ACCOUNT_SCREEN,
  WISHLIST_SCREEN,
  RANDOM_ROUTE,
  PRODUCT_DETAIL_SCREEN,
  PAYMENT_SUCCESS_SCREEN,
  PAYMENT_CANCEL_SCREEN,
  ORDER_SCREEN,
  ABOUT_US_SCREEN
];
