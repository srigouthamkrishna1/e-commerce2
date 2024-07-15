import Compressor from 'compress.js';

const compressImage = async (file) => {
    const compress = new Compressor();
    const compressedFile = await compress.compress(file, {
        quality: 0.6,  // Adjust quality to reduce the image size
        maxWidth: 800, // Set maximum width to reduce the dimensions
    });
    return compressedFile;
};


const imagetobase64=async (image)=>{
    const reader=new FileReader();
    reader.readAsDataURL(image);

    const data= await new Promise((resolve,reject)=>{
        reader.onload=()=>resolve(reader.result)

        reader.onerror=(error)=>reject(error)
    })
    return data;

};

export default imagetobase64