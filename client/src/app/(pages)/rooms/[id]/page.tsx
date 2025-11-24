import type * as React from "react";

import { Chat } from "#/components/pages/room/chat";
import { RoomInfo } from "#/components/pages/room/info";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async ({ params }: PageProps): Promise<React.JSX.Element> => {
    const { id } = await params;

    return (
        <div className="pt-17 mx-auto max-w-6xl">
            <div className="h-[calc(100vh-(var(--spacing)*17))] flex gap-6 p-6">
                {/* Info Panel */}
                <div className="w-64 shrink-0 border rounded-lg p-4 flex flex-col gap-4">
                    <RoomInfo id={id} />
                </div>

                {/* Chat Panel */}
                <Chat id={id} />
            </div>
        </div>
    );
};
