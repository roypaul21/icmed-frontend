import { useContext, useState } from 'react';
import {Navigate} from "react-router-dom";
import { SessionContext } from "../../components/SessionContext"
import httpClient from "../../components/HttpsClient"


export default function AddItem(){
    const {sessionToken, authorization} = useContext(SessionContext)
    if (!authorization) {
        return <Navigate to="/store" />
    }

    const [itemName, setItemName] = useState("")
    const [itemPrice, setItemPrice] = useState("")
    const [itemWidth, setItemWidth] = useState("")
    const [itemHeight, setItemHeight] = useState("")
    const [itemQuantity, setItemQuantity] = useState("")
    const [itemDesc, setItemDesc] = useState("")

    const [itemImg1, setItemImg1] = useState(null)
    const [itemImg2, setItemImg2] = useState(null)
    const [itemImg3, setItemImg3] = useState(null)
    const [itemImg4, setItemImg4] = useState(null)

    const [imgUrl1, setImgUrl1] = useState(null)
    const [imgUrl2, setImgUrl2] = useState(null)
    const [imgUrl3, setImgUrl3] = useState(null)
    const [imgUrl4, setImgUrl4] = useState(null)
    

    const onSubmit = async(e) => {
        e.preventDefault()

        const data = {
            itemName, itemPrice,
            itemWidth, itemHeight,
            itemQuantity, itemDesc,
            imgUrl1, imgUrl2,
            imgUrl3, imgUrl4
        }
        
        const backend_url = import.meta.env.VITE_BACKEND_API_URL
        const url = backend_url + "/api/additem"

        await httpClient.post(url, data).then(response => {
            alert(response.data.message)
        })
        .catch(error => {
            alert(error.response.data.message)
        });
    }

    const handleImageOne = (e) => {
        const img = e.target.files[0];
        setItemImg1(img);
    }

    const handleImageTwo = (e) => {
        const img = e.target.files[0];
        setItemImg2(img);
    }

    const handleImageThree = (e) => {
        const img = e.target.files[0];
        setItemImg3(img);
    }

    const handleImageFour = (e) => {
        const img = e.target.files[0];
        setItemImg4(img);
    }

    const uploadImageCloud = async(e) => {
        e.preventDefault()

        const setImgArray = [setImgUrl1, setImgUrl2, setImgUrl3, setImgUrl4]
        const imgArray = [itemImg1, itemImg2, itemImg3, itemImg4]
        let i = 0
        for (const imgItem of imgArray) {
            const dataimg = new FormData();
            dataimg.append("file", imgItem);
            dataimg.append( "upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
            dataimg.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
            dataimg.append("folder", "Cloudinary-React");
            dataimg.append("width", "800");
            dataimg.append("height", "800"); 

            const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`

            try {
                const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`
                const response = await fetch(url,{
                    method: "POST",
                    body: dataimg,
                })

                const data = await response.json();
                console.log(setImgArray[i])
                setImgArray[i](data.public_id)
                i = i + 1

            } catch (error) {
                console.log(error)
            }
        }
    }
    
    return (
        <section className="add-item-section">
            <h1>ADD ITEM</h1>
            <div className='add-item-container'>
                <form className='item-add-info' onSubmit={onSubmit}>
                    <div>
                        <label htmlFor='item-name'>Item Name</label>
                        <input type='text' id='item-name'
                        value={itemName} 
                        onChange={(e) => setItemName(e.target.value)} 
                        required/>
                    </div>
                    <div>
                        <label htmlFor='item-price'>Item Price</label>
                        <input type='text' id='item-price' 
                        value={itemPrice} 
                        onChange={(e) => setItemPrice(e.target.value)} 
                        required/>
                    </div>
                    <div>
                        <label htmlFor='item-width'>Item Width</label>
                        <input type='text' id='item-width' 
                        value={itemWidth} 
                        onChange={(e) => setItemWidth(e.target.value)} 
                        required/>
                    </div><div>
                        <label htmlFor='item-height'>Item Height</label>
                        <input type='text' id='item-height' 
                        value={itemHeight} 
                        onChange={(e) => setItemHeight(e.target.value)} 
                        required/>
                    </div>
                    <div>
                        <label htmlFor='item-quantity'>Item Quantity</label>
                        <input type='text' id='item-quantity' 
                        value={itemQuantity} 
                        onChange={(e) => setItemQuantity(e.target.value)} 
                        required/>
                    </div>
                    <div>
                        <label htmlFor='item-desc'>Item Short Description</label>
                        <textarea type='text' id='item-desc' 
                        value={itemDesc} 
                        onChange={(e) => setItemDesc(e.target.value)} 
                        required/>
                    </div>
                    <div>
                        <button>Submit</button>
                    </div>
                </form>
                <form className='item-add-img' onSubmit={uploadImageCloud}>
                    <div>
                        <div>
                            <input type="file" id="movie-img" 
                            accept="image/*"
                            onChange={handleImageOne}
                            required/>
                            <div>
                                <img src={`${import.meta.env.VITE_CLOUDINARY_IMAGE_URL}${imgUrl1}`}/>
                            </div>
                        </div>
                        <div>
                            <input type="file" id="movie-img" 
                            accept="image/*"
                            onChange={handleImageTwo}
                            required/>
                            <div>
                                <img src={`${import.meta.env.VITE_CLOUDINARY_IMAGE_URL}${imgUrl2}`}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <input type="file" id="movie-img" 
                            accept="image/*"
                            onChange={handleImageThree}
                            required/>
                            <div>
                                <img src={`${import.meta.env.VITE_CLOUDINARY_IMAGE_URL}${imgUrl3}`}/>
                            </div>
                        </div>
                        <div>   
                            <input type="file" id="movie-img" 
                            accept="image/*"
                            onChange={handleImageFour}
                            required/>
                            <div>
                                <img src={`${import.meta.env.VITE_CLOUDINARY_IMAGE_URL}${imgUrl4}`}/>
                            </div>
                        </div>  
                    </div>
                    <div>
                        <button>Upload Image</button>
                    </div>
                </form>
            </div>
        </section>
    )
}