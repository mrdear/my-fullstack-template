import {createFileRoute} from "@tanstack/react-router";
import App from "@/features/dashboard/App.tsx";

export const Route = createFileRoute("/_authenticated/")({
    component: App,
})