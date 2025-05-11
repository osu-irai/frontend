export function load( { cookies }) {
    return {
        token: cookies.get("osuToken")
    };
}