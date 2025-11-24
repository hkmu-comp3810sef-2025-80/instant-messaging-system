/**
 * In this page, the data should be `x[][]`,
 * first array is the pages, second array is the messages in each page,
 * both array include the pages data from oldest to latest.
 */

"use client";

import type { QueryClient } from "@tanstack/react-query";

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { toast } from "sonner";

import { Message } from "#/components/pages/room/chat/messages/message";
import { findMessages } from "#/openapi";

const PAGE_SIZE = 30 as const;

type RoomMessagesProps = {
    // room id
    id: string;
    lockPos: boolean;
    scrollArea: React.RefObject<HTMLDivElement | null>;
};

const RoomMessages = (props: RoomMessagesProps): React.JSX.Element => {
    const client: QueryClient = useQueryClient();

    const fetchPrevious = async ({ pageParam }: { pageParam?: string }) => {
        const { data, error } = await findMessages({
            credentials: "include",
            query: {
                roomId: props.id,
                last: PAGE_SIZE,
                before: pageParam,
            },
        });

        if (error) {
            const err = error.errors[0];

            if (!err) {
                toast.error("Unknown error");
                throw new Error();
            }

            switch (err.code) {
                case "parse":
                    toast.error("Invalid input");
                    break;
                default:
                    toast.error("Unknown error");
                    break;
            }

            throw new Error();
        }

        return data.data;
    };

    const { data } = useInfiniteQuery({
        queryKey: [
            "messages",
            props.id,
        ],
        queryFn: fetchPrevious,
        initialPageParam: void 0,
        getNextPageParam: (lastPage): string | undefined => {
            if (lastPage.length < PAGE_SIZE) return void 0;
            const lastData = lastPage[lastPage.length - 1];
            if (!lastData) return void 0;
            return lastData.id;
        },
    });

    const fetchLatest = React.useCallback(
        ({ after }: { after?: string }): void => {
            const fn = async ({ after }: { after?: string }): Promise<void> => {
                const { data, error } = await findMessages({
                    credentials: "include",
                    query: {
                        roomId: props.id,
                        first: PAGE_SIZE,
                        after,
                    },
                });

                if (error) {
                    const err = error.errors[0];

                    if (!err) {
                        toast.error("Unknown error");
                        throw new Error();
                    }

                    switch (err.code) {
                        case "parse":
                            toast.error("Invalid input");
                            break;
                        default:
                            toast.error("Unknown error");
                            break;
                    }

                    throw new Error();
                }

                const newMessages = data.data;

                if (newMessages.length === 0) return void 0;

                client.setQueriesData(
                    {
                        queryKey: [
                            "messages",
                            props.id,
                        ],
                    },
                    (
                        old:
                            | {
                                  pages: Array<Array<any>>;
                                  pageParams: Array<any>;
                              }
                            | undefined,
                    ) => {
                        if (!old) {
                            return {
                                pages: [
                                    newMessages,
                                ],
                                pageParams: [
                                    void 0,
                                ],
                            };
                        }

                        return {
                            ...old,
                            pages: [
                                ...old.pages,
                                newMessages,
                            ],
                        };
                    },
                );
            };

            fn({
                after,
            });
        },
        [
            props.id,
            client.setQueriesData,
        ],
    );

    React.useEffect((): (() => void) => {
        const interval = setInterval((): void => {
            const pages = data?.pages;
            if (!pages || pages.length === 0) return void 0;

            const lastPage = pages[pages.length - 1];
            if (!lastPage) return void 0;
            const lastMessage = lastPage[lastPage.length - 1];
            if (!lastMessage) return void 0;

            fetchLatest({
                after: lastMessage.id,
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [
        data,
        fetchLatest,
    ]);

    // scroll to bottom if new data and lock pos at bottom
    React.useEffect((): (() => void) => {
        if (!props.lockPos) return (): void => void 0;

        if (!data) return (): void => void 0;

        const scrollArea: HTMLDivElement | null = props.scrollArea.current;

        if (!scrollArea) return (): void => void 0;

        const timout: NodeJS.Timeout = setTimeout((): void => {
            scrollArea.scrollTo({
                top: scrollArea.scrollHeight,
                behavior: "smooth",
            });
        }, 100);

        return (): void => {
            clearTimeout(timout);
        };
    }, [
        props.lockPos,
        data,
        props.scrollArea.current,
    ]);

    return (
        <>
            {data?.pages.map(
                (messages, index): React.JSX.Element => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: I don't care
                    <React.Fragment key={index}>
                        {messages.map(
                            (message): React.JSX.Element => (
                                <Message
                                    key={message.id}
                                    {...message}
                                />
                            ),
                        )}
                    </React.Fragment>
                ),
            )}
        </>
    );
};

export type { RoomMessagesProps };
export { RoomMessages };
