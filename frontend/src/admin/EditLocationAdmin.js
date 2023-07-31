import React, { useState, useEffect} from 'react'
import './Admin.css'

const EditLocationAdmin = () => {

  const [baseList, setBaseList] = useState([]);
  const [newBaseText, setNewBaseText] = useState();
  const [renderFlag, setRenderFlag] = useState(false);
  const [addingNewItem, setAddingNewItem] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:3001/bases`)
    .then(res => res.json())
    .then((data) => {
      setBaseList(data)
    })
  },[renderFlag])

  const handleCancel = () =>{
    setNewBaseText('');
    setAddingNewItem(false)
  }

  const handleSave= (event) =>{
    fetch(`http://localhost:3001/bases`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: newBaseText
      })
    })
    .then(setNewBaseText(''))
    .then(fetch(`http://localhost:3001/bases`)
    .then(res => res.json())
    .then((data) => {
      setBaseList(data)
      setRenderFlag(!renderFlag)
    }))
    .then(setAddingNewItem(false))
  }

  const handleDeleteBase = (base) => {
    console.log(base.baseId);
    fetch(`http://localhost:3001/bases/${base.baseId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
    .then(fetch(`http://localhost:3001/bases`)
    .then(res => res.json())
    .then((data) => {
      setBaseList(data)
      setRenderFlag(!renderFlag)
    }))
    .then(setRenderFlag(!renderFlag))
  }

  return (
    <div id='adminLocationPageWrapper'>
      <div id='baseListContainer'>
        {addingNewItem ?
          <div className='baseItem'>
            <span className="material-symbols-outlined  baseIcon" onClick={()=>{handleCancel()}}>arrow_back</span>
            <input id='newBaseTextInput' type='text' value={newBaseText} onChange={(e) => setNewBaseText(e.target.value)} ></input>
            <span className="material-symbols-outlined  baseIcon" onClick={()=>{handleSave()}}>save</span>
          </div>
          :
        <div id='addNewBaseContainer'>
          <span className="material-symbols-outlined  baseIcon" onClick={()=>{setAddingNewItem(true)}}>add</span>
        </div>
        }
        {baseList.map((base)=>{
          return(
            <div className='baseItem'>
              {base.name}
              <span className="material-symbols-outlined baseIcon" onClick={()=>{handleDeleteBase(base)}}>delete</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EditLocationAdmin