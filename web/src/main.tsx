import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createRouter, RouterProvider} from '@tanstack/react-router'

// Generated Routes
import {routeTree} from './routeTree.gen'
import {ThemeProvider} from "@/context/theme-context.tsx";

// Create a new router instance
const router = createRouter({
    routeTree,
    context: { },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <ThemeProvider defaultTheme="system" storageKey={'setting-theme'}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </StrictMode>
    )
}
