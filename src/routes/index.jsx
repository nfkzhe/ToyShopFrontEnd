import Home from '~/pages/Home/HomePage';
import ProductsPage from '~/pages/Product/ProductsPage';
import ProductsDetailPage from '~/pages/Product/ProductDetailPage';
import CartPage from '~/pages/Cart/CartPage';
import AboutPage from '~/pages/About/AboutPage';
import ContactPage from '~/pages/Contact/ContactPage';
import LoginPage from '~/pages/Login';
import AdminPage from '~/pages/Admin/AdminPage';
import ProfilePage from '~/pages/Profile';
import RegisterPage from '~/pages/Register';
import Dashboard from '~/pages/Admin/Dashboard';
import ProductsManagement from '~/pages/Admin/ProductsManagement';
import OrdersManagement from '~/pages/Admin/OrdersManagement';
import CategoriesManagement from '~/pages/Admin/CategoriesManagement';
import AdminLayout from '~/pages/Admin/AdminLayout';
import CustomersManagement from '~/pages/Admin/CustomersManagement';
import PromotionsManagement from '~/pages/Admin/PromotionsManagement';
import Settings from '~/components/Settings';
import SettingsPage from '~/pages/Admin/SettingsPage';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/products', component: ProductsPage },
  { path: '/products/:id', component: ProductsDetailPage },
  { path: '/cart', component: CartPage },
  { path: '/about', component: AboutPage },
  { path: '/contact', component: ContactPage},
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/profile', component: ProfilePage}, // chỉ cần đăng nhập

];

const privateRoutes = [
  {
    path: '/admin',
    component: AdminLayout, // đây là layout
    requiredRole: 'admin',
    children: [
      { path: '', component: Dashboard }, // tương đương /admin
      { path: 'products', component: ProductsManagement },
      { path: 'orders', component: OrdersManagement },
      { path: 'categories', component: CategoriesManagement },
      { path: 'customers', component: CustomersManagement },
      { path: 'promotions', component: PromotionsManagement },
      { path: 'settings', component: SettingsPage },
      // ...
    ]
  }
];

export { publicRoutes, privateRoutes };
