import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import Navbar from '~/components/Navbar';
import { AuthProvider } from '~/contexts/AuthContex';
import { CartProvider } from '~/contexts/CartContext';
import { SettingsProvider } from '~/contexts/SettingsContext';
import PrivateRoute from './components/PrivateRoute';
import { Fragment } from 'react';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <SettingsProvider>
            <Routes>
              {/* Public routes */}
              {publicRoutes.map((route, index) => {
                const Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Fragment>
                        <Navbar />
                        <Page />
                      </Fragment>
                    }
                  />
                );
              })}

              {/* Private routes */}
              {privateRoutes.map((route, index) => {
                const Layout = route.component;

                if (route.children && route.children.length > 0) {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <PrivateRoute requiredRole={route.requiredRole}>
                          <Layout />
                        </PrivateRoute>
                      }
                    >
                      {route.children.map((child, i) => {
                        const ChildPage = child.component;
                        return (
                          <Route
                            key={i}
                            path={child.path}
                            element={<ChildPage />}
                          />
                        );
                      })}
                    </Route>
                  );
                }

                const Page = route.component;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <PrivateRoute requiredRole={route.requiredRole}>
                        <Fragment>
                          <Navbar />
                          <Page />
                        </Fragment>
                      </PrivateRoute>
                    }
                  />
                );
              })}
            </Routes>
          </SettingsProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
