import { DELETEDATA, EDITDATA, SAVEDATA } from "../types/type";

const initialvalue={
    array:JSON.parse(localStorage.getItem("array")) || []
}

export const formReducer =(state=initialvalue,action)=>{
    switch (action.type) {
        case SAVEDATA:
            state.array.push(action.obj)
            localStorage.setItem("array", JSON.stringify(state.array));

            console.log(state.array);
            return state;
        case DELETEDATA:
           let index= state.array.findIndex((x)=>x.id===action.id)
           console.log(index);
           state.array.splice(index,1)
           localStorage.setItem("array", JSON.stringify(state.array));
            return {
                array:[...state.array]
            };
        case EDITDATA:
            let edit = state.array.findIndex((x) => x.id === action.id);
            state.array.splice(edit,1,action.obj)
           console.log(edit);
            return state
    
        default:
            return initialvalue;
    }
}