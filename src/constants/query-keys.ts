export const GET_COFFEE_KEY = ["coffee"];
export const GET_SINGLE_COFFEE_KEY = (id: string) => [...GET_COFFEE_KEY, id];

export const GET_USERS_KEY = ["users"];
export const GET_AUTHENTICATED_USERS_KEY = ["users", "authenticated"];
export const GET_SINGLE_USER_KEY = (id: string) => [...GET_USERS_KEY, id];
