export default async (request) => {
    new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log("start")
            return resolve(request);
        }, 3000);
    })
}