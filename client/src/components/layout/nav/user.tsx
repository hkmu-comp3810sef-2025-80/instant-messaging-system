"use client";

import type * as React from "react";

import Link from "next/link";

import { buttonVariants } from "#/components/ui/button";
import { cn } from "#/lib/utils";
import { useUserStore } from "#/stores/user";

const NavUser = (): React.JSX.Element => {
    const { id, name } = useUserStore();

    if (id && name) {
        return <>{`Welcome, ${name}!`}</>;
    }

    return (
        <>
            <Link
                href="/auth/login"
                className={cn(
                    buttonVariants({
                        variant: "ghost",
                    }),
                )}
            >
                {"Sign In"}
            </Link>

            <Link
                href="/auth/register"
                className={cn(
                    buttonVariants({
                        variant: "ghost",
                    }),
                )}
            >
                {"Sign Up"}
            </Link>
        </>
    );
};

export { NavUser };
