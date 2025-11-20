"use client";

import type * as React from "react";

import { useInitialize } from "#/hooks/init";

const Init = (): React.JSX.Element => {
    useInitialize();
    return <>{}</>;
};

export { Init };
