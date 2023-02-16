import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage/HomePage';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { ArticlePage } from './pages/ArticlePage/ArticlePage';
import { LoginPage } from './pages/Login Page/LoginPage';
import { CreateArticle } from './pages/Create Article/CreateArticle';
import { RequireAuth } from './HOC/RequireAuth';
import { EditArticle } from './pages/Edit Article/EditArticle';
import { EditProfile } from './pages/EditProfilePage/EditProfile';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/:slug" element={<ArticlePage />} />
          <Route path="/sign-up" element={<AuthPage />} />
          <Route path="/sign-in" element={<LoginPage />} />
          <Route
            path="/create-article"
            element={
              <RequireAuth>
                <CreateArticle />
              </RequireAuth>
            }
          />
          <Route
            path="/edit-article"
            element={
              <RequireAuth>
                <EditArticle />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <EditProfile />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
