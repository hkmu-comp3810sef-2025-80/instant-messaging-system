"use client";

import type * as React from "react";

import { QueryProvider } from "#/components/layout/app/query";
import { ThemeProvider } from "#/components/layout/app/theme";

const AppProvider = ({
    children,
}: {
    children: React.ReactNode;
}): React.JSX.Element => {
    return (
        <>
            {/* shadcn theme */}
            <ThemeProvider>
                {/* react query */}
                <QueryProvider>
                    {/* content */}
                    {children}
                </QueryProvider>
            </ThemeProvider>
        </>
    );
};

export { AppProvider };
