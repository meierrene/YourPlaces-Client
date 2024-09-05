// import NewPlace from './places/pages/NewPlace';
// import Users from './user/pages/Users';
// import UserPlaces from './places/pages/UserPlaces';
// import UpdatePlace from './places/pages/UpdatePlace';
// import Auth from './user/pages/Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthProvider } from './shared/context/AuthContext';
import ProtectedRoute from './shared/components/Navigation/ProtectedRoute';
import { lazy, Suspense } from 'react';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
const Users = lazy(() => import('./user/pages/Users'));
const NewPlace = lazy(() => import('./places/pages/NewPlace'));
const UserPlaces = lazy(() => import('./places/pages/UserPlaces'));
const UpdatePlace = lazy(() => import('./places/pages/UpdatePlace'));
const Auth = lazy(() => import('./user/pages/Auth'));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainNavigation />
        <main>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route index element={<Users />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/:userId/places" element={<UserPlaces />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/places/:placeId" element={<UpdatePlace />} />
                <Route path="/places/new" element={<NewPlace />} />
              </Route>
            </Routes>
          </Suspense>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
