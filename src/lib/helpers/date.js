export const toHijriDate = (date)=>{

    // way 1
    return new Date(date).toLocaleDateString("fa-IR")

    // way 2
    return Intl.DateTimeFormat("fa-IR").format(new Date(date))

    // way 3
    return Intl.DateTimeFormat("fa-IR",{
        year:"numeric",
        month:"long",
        day:"numeric"
    }).format(new Date(date))
}