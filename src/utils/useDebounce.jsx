import { useState, useEffect } from "react";
export const useDebounce = (val, delay)=>{
    const [value, setValue] = useState(val)
    useEffect(()=>{
      const handler = setTimeout(() => {
          setValue(val)
      }, delay);
  
      return ()=>{
        clearTimeout(handler)
      }
  },[val, delay])
  
    return value
  }