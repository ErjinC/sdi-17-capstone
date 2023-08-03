import React, { useState, useEffect} from 'react'
import './Admin.css'
import { ChakraProvider, Tooltip } from '@chakra-ui/react'

const EditLocationAdmin = () => {

  const [baseList, setBaseList] = useState([]);
  const [newBaseText, setNewBaseText] = useState();
  const [renderFlag, setRenderFlag] = useState(false);
  const [deleted, setDeleted] = useState(false)
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
    // console.log(base.baseId);
    fetch(`http://localhost:3001/bases/${base.baseId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })
    .then(fetch(`http://localhost:3001/bases`)
    .then(res => res.json())
    .then((data) => {
      setBaseList(data)
      setRenderFlag(!deleted)
    }))
  }

  return (
    <ChakraProvider>
     
      <div id='adminLocationPageWrapper'>
        <div id='baseListContainer'>
          {addingNewItem ?
            <div className='baseItem'>
              <span id="addBaseBack" className="material-symbols-outlined  baseIcon" onClick={()=>{handleCancel()}}>arrow_back</span>
              <input id='newBaseTextInput' type='text' value={newBaseText} onChange={(e) => setNewBaseText(e.target.value)} ></input>
              <span id="addBaseSave" className="material-symbols-outlined  baseIcon" onClick={()=>{handleSave()}}>save</span>
            </div>
            :
          <div id='addNewBaseContainer' onClick={()=>{setAddingNewItem(true)}}>
            <span className="material-symbols-outlined  baseIcon"><Tooltip openDelay={500} hasArrow label="Add New Base">add</Tooltip></span>
          </div>
          }
          {baseList.map((base, i)=>{
            return(
              <>
              {
                deleted ? <></> :
                <div key={i} className='baseItem'>
                  {base.name}
                  <span id="addBaseDelete" className="material-symbols-outlined baseIcon" onClick={()=>{handleDeleteBase(base)}}><Tooltip openDelay={500} hasArrow label="Remove Location">delete</Tooltip></span>
                </div>
              }
              </>
            )
          })}
        </div>
      </div>
    </ChakraProvider>
  )
}

export default EditLocationAdmin