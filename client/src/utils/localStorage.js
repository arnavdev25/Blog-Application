export const saveData = (key,data)=>{
    localStorage.setItem(key,JSON.stringify(data))
}

export const loadData = (key)=>{
    try {
        let data = JSON.parse(localStorage.getItem(key));        
        return data
    } catch (error) {
        return undefined
    }
}