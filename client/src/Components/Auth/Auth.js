import Cookies,{CookieSetOptions,CookieGetOptions} from 'universal-cookie'
const cookies = new Cookies()

export const setCookies=(name,value)=>{
    cookies.set(name,value,{path:'/'})
}

export const getcookies=(name)=>{
    console.log(cookies.get(name))
    
}

export const removeCookies=(name)=>{
    cookies.set(name,'',{path:'/'})
}