import React, {useState} from 'react'
import '../App.css';
import { Modal, Button } from "react-bootstrap";


function TodoApp() {

    const [inputData, setInputData] = useState('');
    const [item, setItem] = useState([]);
    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState('');
    const [toggle, setToggle] = useState(true)
    const [editTodo, setEditTodo] = useState(null)


    // modal function
    const handleClose = (e) => {
        e.preventDefault()
         setShow(false);
         if(update && !toggle){
             setItem(
                 item.map(elem=>{
                 if(elem.id === editTodo){
                  return {...elem, name:update};
                 }
                 return elem;
             })
         )}
    }
    const handleShow = () => {
        return setShow(true);
    }

    //  Add an item
    const addItem = () => {
        if(!inputData){
            alert('Please Enter list items')
        } else {
            const allInputData = {id: new Date().getTime().toString(), name: inputData}
            setItem([...item, allInputData]) 
            setInputData('')
        } 
    }

    // Delete an item
    const deleteItem = (index) => {
        const updatedItems = item.filter(element => {
            return index !== element.id;
        });
        setItem(updatedItems);
    }

    // Edit an item
    const editItem = (id) => {
        let newEditItem = item.find(element => {
            return element.id === id
        })
        setUpdate(newEditItem.name)
        setToggle(false)
        setEditTodo(id)
        setShow(!show);
     }


    // updating an item
    const updateItem = (e) => {
        e.preventDefault()
        if(update && !toggle){
            console.log(editTodo);
            setItem(
                item.map(elem=>{
                if(elem.id === editTodo){
                 return {...elem, name:update};
                }
                return elem;
            })
        )}
    }
    

    // removing all items
    const removeAll = () => {
        setItem([])
    }

    return (
        <>
            <div className='main'>
                <div className='child-div mt-5'>
                    <h1>ToDo List App</h1>

                    <div className='addItems mt-5'>
                        <input type='text' 
                            placeholder='Add to Items' 
                            value={inputData}
                            onChange={e => setInputData(e.target.value)} 
                        />
                        <i className="fa fa-plus add-btn mt-2" 
                            title='add-item' 
                            onClick={addItem} 
                            aria-hidden="true"></i>
                    </div>

                    <div className='showItems '>
                        {
                            item.map((element) => {
                                return (
                                    <div className='eachItem pt-3 pb-3' key={element.id}>
                                        <h3>{element.name}</h3>
                                        <div className='todo-btn'>
                                            <i className="far fa-edit add-btn"
                                                // static 
                                                title='Edit Item' 
                                                onClick={() => editItem(element.id)} 
                                                variant="primary"
                                                aria-hidden="true">
                                            </i>
                                            {/* modal here   */}
                                            
                                            <Modal
                                                show={show}
                                                onHide={handleClose}
                                                backdrop="static"
                                                keyboard={false} >
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Edit you list</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body onSubmit={updateItem}>                                                  
                                                    <input type='text' 
                                                        placeholder='Edit your Item here...' 
                                                        className='popUpInput w-75' 
                                                        value={update}
                                                        onChange={e => setUpdate(e.target.value)} />
                                                    <Button variant="success" className='m-2'
                                                        onClick={handleClose}  type='submit'>Update
                                                    </Button>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    
                                                </Modal.Footer> 
                                            </Modal>
                                
                                            <i className="far fa-edit fa-trash-alt add-btn" 
                                                title='Delete Item' 
                                                onClick={() => deleteItem(element.id)} 
                                                aria-hidden="true">
                                            </i>
                                        </div>
                                    </div>
                                )
                            })
                        }                   
                    </div>

                    <div className='showItems'>
                        <button className='btn1 btnEffect' 
                            data-sm-link-text='remove' 
                            onClick={removeAll} >
                            <span>Check List</span>
                        </button>
                    </div>
                </div>    
            </div>  
        </>
    )
}

export default TodoApp;
