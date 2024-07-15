const url = `https://api.cloudinary.com/v1_1/dq9gv7phf/image/upload`

const uploadimage  = async(image) => {
    const formData = new FormData()
    formData.append("file",image)
    formData.append("upload_preset","mern_ecommerce")
    

    const dataResponse = await fetch(url,{
        method : "post",
        body : formData
    })

    return dataResponse.json()

}

export default uploadimage 