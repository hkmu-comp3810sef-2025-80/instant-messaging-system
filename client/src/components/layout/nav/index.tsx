import type * as React from "react";

import Link from "next/link";

import { NavThemeButton } from "#/components/layout/nav/theme";
import { buttonVariants } from "#/components/ui/button";
import { cn } from "#/lib/utils";

const Nav = (): React.JSX.Element => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold"
                >
                    <span className="text-2xl">💬</span>

                    {/* Hide title on mobile, show from md+ */}
                    <span className="hidden md:inline text-xl">
                        Instant Messaging System
                    </span>
                </Link>

                <div className="flex items-center gap-4">
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

                    <NavThemeButton />
                </div>
            </div>
        </nav>
    );
};

export { Nav };
