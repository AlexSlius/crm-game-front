import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ukUA from "antd/locale/uk_UA";
import dayjs from "dayjs";
import "dayjs/locale/uk";

import { Autorization } from "./pages/autorization";
import { Home } from "./pages/home";
import { Cities } from "./pages/cities";
import { Games } from "./pages/games";
import { QuestionAnswer } from "./pages/question-answer";
import { Teams } from "./pages/teams";
import { Users } from "./pages/users";
import { Page404 } from "./pages/404";
import { ProtectedRoute } from "./components/security/protectedRouter";
import { Note } from "./components/note";
import { MainLayout } from "./layouts/main-layout";

import CONSTANTS from "./constants/routers.json";
import { GamsesActive } from "./pages/games-active";
import { RequireModerator } from "./components/require-moderator";

dayjs.locale("uk");

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        locale={ukUA}
        theme={{
          token: {
            controlHeight: 42,
          },
        }}
      >
        <Router>
          <Note />

          <Routes>
            <Route path={"/login"} element={<Autorization />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path={CONSTANTS.home} element={<Home />} />
                <Route path={CONSTANTS.gamesActive} element={<GamsesActive />} />
                <Route path={CONSTANTS.gamesAll} element={<Games />} />
                <Route path={CONSTANTS.cities} element={<RequireModerator><Cities /></RequireModerator>} />
                <Route path={CONSTANTS.users} element={<RequireModerator><Users /></RequireModerator>} />
                <Route path={CONSTANTS.question} element={<QuestionAnswer />} />
                <Route path={CONSTANTS.teams} element={<Teams />} />
              </Route>
            </Route>

            <Route path="*" element={<Page404 />} />
          </Routes>
        </Router>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
