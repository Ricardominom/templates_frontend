import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "@/layouts/AppLayout"
import DashboardView from "@/views/DashboardView"
import CreateTemplateView from "./views/templates/CreateTemplateView"
import EditTemplateView from "./views/templates/EditTemplateView"
import TemplateDetailsView from "./views/templates/TemplateDetailsView"
import AuthLayout from "./layouts/AuthLayout"
import LoginView from "./views/auth/LoginView"
import RegisterView from "./views/auth/RegisterView"
import ConfirmAccountView from "./views/auth/ConfirmAccountView"
import RequestNewCodeView from "./views/auth/RequestNewCodeView"
import ForgotPasswordView from "./views/auth/ForgotPasswordView"
import NewPasswordView from "./views/auth/NewPasswordView"
import TemplateTeamView from "./views/templates/TemplateTeamView"
import ProfileView from "./views/profile/ProfileView"
import ChangePasswordView from "./views/profile/ChangePasswordView"
import ProfileLayout from "./layouts/ProfileLayout"
import NotFound from "./views/404/NotFound"

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<DashboardView />} index />
                    <Route path='/templates/create' element={<CreateTemplateView />} />
                    <Route path='/templates/:templateId' element={<TemplateDetailsView />} />
                    <Route path='/templates/:templateId/edit' element={<EditTemplateView />} />
                    <Route path='/templates/:templateId/team' element={<TemplateTeamView />} />

                    <Route element={<ProfileLayout />}>
                        <Route path='/profile' element={<ProfileView />} />
                        <Route path='/profile/password' element={<ChangePasswordView />} />
                    </Route>

                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<LoginView />} />
                    <Route path='/auth/register' element={<RegisterView />} />
                    <Route path='/auth/confirm-account' element={<ConfirmAccountView />} />
                    <Route path='/auth/request-code' element={<RequestNewCodeView />} />
                    <Route path='/auth/forgot-password' element={<ForgotPasswordView />} />
                    <Route path='/auth/new-password' element={<NewPasswordView />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}