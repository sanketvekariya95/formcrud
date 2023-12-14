import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { deleteredux, editredux, savedataredux } from '../redux/Action/formAction';

function FormCrud() {
    const state=useSelector((state)=>state)


    const dispatch= useDispatch();
    const [obj, setobj] = useState({hobbies:[]});
    const [blankobj, setblankobj] = useState({hobbies:[]})
    let [count, setcount] = useState(JSON.parse(localStorage.getItem("count")) || 0);

    const getdate=async(e)=>{
        if(e.target.type==='checkbox'){
            if(e.target.checked){
                obj.hobbies.push(e.target.value);
            }else{
                obj.hobbies=obj.hobbies.filter((x)=> x !== e.target.value )
            }
            blankobj.hobbies = [];   
        }else if(e.target.type==='file'){
            obj.profile= await toBase64(e.target.files[0])
        }else{

            obj[e.target.name]=e.target.value;
            blankobj[e.target.name] = "";
            // console.log(blankobj);
        }

    

       console.log(obj);
        setobj({ ...obj });
        setblankobj({ ...blankobj });
    }

    const savedata=()=>{
        if(obj.id){
            dispatch(editredux(obj,obj.id))
        }else{
            count++;
            obj.id=count;
            setcount(count);
            localStorage.setItem("count", JSON.stringify(count));
            dispatch( savedataredux(obj) );
            
            // console.log(state.array.array);
        }
        setobj({...blankobj})
       
    }
    
    const deletdata=(id)=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          dispatch(deleteredux(id))
        }
      });
    }
    
    const editdata=(id)=>{  
      
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to edit this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, edit it!"
      }).then((result) => {
        if (result.isConfirmed) {
          
          let x=state.array.array.find((x)=>x.id===id)
       
        setobj({...x})
        }
      });
      
    }

     /* profile ni anadar value code mate reducs tobBase64 */
   const toBase64 = (file) =>
   new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => resolve(reader.result);
     reader.onerror = reject;
   });

  return (
    <>
    <div>
        <form action="" className="w-50 mx-auto shadow-lg p-3">
          <label htmlFor="" className="d-block">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="w-100"
            onChange={getdate}
            value={obj?.name}
            required
          />
          <label htmlFor="" className="d-block">
            email
          </label>
          <input
            type="email"
            name="email"
            className="w-100"
            onChange={getdate}
            value={obj?.email}
          />
          <label htmlFor="" className="d-block">
            password
          </label>
          <input
            type="password"
            name="password"
            className="w-100"
            onChange={getdate}
            value={obj?.password}
          />
          <label htmlFor="" className="d-block">
            date
          </label>
          <input
            type="date"
            name="date"
            className="w-100"
            onChange={getdate}
            value={obj?.date}
          />
          <label htmlFor="" className="d-block">
            number
          </label>
          <input
            type="number"
            name="number"
            className="w-100"
            onChange={getdate}
            value={obj?.number}
          />
          <label htmlFor="" className="d-block">
            Gender
          </label>
          <input
            type="radio"
            name="gender"
            className="me-1"
            value={"male"}
            onChange={getdate}
            checked={obj.gender === "male"}
          />
            
          male
          <input
            type="radio"
            name="gender"
            className="me-1"
            value={"female"}
            onChange={getdate}
            checked={obj.gender === "female"}
          />
          female
          <label htmlFor="" className="d-block mt-2">
            Hobbies
          </label>
          <input
            type="checkbox"
            name="hobbies"
            className="ms-2"
            value={"playing"}
            onChange={getdate}
            checked={obj.hobbies.includes("playing")}
          />
          playing
          <input
            type="checkbox"
            name="hobbies"
            className="ms-2"
            value={"traveling"}
            onChange={getdate}
            checked={obj.hobbies.includes("traveling")}
          />
          traveling
          <input
            type="checkbox"
            name="hobbies"
            className="ms-2"
            value={"reading"}
            onChange={getdate}
            checked={obj.hobbies.includes("reading")}
          />
          reading
        
          <input
            type="file"
            name="profile"
            className="d-block"
            onChange={getdate}
          />
        
          <button
            className="d-block mt-3 btn btn-primary"
            type="button"
            onClick={savedata}
          >
            Save
          </button>
        </form>
  
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>id</th>
              <th>profile</th>
              <th>name</th>
              <th>email</th>
              <th>password</th>
              <th>date</th>
              <th>number</th>
              <th>gender</th>
              <th>Hobbies</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>{state.array.array.map((e,i) => {
        console.log(state.array);
        return (
          <tr key={i}>
            {/* {console.log(e)} */}
            <td>{e.id}</td>
            <td>
              <img src={e.profile} alt="" width={50} height={50} />
            </td>
            <td>{e.name}</td>
            <td>{e.email}</td>
            <td>{e.password}</td>
            <td>{e.date}</td>
            <td>{e.number}</td>
            <td>{e.gender}</td>
            <td>{e.hobbies?.join(' , ')}</td>
            <td>
              <button
                className="btn btn-primary me-1"
                onClick={() => editdata(e.id)}
              >
                edit
              </button>
              <button
                className="btn btn-danger me-1"
                onClick={() => deletdata(e.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}</tbody>
        </table>
      </div>
     
    
    </>
  )
}

export default FormCrud