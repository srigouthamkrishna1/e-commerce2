import summaryApi from "../common"

const fetchcategorywise=async(category)=>{
    const response= await fetch(summaryApi.categorywiseproduct.url,{
        method:summaryApi.categorywiseproduct.method,
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
            category:category
        })
    })
    const dataresponse=await response.json()

    return dataresponse
}

export default fetchcategorywise