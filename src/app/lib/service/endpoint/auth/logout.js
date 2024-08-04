import instance from '../../instance/instance';

export default async function logout() {
    try {
        // Assuming there's an endpoint to invalidate the token on the server
        await instance.post('auth/logout');

        // Remove the token from cookies
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

        // Remove the token from local storage
        localStorage.removeItem('token');
    } catch (error) {
        console.error('Failed to logout:', error);
        throw error;
    }
}
