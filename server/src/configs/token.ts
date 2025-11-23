const REFRESH_NAME = "ims_rf" as const;

const REFRESH_EXP: number = 1000 * 60 * 60 * 24 * 365;

const ACCESS_NAME = "ims_ac" as const;

const ACCESS_EXP: number = 1000 * 60 * 15;

export { REFRESH_NAME, REFRESH_EXP, ACCESS_NAME, ACCESS_EXP };
