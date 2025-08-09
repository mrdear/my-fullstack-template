import * as React from "react";
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail} from "@/components/ui/sidebar.tsx";
import {sidebarData} from "@/components/layout/data/sidebar-data.ts";
import {NavGroup} from "@/components/layout/nav-group.tsx";
import {NavUser} from "@/components/layout/nav-user.tsx";
import { TeamSwitcher } from "../team-switcher";

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible={'icon'} variant={'floating'} {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={sidebarData.teams} />
            </SidebarHeader>

            <SidebarContent>
                {sidebarData.navGroups.map((props) => (
                    <NavGroup key={props.title} {...props}/>
                ))}
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={sidebarData.user} />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}