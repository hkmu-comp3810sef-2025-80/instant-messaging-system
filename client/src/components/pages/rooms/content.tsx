"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import * as React from "react";
import { toast } from "sonner";

import { Button } from "#/components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "#/components/ui/card";
import { Skeleton } from "#/components/ui/skeleton";
import { findRooms as findRoomsProcess } from "#/openapi";

const PAGE_SIZE = 30 as const;

type RoomProps = {
    id: string;
    ownerId: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
};

const Room = (props: RoomProps): React.JSX.Element => {
    const { name, description } = props;

    return (
        <Card className="p-4">
            <CardHeader className="p-0 mb-2">
                <CardTitle className="text-lg">{name}</CardTitle>
                {description ? (
                    <CardDescription>{description}</CardDescription>
                ) : null}
            </CardHeader>
        </Card>
    );
};

const Rooms = (): React.JSX.Element => {
    const findRooms = async ({ pageParam }: { pageParam?: string }) => {
        try {
            const { data, error } = await findRoomsProcess({
                query: {
                    first: PAGE_SIZE,
                    after: pageParam,
                },
            });

            if (error) {
                const err = error.errors[0];

                if (err?.code === "parse") {
                    toast.error("Invalid query");
                } else {
                    toast.error("Unknown error");
                }
                throw new Error();
            }

            const payload = data?.data ?? [];

            return payload;
        } catch (_: unknown) {
            toast.error("Unknown error");
            throw new Error();
        }
    };

    const { status, data, fetchNextPage, isFetchingNextPage, hasNextPage } =
        useInfiniteQuery({
            queryKey: [
                "rooms",
            ],
            queryFn: findRooms,
            initialPageParam: void 0,
            getNextPageParam: (lastPage): string | undefined => {
                if (lastPage.length < PAGE_SIZE) return void 0;
                const lastData = lastPage[lastPage.length - 1];
                if (!lastData) return void 0;
                return lastData.id;
            },
        });

    if (status === "pending") {
        return (
            <div>
                {Array.from({
                    length: 8,
                }).map(
                    (_, index): React.JSX.Element => (
                        <Skeleton
                            // biome-ignore lint/suspicious/noArrayIndexKey: I don't care
                            key={index}
                            className="m-4 h-32 w-auto"
                        />
                    ),
                )}
            </div>
        );
    }

    if (status === "error") {
        return <div className="text-destructive">Something went wrong!</div>;
    }

    return (
        <div className="m-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {data.pages.map(
                    (rooms, index): React.JSX.Element => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: I don't care
                        <React.Fragment key={index}>
                            {rooms.map(
                                (room): React.JSX.Element => (
                                    <Room
                                        key={room.id}
                                        {...room}
                                    />
                                ),
                            )}
                        </React.Fragment>
                    ),
                )}
            </div>

            <React.Activity mode={hasNextPage ? "visible" : "hidden"}>
                <Button
                    className="mx-auto block"
                    disabled={isFetchingNextPage}
                    onClick={(): void => {
                        fetchNextPage();
                    }}
                >
                    {isFetchingNextPage ? "Loading..." : "Load more"}
                </Button>
            </React.Activity>
        </div>
    );
};

export { Rooms };
