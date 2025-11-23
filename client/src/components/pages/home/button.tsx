"use client";

import type * as React from "react";

import Link from "next/link";

import { buttonVariants } from "#/components/ui/button";
import { cn } from "#/lib/utils";
import { useUserStore } from "#/stores/user";

const HomeMainButton = (): React.JSX.Element => {
    const { id, name } = useUserStore();

    if (id && name) {
        return (
            <>
                <Link
                    href="/rooms/create"
                    className={cn(
                        buttonVariants({
                            variant: "default",
                            size: "lg",
                        }),
                        "font-bold bg-blue-500 hover:bg-blue-600 text-white dark:text-white",
                    )}
                >
                    {"Create Room"}
                </Link>
                <Link
                    href="/rooms"
                    className={cn(
                        buttonVariants({
                            variant: "secondary",
                            size: "lg",
                        }),
                        "font-bold",
                    )}
                >
                    {"Find Rooms"}
                </Link>
            </>
        );
    }

    return (
        <Link
            href="/auth/login"
            className={cn(
                buttonVariants({
                    variant: "default",
                    size: "lg",
                }),
                "font-bold",
            )}
        >
            {"Get Started"}
        </Link>
    );
};

export { HomeMainButton };
