export const getMe = async (token: string) => {

    const response = await fetch("/api/user",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })

    if(response.status === 401){
        throw new Error("Yetkisiz işlem")
    }else if(response.status === 500){
        throw new Error("Sunucu hatası oluştu")
    }

    return await response.json()



}