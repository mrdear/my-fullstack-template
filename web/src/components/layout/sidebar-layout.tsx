import Cookies from 'js-cookie'
import { Outlet } from '@tanstack/react-router'
import { cn } from '@/lib/utils.ts'
import { SidebarProvider } from '@/components/ui/sidebar.tsx'
import { AppSidebar } from '@/components/layout/app-sidebar.tsx'
import { Header } from '@/components/layout/header.tsx'
import { ThemeSwitch } from '@/components/theme-switch.tsx'

interface Props {
  children?: React.ReactNode
}

export function SidebarLayout({ children }: Props) {
  const defaultOpen = Cookies.get('sidebar-open') !== 'false'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />

      {/*下一层路由*/}
      <div
        id='content'
        className={cn(
          'ml-auto w-full max-w-full',
          'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
          'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
          'sm:transition-[width] sm:duration-200 sm:ease-linear',
          'flex h-svh flex-col',
          'group-data-[scroll-locked=1]/body:h-full',
          'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
        )}
      >
        {/*固定header*/}
        <Header className={'w-full'}>
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
          </div>
        </Header>

        {children ? children : <Outlet />}
      </div>
    </SidebarProvider>
  )
}
