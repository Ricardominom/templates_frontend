import { Link, Navigate, Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Logo from "@/components/Logo"
import NavMenu from "@/components/NavMenu"
import { useAuth } from "@/hooks/useAuth"
import ThemeToggle from "@/components/ThemeToggle"

export default function AppLayout() {

    const { data, isError, isLoading } = useAuth()

    if(isLoading) return 'Loading'
    if(isError) {
        return <Navigate to='/auth/login' />
    }
  if(data) return (
    <>
        <header className="bg-fuchsia-200 dark:bg-gray-700 py-5">
            <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                <div className="w-64">
                    <Link to={'/'}>
                        <Logo />
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-between">
                    <ThemeToggle />

                    <NavMenu
                          name={data.name} 
                          canEdit={true}
                    />  
                </div>
            </div>
        </header>

        <section className="max-w-screen-2xl mx-auto mt-10 p-5">
            <Outlet />

        </section>

        <footer className="py-5">
            <p className="text-center">
                Itransition Project {new Date().getFullYear()}
            </p>
        </footer>

        <ToastContainer 
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />
    
    </>
  )
}
