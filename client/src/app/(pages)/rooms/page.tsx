import type * as React from "react";

import { Rooms } from "#/components/pages/rooms/content";
import { CreateRoomButton } from "#/components/pages/rooms/create";

export default (): React.JSX.Element => {
    return (
        <div className="pt-16">
            <Rooms />
            <CreateRoomButton />
        </div>
    );
};
