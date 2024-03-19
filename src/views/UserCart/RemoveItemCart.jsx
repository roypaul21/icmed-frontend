import httpClient from "../../components/HttpsClient"

const RemoveItemCart = async(item_id) => {
    console.log("--->> " + item_id)
    const backend_url = import.meta.env.VITE_BACKEND_API_URL
    let url = backend_url + `/api/removeitemcart/${item_id}`

    try{
        let response = await httpClient.delete(url)
        console.log(response.data.message)
    }catch(error) {
        console.log(error)
    }
}

export default RemoveItemCart;