import { verify } from "hono/jwt";

import { REFRESH_SECRET } from "#/constants";

type RefreshTokenPayload = {
    id: string;
    name: string;
    iat: number;
    exp: number;
};

const verifyRefreshToken = async (refresh: string | undefined) => {
    try {
        if (!refresh) return void 0;

        const result: RefreshTokenPayload = (await verify(
            refresh,
            REFRESH_SECRET,
        )) as RefreshTokenPayload;

        return result;
    } catch (err: unknown) {
        console.log({ err });
        return void 0;
    }
};

export type { RefreshTokenPayload };
export { verifyRefreshToken };
