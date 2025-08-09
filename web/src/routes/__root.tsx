import {createRootRoute, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'
import NotFoundError from "../features/errors/not-found-error.tsx";
import GeneralError from "../features/errors/generalError.tsx";
import {Toaster} from "../components/ui/sonner.tsx";
import {NavigationProgress} from "../components/navigation-progress.tsx";

export const Route = createRootRoute({
    component: () => (
        <>
            <NavigationProgress/>
            <Outlet/>
            <Toaster duration={5000}/>
            {import.meta.env.MODE === 'development' && (
                <>
                    <TanStackRouterDevtools position='bottom-right'/>
                </>
            )}
        </>
    ),
    notFoundComponent: NotFoundError,
    errorComponent: GeneralError
})