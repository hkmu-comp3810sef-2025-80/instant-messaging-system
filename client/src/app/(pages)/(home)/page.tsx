import Link from "next/link";

import { buttonVariants } from "#/components/ui/button";
import { cn } from "#/lib/utils";

export default (): React.JSX.Element => {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-background px-8 text-center">
            <h1 className="mb-8 text-5xl font-bold text-foreground">
                {"Welcome to Instant Messaging System!"}
            </h1>

            <div className="flex flex-wrap justify-center gap-4">
                <Link
                    href="/auth/register"
                    className={cn(
                        buttonVariants({
                            variant: "default",
                        }),
                        "font-bold bg-green-600 hover:bg-green-700 text-white dark:text-white",
                    )}
                >
                    {"Sign Up"}
                </Link>

                <Link
                    href="/rooms"
                    className={cn(
                        buttonVariants({
                            variant: "default",
                        }),
                        "font-bold bg-blue-500 hover:bg-blue-600 text-white dark:text-white",
                    )}
                >
                    {"Find Rooms"}
                </Link>
            </div>
        </div>
    );
};
