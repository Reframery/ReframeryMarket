export default async function auth(headers) {
    const token = JSON.parse(localStorage.getItem('userInfo')).accessToken
    return token ? { ...headers, Authorization: `Bearer ${token}` } : headers
}
export function isAdmin(userInfo){
    return userInfo ? userInfo.role === "ADMIN" : false
}