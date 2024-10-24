import { useEffect, useState } from "react"
import { MoonIcon } from "@heroicons/react/20/solid"

export default function ThemeToggle() {

    const [darkMode, setDarkMode] = useState(true)

    useEffect(() => {
        const theme = localStorage.getItem("theme")
        if (theme === 'dark') {
            setDarkMode(true)
        }
    },[])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem("theme", "light")
        }
    }, [darkMode])

  return (
    <div className="inline-flex w-16 h-8 items-center text-slate-700 dark:text-yellow-300 py-10 cursor-pointer rounded-full p-1"
    onClick={() => setDarkMode(!darkMode)}>
        <MoonIcon />
    </div>
  )
}
