import { Routes, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/auth.context';
import { firebaseAuth } from './libs/firebase';
import PrivateRoute from './components/PrivateRoute';
import DashboardPage from './pages/DashboardPage';
import EditProfilePage from './pages/EditProfilePage';
import ProfileViewPage from './pages/ProfileViewPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

export default function App() {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      async (firebaseUser) => {
        if (firebaseUser) {
          console.log(firebaseUser);
        }
      }
    );
    return () => unsubscribe();
  }, [setUser]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profiles/:id"
          element={
            <PrivateRoute>
              <EditProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="/:profileName" element={<ProfileViewPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}
