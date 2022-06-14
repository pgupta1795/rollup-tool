import React from "react";
import LoginPage from "./pages/LoginPage";
import TypesPage from "./pages/TypesPage";
import ErrorPage from "./pages/ErrorPage";
import ObjectPage from "./pages/ObjectPage";
import HomePage from "./pages/HomePage";
import { CssBaseline, Box } from "@mui/material";
import Header from "./components/Header/header";
import { AuthProvider } from "./authentication/auth";
import { RequireAuth, IsLogin } from "./components/Auth/RequireAuth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Paths from "./utils/Paths";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";
import "./Styles/App.css";

const App = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <AuthProvider>
      <Box sx={{ flexGrow: 1, width: "100%", height: "100%" }}>
        <ThemeProvider theme={checked ? darkTheme : lightTheme}>
          <Router>
            <CssBaseline />
            <Header checked={checked} setChecked={setChecked} />
            <Routes>
              <Route
                path={Paths.LOGIN}
                element={
                  <IsLogin>
                    <LoginPage />
                  </IsLogin>
                }
              />
              <Route
                path={Paths.HOME}
                element={
                  <RequireAuth>
                    <HomePage />
                  </RequireAuth>
                }
              />
              <Route
                path={Paths.HOME + "/:type"}
                element={
                  <RequireAuth>
                    <TypesPage />
                  </RequireAuth>
                }
              />
              <Route
                path={Paths.HOME + "/:type/:id"}
                element={
                  <RequireAuth>
                    <ObjectPage />
                  </RequireAuth>
                }
              />
              <Route path={Paths.ERROR} element={<ErrorPage />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </Box>
    </AuthProvider>
  );
};

export default App;
