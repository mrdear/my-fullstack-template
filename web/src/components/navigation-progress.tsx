import {useEffect, useRef} from "react";
import LoadingBar, {type LoadingBarRef} from "react-top-loading-bar";
import {useRouterState} from "@tanstack/react-router";

export function NavigationProgress() {

    const ref = useRef<LoadingBarRef>(null);
    const state = useRouterState();

    useEffect(() => {
        if (state.status == 'pending') {
            ref.current?.continuousStart();
        } else {
            ref.current?.complete();
        }
    }, [state.status]);

    return (
        <LoadingBar color='var(--muted-foreground)' ref={ref} shadow={true} height={2}>

        </LoadingBar>
    );
}