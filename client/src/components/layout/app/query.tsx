import type * as React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient: QueryClient = new QueryClient();

const QueryProvider = ({
    children,
}: {
    children: React.ReactNode;
}): React.JSX.Element => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export { QueryProvider };
