import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom'
import Landing from '../../pages/Landing'
import Login from '../../pages/Login'
import Footer from '../pages/landing/Footer';
import Header from '../pages/landing/Header'
import useAuthStore from '../../stores/AuthStore';
import NavigationManager from '../../services/NavigationManager';
import PopupAlert from './PopupAlert';
import Register from '../../pages/Register';
import RecoverPass from '../../pages/RecoverPass';
import PrivacyPolicy from '../../pages/PrivacyPolicy';
import ProtectedRoute from './ProtectedRoute';
import Layout from './Layout';
import Home from '../../pages/Home';
import Insights from '../../pages/Insights';
import Workout from '../../pages/Workout';
import MentalHealth from '../../pages/MentalHealth';
import Nutrition from '../../pages/Nutrition';
import Profile from '../../pages/Profile';
import Settings from '../../pages/Settings';
import Survey from '../../pages/Survey';
import Notifications from '../../pages/Notifications';
import Redirect from '../../pages/Redirect';


function LayoutLanding() {

    const [transition, setTransition] = useState("") 
    const user: any = useAuthStore(state => state)

    function handleLogin()
    {
        setTransition("animate");
        setTimeout(() => {
            if(user.user)
            {
                NavigationManager.navigateTo("/dashboard", "", { login: true });
            }
        }, 1000);
    }

    return (
        <HashRouter>
            <div className="relative w-full">
                <div className="relative">
                    <Routes>
                        <Route element={<PopupAlert />}>
                            <Route path="/" element={
                                <>
                                    <Header setTransition={handleLogin} >
                                        <Login transition={transition} />
                                        <Landing setTransition={setTransition} />
                                    </Header>
                                    <Footer setTransition={handleLogin} />
                                </>
                            } />
                            <Route path="/login/:message?" element={
                                <>
                                    <Login transition='expand-animate' />
                                </>
                            } />
                            <Route path="/register" element={<Register />} />
                            <Route path="/recover" element={<RecoverPass />} />
                            <Route path="/restore" element={<Redirect />} />
                            <Route path="/privacy-policy" element={
                                <>
                                    <Header setTransition={handleLogin}>
                                        <PrivacyPolicy />
                                    </Header>
                                    <Footer setTransition={handleLogin} />
                                </>
                            } />
                        </Route>
                    </Routes>
                    <Routes>
                        <Route path="/" element={<ProtectedRoute />}>
                            <Route element={<PopupAlert />}>
                                <Route element={<Layout />}>
                                    <Route path="/dashboard" element={<Home />} />
                                    <Route path="/insights" element={<Insights />} />
                                    <Route path="/workout" element={<Workout />} />
                                    <Route path="/mental-health" element={<MentalHealth />} />
                                    <Route path="/nutrition" element={<Nutrition />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/notifications" element={<Notifications />} />
                                    <Route path="/settings" element={<Settings />} />
                                </Route>
                                <Route path="/survey" element={<Survey />} />
                            </Route>
                        </Route>
                    </Routes>
                </div>
            </div>
        </HashRouter>
    )
}

export default LayoutLanding