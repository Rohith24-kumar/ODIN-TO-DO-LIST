import { useState } from 'react'
import './App.css' 

function App() { 
  const[activeTab,setActiveTab]=useState('default');
const [todo, setTodo] = useState({
  default: [
    { id: 1, title: 'learn JS', description: 'study modules and class', dueDate: '2026-09-10', priority: 'HIGH', completed:false },
    { id: 2, title: 'Read Documentation', description: 'Go Through Guides', dueDate: '2026-09-08', priority: 'MEDIUM' , completed:false},
    { id: 3, title: 'Build the project', description: 'configure the build', dueDate: '2026-09-15', priority: 'LOW' , completed:false}
  ],
  work:[
    { id: 4, title: 'prepare weekly report', description: 'Summarize completed tasks', dueDate: '2026-09-12', priority: 'HIGH', completed:false },
    { id: 5, title: 'Team meeting', description: 'Sync on Q3 goals', dueDate: '2026-09-11', priority: 'MEDIUM', completed:false }
  ],
  personal:[
    { id: 6, title: 'Grocery shopping', description: 'Milk, eggs, bread', dueDate: '2026-09-09', priority: 'Low', completed:false }
  ]
});

const handelDeleteTodo=(id)=>{
  const updatedCategoryList=todo[activeTab].filter(item=>item.id!==id);
   setTodo({
      ...todo,
      [activeTab]: updatedCategoryList
    });
  };


const handleToggleComplete=(id)=>{
  const updatedCategoryList=todo[activeTab].map(item=>{
    if(item.id===id){
      return{ ...item,completed:!item.completed};
    }
    return item;
  });
 setTodo({
      ...todo,
      [activeTab]: updatedCategoryList
    });
  };

const handelAddTodo=()=>{
  const newTask={
    id:Date.now(),
    title:`New ${activeTab} Task`,
     description: 'Click edit to change descriptions',
      dueDate: '2026-10-01',
      priority: 'MEDIUM',
      completed:false
  };
  setTodo(
    {...todo,
      [activeTab]:[...todo[activeTab],newTask]})
};


const currentTab=todo[activeTab] || [];

  return ( 
    <> 
      <div className="site-title"> 
        <h2>ToDo list</h2> 
        <p>Organize Your Task Efficiently</p> 
      </div> 
      
      <div className="site-navBar"> 
        <div className="nav-left"> 
          <button 
          className={`nav-deafult ${activeTab === 'default' ? 'active-tab':'' }`} 
          onClick={()=>setActiveTab('default')}>Default</button> 
          <button 
          className={`nav-work ${activeTab === 'work' ? 'active-tab':'' }`}
          onClick={()=>setActiveTab('work')}>Work</button> 
          <button 
          className={`nav-personal ${activeTab === 'personal' ? 'active-tab':'' }`} 
          onClick={()=>setActiveTab('personal')}>Personal</button> 
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
          {currentTab.map((singleTodo)=>(
        <div key={singleTodo.id} className='work'> 
          <div  className='info'> 
            <div className='todo-content-left'> 
              <input type='checkbox'
              checked={singleTodo.completed}
              onChange={()=> handleToggleComplete(singleTodo.id)}
               name={`-todo-${singleTodo.id}`} 
               id={`-checkbox-${singleTodo.id}`} 
               className='custom-checkbox'
               ></input> 
              <div className='to-do-text-block'> 
                <h4 className={`todo-title ${singleTodo.completed?'completed-task':''}`}>{singleTodo.title}</h4> 
                <p className='todo-desc'>{singleTodo.description}</p> 
                <div className='todo-metadata'> 
                  <span className='due-label'>Due:</span> 
                  <input type='date' defaultValue={singleTodo.dueDate} id="dated"></input> 
                  <span className={`priority-tag ${singleTodo.priority.toLowerCase()}`}>{singleTodo.priority}</span> 
                </div> 
              </div> 
            </div> 
            
            <div className='todo-content-right'> 
              <button className='icon-button'>✏️</button> 
              <button 
              className='icon-button delete'
              onClick={()=> handelDeleteTodo(singleTodo.id)}>X</button> 
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
