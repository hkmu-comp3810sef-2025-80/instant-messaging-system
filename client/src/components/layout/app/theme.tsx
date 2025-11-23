import type * as React from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeProvider = ({
    children,
}: {
    children: React.ReactNode;
}): React.JSX.Element => {
    return (
        <NextThemesProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </NextThemesProvider>
    );
};

export { ThemeProvider };
