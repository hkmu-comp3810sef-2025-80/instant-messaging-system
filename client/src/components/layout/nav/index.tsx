import type * as React from "react";

import Link from "next/link";

import { NavThemeButton } from "#/components/layout/nav/theme";
import { NavUser } from "#/components/layout/nav/user";

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
                    <NavUser />
                    <NavThemeButton />
                </div>
            </div>
        </nav>
    );
};

export { Nav };
