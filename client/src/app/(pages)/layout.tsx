import type * as React from "react";

import { Init } from "#/components/layout/init";
import { Nav } from "#/components/layout/nav";

export default ({
    children,
}: {
    children: React.ReactNode;
}): React.JSX.Element => {
    return (
        <>
            <Init />
            <Nav />
            {children}
        </>
    );
};
