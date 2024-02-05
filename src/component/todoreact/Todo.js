import React, { useState,useEffect } from 'react'
import "./style.css"

const getLocalData = () =>
{
    const lists = localStorage.getItem("mytodolist");

    if(lists){
        return JSON.parse(lists);

    }
        else{
        return[];
    }
}
const Todo = () => {
    const [inputdata,setInputData] = useState("");
    const [items,setItems] = useState(getLocalData())
    const[isEditItem, setIsEditItem] =useState("")
    const [toggleButton, setToggleButton]= useState(false)

    const addItem =() =>{
        if(!inputdata){
            alert("plz fill the data")
        }
        else if(inputdata && toggleButton){
            setItems(
                items.map((curlElem)=>{
    if(curlElem.id===isEditItem){
        return{...curlElem,name:inputdata}

    }
    return curlElem
    //  p217
}))
setInputData("")
setIsEditItem(null)
setToggleButton(false)
        }
        
        else{
            const myNewInputData ={
                id:new Date().getTime().toString(),
                name: inputdata,
            }
            setItems([...items,  myNewInputData])
            setInputData("");
        }
    }

    const editItem =(index) => {
        const item_todo_edited = items.find((curlElem)=>
        {
            return curlElem.id===index
        })
        setInputData(item_todo_edited.name)
        setIsEditItem(index)
        setToggleButton(true)
    }
    const deleteItem = (index) => {
        const updatedItem= items.filter((curlElem) =>{
            return curlElem.id !== index;
        })
        setItems(updatedItem);
    }
    const removeAll= ()=>{
        setItems([]);
    }
    useEffect(()=>{
            localStorage.setItem("mytodolist",JSON.stringify(items));
    },[items])
  return (
    <>
      <div className='main-div'>
        {/* p217 */}
        <div className='child-div'>
            <figure>
                <img src='.\images\todo.svg' alt='todo' />
                <figcaption>
                    Add Your List Here 
                 </figcaption>
            </figure>
            <div className='addItems'>
                <input type='text' placeholder =" Add Item "
                value={inputdata} onChange={(event) =>setInputData(event.target.value )} 
                className='form-control'/>
                {
                    toggleButton ?(
                    <i className="far fa-edit add-btn " onClick={addItem}></i> 
                    ): (
                    <i className="fa fa-plus add-btn" onClick={addItem}></i> )
                }
                
            
            </div>
        
        <div className='showItems'>
            {
                items.map((curlElem, index)=>{
                    return(
                        <div className='eachItem' key={index}>
                <h3> {curlElem.name}</h3>
                <div className='todo-btn'>
                <i className="far fa-edit add-btn" onClick={() =>editItem(curlElem.id)}></i> 
                <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curlElem.id)}></i> 

                </div>

            </div>
                    )

                }
                )
            }
            
        </div>
            <div className='showItems'>
                <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                    <span>CHECK LIST  </span></button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Todo
