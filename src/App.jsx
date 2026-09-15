import { useState } from 'react'
import './App.css' 

function App() { 
  const[activeTab,SetActiveTab]=useState('Default');
const[todo,setTodo]=useState([
  {
  id: 1,
  title:'learn JS',
  description:'study modules and class',
  dueDate:'2026-09-10',
  priority:'HIGH'
  },
   {
  id: 2,
  title:'Read Documentation',
  description:'Go Through Guides',
  dueDate:'2026-09-8',
  priority:'MEDIUM'
  },
   {
  id: 3,
  title:'Build the project',
  description:'configure the build',
  dueDate:'2026-09-15',
  priority:'LOW'
  }
]);

const handelAddTodo=()=>{
  const newTask={
    id:Date.now(),
    title:"new project Task",
     description: 'Click edit to change descriptions',
      dueDate: '2026-10-01',
      priority: 'MEDIUM'
  };
  setTodo([...todo,newTask])
}

  return ( 
    <> 
      <div className="site-title"> 
        <h2>ToDo list</h2> 
        <p>Organize Your Task Efficiently</p> 
      </div> 
      
      <div className="site-navBar"> 
        <div className="nav-left"> 
          <button className={`nav-deafult ${activeTab === 'Default' ? 'active-tab':'' }`} onClick={()=>setActiveTab('Default')}>Default</button> 
          <button className={`nav-work ${activeTab === 'work' ? 'active-tab':'' }`} onClick={()=>setActiveTab('work')}>Work</button> 
          <button className={`nav-personal ${activeTab === 'personal' ? 'active-tab':'' }`} onClick={()=>setActiveTab('personal')}>Personal</button> 
        </div> 
        <div className="left-nav"> 
          <button className="nav-delete">x Delete</button> 
          <button className="nav-add">+ New Project</button> 
        </div> 
      </div> 
      
      <div className='default-page'> 
        <h5 className='default-htag'>Default</h5> 
        <button className='default-add ' onClick={handelAddTodo}>+ Add ToDo</button> 
        
        <div className='todo-item-list'>
          {todo.map((todo)=>(
        <div key={todo.id} className='work'> 
          <div  className='info'> 
            <div className='todo-content-left'> 
              <input type='checkbox' name={`todo-${todo.id}`} value='Learn JS' id={`checkbox-${todo.id}`} className='custom-checkbox'></input> 
              <div className='to-do-text-block'> 
                <h4 className='todo-title'>{todo.title}</h4> 
                <p className='todo-desc'>{todo.description}</p> 
                <div className='todo-metadata'> 
                  <span className='due-label'>Due:</span> 
                  <input type='date' defaultValue={todo.dueDate} id="dated"></input> 
                  <span className={`priority-tag ${todo.priority.toLocaleLowerCase()}`}>{todo.priority}</span> 
                </div> 
              </div> 
            </div> 
            
            <div className='todo-content-right'> 
              <button className='icon-button'>✏️</button> 
              <button className='icon-button delete'>X</button> 
            </div> 
          </div> 
        </div> 
          ))}
      </div> 
      </div>
    </> 
  ) 
} 

export default App
