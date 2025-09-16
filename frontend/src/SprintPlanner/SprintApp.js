
import { BrowserRouter, Routes,Route, useNavigate, useParams, Navigate, Outlet } from "react-router-dom"
import LoginComponent from "./LoginComponent"
import WelcomeComponent from "./WelcomeComponent"
import ErrorComponent from "./ErrorComponent"
import SprintsListComponent from "./SprintsListComponent"
import HeaderComponent from "./HeaderComponent"
import FooterComponent from "./FooterComponent"
import LogoutComponent from "./LogoutComponent"
import "./SprintApp.css";
import AuthProvider, { useAuth } from "./Security/AuthContext"
import SprintComponent from "./SprintComponent"
import LandingComponent from "./LandingComponent"

function AuthenticatedRoute() {
  const authContext = useAuth();

  if (authContext.isAuthenticated) {
    return <Outlet />;   // renders child routes here
  }

  return <Navigate to="/login" />;
}

export default function SprintApp()
{
    return(
        <div className="SprintApp">
            <AuthProvider>
            <BrowserRouter>
            <HeaderComponent />
            <Routes>
                <Route path='/' element={<LandingComponent />} />
                <Route path='/login' element={<LoginComponent />} />
                <Route path='/logout' element={<LogoutComponent />} />
                <Route path='*' element={<ErrorComponent />} />

                
                <Route element={<AuthenticatedRoute />}> 

                    <Route path='/welcome/:username' element={<WelcomeComponent />} />
                    <Route path='/sprints' element={<SprintsListComponent /> } />     
                    <Route path="/sprint/:id" element={<SprintComponent />} />

                </Route>
            </Routes>
            </BrowserRouter>
            <FooterComponent />
            </AuthProvider>
        </div>
    )
}
