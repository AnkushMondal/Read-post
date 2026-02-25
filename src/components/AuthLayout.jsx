import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function ProtectedLayout({children ,authentication=true}) {
    const navigate = useNavigate()
    const [loader, setloader] = useState(true);
    //login or not --from auth state
    const authStatus = useSelector((state) => state.auth);
    useEffect(() => {
        //easy way to check authentication and navigate accordingly-
        // if(authStatus==true){
        //     navigate("/");
        // }else if(authStatus==false){
        //     navigate("/login");
        // }else{
        //     setloader(false);
        // }

        //better way to check authentication and navigate accordingly-
        
        //if authentication is true and user is not authenticated then navigate to login page
        //let authValue = authStatus === true?true:false;
        if (authentication &&authStatus !== authentication) {
            navigate("/login");
            //if authentication is false and user is authenticated then navigate to home page
        } else if (!authentication && authStatus !== authentication) {
            navigate("/");
        } else {
            setloader(false);
        }

    }, [authStatus,navigate,authentication]);
  return loader ? <div>Loading...</div> : <>{children}</>;
    
    
  
}


