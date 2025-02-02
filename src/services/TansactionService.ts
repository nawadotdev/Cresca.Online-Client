export const getTransactions = async (token: string) => {

    const response = await fetch("/api/transaction",{
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

export const deposit = async (token: string, depositToken: string) => {
    const response = await fetch("/api/transaction",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({depositToken})
    })

    if(response.status === 401){
        throw new Error("Yetkisiz işlem")
    }else if(response.status === 500){
        throw new Error("Sunucu hatası oluştu")
    }

    return await response.json()

}