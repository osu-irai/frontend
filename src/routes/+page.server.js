export function load( { cookies }) {
    return {
        token: cookies.get(".AspNetCore.InternalCookies")
    };
}