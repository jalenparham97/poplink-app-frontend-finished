import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import EditProfilePage from './pages/EditProfilePage';
import ProfileViewPage from './pages/ProfileViewPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/profiles/:id" element={<EditProfilePage />} />
        <Route path="/:profileName" element={<ProfileViewPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}
