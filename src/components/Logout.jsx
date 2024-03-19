import httpClient from "./HttpsClient"

const Logout = async () => {
    try {
        const backend_url = import.meta.env.VITE_BACKEND_API_URL
        const url = backend_url + `/api/logout`
        const response = await httpClient.post(url)
        
        if (response.status == 201 || response.status == 200) {
            window.location.href = "/landing" 
        }

    } catch (error) {
        console.log(error)
    }
}

export default Logout;