import type * as React from "react";

import { AppProvider } from "#/components/layout/app";
import { Init } from "#/components/layout/init";
import { Nav } from "#/components/layout/nav";
import { Toaster } from "#/components/ui/sonner";

export default ({
    children,
}: {
    children: React.ReactNode;
}): React.JSX.Element => {
    return (
        <AppProvider>
            <Init />
            <Nav />
            {children}
            <Toaster
                richColors
                position="bottom-center"
                toastOptions={{
                    style: {
                        padding: 8,
                    },
                }}
            />
        </AppProvider>
    );
};
