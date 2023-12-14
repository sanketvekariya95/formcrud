import { DELETEDATA, EDITDATA, SAVEDATA } from "../types/type";

export const savedataredux=(obj)=>{
    console.log(obj);
      
    return (dispatch)=>{
        dispatch({type:SAVEDATA,obj:obj})
    }

}
export const deleteredux=(id)=>{
    console.log(id);
      
    return (dispatch)=>{
        dispatch({type:DELETEDATA,id:id})
    }

}
export const editredux=(obj,id)=>{
    console.log(obj);
      
    return (dispatch)=>{
        dispatch({type:EDITDATA,obj:obj, id:id})
    }
    
}