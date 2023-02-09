import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import './App.css';
import { HomePage } from './pages/HomePage/HomePage';
import { RegPage } from './pages/AuthPage/AuthPage';
import { ArticlePage } from './pages/ArticlePage/ArticlePage';
import { SignInPage } from './pages/SignInPage/SignInPage';
import { CreateArticlePage } from './pages/Create Article/CreateArticlePage';
import { RequireAuth } from './HOC/RequireAuth';
import { EditArticlePage } from './pages/EditArticlePage/EditArticlePage';
import { EditProfile } from './pages/EditProfilePage/EditProfile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/:slug" element={<ArticlePage />} />
          <Route path="/sign-up" element={<RegPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route
            path="/create-article"
            element={
              <RequireAuth>
                <CreateArticlePage />
              </RequireAuth>
            }
          />
          <Route
            path="/edit-article"
            element={
              <RequireAuth>
                <EditArticlePage />
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
