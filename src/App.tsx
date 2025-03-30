import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from 'antd';

import { Autorization } from "./pages/autorization";
import { Home } from "./pages/home";
import { Cities } from "./pages/cities";
import { Games } from "./pages/games";
import { QuestionAnswer } from "./pages/question-answer";
import { Teams } from "./pages/teams";
import { Users } from "./pages/users";
import { Page404 } from "./pages/404";
import { ProtectedRoute } from "./components/security/protectedRouter";
import { MainLayout } from "./layouts/main-layout";

import CONSTANTS from "./constants/routers.json";


function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          controlHeight: 42,
        },
      }}
    >
      <Router>
        <Routes>
          <Route path={"/login"} element={<Autorization />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path={CONSTANTS.home} element={<Home />} />
              <Route path={CONSTANTS.cities} element={<Cities />} />
              <Route path={CONSTANTS.games} element={<Games />} />
              <Route path={CONSTANTS.question} element={<QuestionAnswer />} />
              <Route path={CONSTANTS.teams} element={<Teams />} />
              <Route path={CONSTANTS.users} element={<Users />} />
            </Route>
          </Route>

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
