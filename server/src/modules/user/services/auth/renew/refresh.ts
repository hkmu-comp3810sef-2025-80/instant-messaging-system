import type { RefreshTokenPayload } from "#/utils/jwt-verify/refresh";

import { sign } from "hono/jwt";

import { ACCESS_EXP, REFRESH_EXP } from "#/configs/token";
import { ACCESS_SECRET, REFRESH_SECRET } from "#/constants";
import { verifyRefreshToken } from "#/utils/jwt-verify/refresh";
import { ServiceError } from "#/utils/service-error";

enum ServiceUserRenewRefreshErrorCode {
    INVALID = "invalid",
}

enum ServiceUserRenewRefreshErrorMessage {
    INVALID = "Invalid refresh token",
}

const getLoginErrorMessage = (
    code: ServiceUserRenewRefreshErrorCode,
): ServiceUserRenewRefreshErrorMessage => {
    switch (code) {
        case ServiceUserRenewRefreshErrorCode.INVALID:
            return ServiceUserRenewRefreshErrorMessage.INVALID;
    }
};

type ServiceUserRenewRefreshOptions = {
    refresh?: string;
};

type ServiceUserRenewRefreshResult = {
    id: string;
    name: string;
    refresh: string;
    access: string;
};

const serviceUserRenewRefresh = async (
    options: ServiceUserRenewRefreshOptions,
): Promise<ServiceUserRenewRefreshResult> => {
    const payload: RefreshTokenPayload | undefined = await verifyRefreshToken(
        options.refresh,
    );

    if (!payload) {
        const code: ServiceUserRenewRefreshErrorCode =
            ServiceUserRenewRefreshErrorCode.INVALID;

        throw new ServiceError(code)
            .setStatus(401)
            .setMessage(getLoginErrorMessage(code));
    }

    const newPayload = {
        id: payload.id,
        name: payload.name,
        iat: Date.now() / 1000,
    } as const;

    const refresh: string = await sign(
        {
            ...newPayload,
            exp: (Date.now() + REFRESH_EXP) / 1000,
        },
        REFRESH_SECRET,
    );

    const access: string = await sign(
        {
            ...newPayload,
            exp: (Date.now() + ACCESS_EXP) / 1000,
        },
        ACCESS_SECRET,
    );

    return {
        id: payload.id,
        name: payload.name,
        refresh,
        access,
    };
};

export type { ServiceUserRenewRefreshOptions, ServiceUserRenewRefreshResult };
export {
    ServiceUserRenewRefreshErrorCode,
    ServiceUserRenewRefreshErrorMessage,
    serviceUserRenewRefresh,
};
