import Link from "next/link";

import { buttonVariants } from "#/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "#/components/ui/tooltip";
import { cn } from "#/lib/utils";

const CreateRoomButton = (): React.JSX.Element => {
    return (
        <Tooltip delayDuration={1000}>
            <TooltipTrigger asChild>
                <Link
                    href="/rooms/create"
                    className={cn(
                        buttonVariants({
                            variant: "outline",
                        }),
                        "fixed bottom-8 right-8 h-12 w-12 rounded-full shadow-lg",
                        "flex items-center justify-center text-xl",
                        "p-0 leading-none",
                    )}
                >
                    {"+"}
                </Link>
            </TooltipTrigger>
            <TooltipContent>
                <p>{"Create Room"}</p>
            </TooltipContent>
        </Tooltip>
    );
};

export { CreateRoomButton };
