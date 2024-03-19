import httpClient from "../../components/HttpsClient"

const RemoveItemStore = async(item_id) => {
    console.log("--->> " + item_id)
    const backend_url = import.meta.env.VITE_BACKEND_API_URL
    let url = backend_url + `/api/deleteitem/${item_id}`

    try{
        let response = await httpClient.delete(url)
        console.log(response.data.message)
    }catch(error) {
        console.log(error)
    }
}

const removeImgCloudinary = async() => {
    const cloudinary = import.meta.env.VITE_CLOUDINARY_URL
    console.log(cloudinary)
    await cloudinary.uploader.destroy('Cloudinary-React/gnsvwkziznb3e8mfjoit')
}

export default RemoveItemStore;