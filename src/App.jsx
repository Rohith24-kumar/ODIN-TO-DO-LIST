import { useState } from 'react'
import './App.css' 

function App() { 

  const [isCreating, SetIsCreating] = useState(false)
  const [newProjectName, setProjectName] = useState('')
  const [activeTab, setActiveTab] = useState('default');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [todo, setTodo] = useState({
    default: [
      { id: 1, title: 'learn JS', description: 'study modules and class', dueDate: '2026-09-10', priority: 'HIGH', completed: false },
      { id: 2, title: 'Read Documentation', description: 'Go Through Guides', dueDate: '2026-09-08', priority: 'MEDIUM', completed: false },
      { id: 3, title: 'Build the project', description: 'configure the build', dueDate: '2026-09-15', priority: 'LOW', completed: false }
    ],
    work: [
      { id: 4, title: 'prepare weekly report', description: 'Summarize completed tasks', dueDate: '2026-09-12', priority: 'HIGH', completed: false },
      { id: 5, title: 'Team meeting', description: 'Sync on Q3 goals', dueDate: '2026-09-11', priority: 'MEDIUM', completed: false }
    ],
    personal: [
      { id: 6, title: 'Grocery shopping', description: 'Milk, eggs, bread', dueDate: '2026-09-09', priority: 'LOW', completed: false }
    ]
  });

  const submitNewProject = () => {
    const formattedName = newProjectName.trim();
    if (!formattedName) {
      SetIsCreating(false);
      setErrorMessage('');
      return;
    }
    const formattedkey = formattedName.toLowerCase();
    if (todo[formattedkey]) {
      setErrorMessage('A project with the same Name already Exists !..')
      return;
    }
    setTodo({
      ...todo,
      [formattedkey]: []
    });
    setActiveTab(formattedkey);
    setProjectName('');
    setErrorMessage('');
    SetIsCreating(false); 
  };

  const handelDeleteTodo = (id) => {
    const updatedCategoryList = todo[activeTab].filter(item => item.id !== id);
    setTodo({
      ...todo,
      [activeTab]: updatedCategoryList
    });
  };

  const handleToggleComplete = (id) => {
    const updatedCategoryList = todo[activeTab].map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setTodo({
      ...todo,
      [activeTab]: updatedCategoryList
    });
  };

  const handelAddTodo = () => {
    const newTask = {
      id: Date.now(),
      title: `New ${activeTab} Task`,
      description: 'Click edit to change descriptions',
      dueDate: '2026-10-01',
      priority: 'MEDIUM',
      completed: false
    };
    setTodo({
      ...todo,
      [activeTab]: [...todo[activeTab], newTask]
    });
  };

  const currentTab = todo[activeTab] || [];

  return ( 
    <> 
      <div className="site-title"> 
        <h2>ToDo list</h2> 
        <p>Organize Your Task Efficiently</p> 
      </div> 

      <div className="site-navBar"> 
        <div className="nav-left"> 
          {Object.keys(todo).map((tabname) => (
            <button
              key={tabname}
              
              className={`nav-button-tab ${activeTab === tabname ? 'active-tab' : ''}`} 
              onClick={() => setActiveTab(tabname)}
            >
              {tabname.charAt(0).toUpperCase() + tabname.slice(1)}
            </button> 
          ))} 
        </div> 
        
        <div className="left-nav"> 
          {isCreating ? (
            <div className='inline-project-creator'>
              <button 
                className="nav-cancel-project"
                onClick={() => {
                  SetIsCreating(false);
                  setProjectName('');
                  setErrorMessage('');
                }}
              >
                ✕ Cancel
              </button> 

              <div className='input-wrapper-container'>
                <input 
                  type="text"
                  placeholder='Project Name'
                  className={`project-name-input ${errorMessage ? 'input-error-border' : ''}`}
                  autoFocus
                  value={newProjectName}
                  onChange={(e) => {
                    setProjectName(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && submitNewProject()}
                />
                {errorMessage && (
                  <div className='custom-error-popup animate-fade-in'>
                    <span className='error-triangle-arrow'></span>
                    ⚠️ {errorMessage}
                  </div>
                )}
              </div>
              <button className='nav-save-inline' onClick={submitNewProject}>Save</button>
            </div>
          ) : (
            <>
              <button className="nav-delete">x Delete</button> 
              <button className="nav-add" onClick={() => SetIsCreating(true)}>+ New Project</button> 
            </>
          )}
        </div> 
      </div> 
      
      <div className='default-page'> 
       
        <h5 className='default-htag'>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h5> 
        <button className='default-add ' onClick={handelAddTodo}>+ Add ToDo</button> 
        
        <div className='todo-item-list'>
          {currentTab.map((singleTodo) => (
            <div key={singleTodo.id} className='work'> 
              <div className='info'> 
                <div className='todo-content-left'> 
                  <input 
                    type='checkbox'
                    checked={singleTodo.completed}
                    onChange={() => handleToggleComplete(singleTodo.id)}
                    name={`${activeTab}-todo-${singleTodo.id}`} 
                    id={`${activeTab}-checkbox-${singleTodo.id}`} 
                    className='custom-checkbox'
                  /> 
                  <div className='to-do-text-block'> 
                    <h4 className={`todo-title ${singleTodo.completed ? 'completed-task' : ''}`}>{singleTodo.title}</h4> 
                    <p className='todo-desc'>{singleTodo.description}</p> 
                    <div className='todo-metadata'> 
                      <span className='due-label'>Due:</span> 
                      <input type='date' defaultValue={singleTodo.dueDate} className="todo-date-field"></input> 
                      <span className={`priority-tag ${(singleTodo.priority || 'LOW').toLowerCase()}`}>{singleTodo.priority || 'LOW'}</span> 
                    </div> 
                  </div> 
                </div> 
                
                <div className='todo-content-right'> 
                  <button className='icon-btn'>✏️</button> 
                  <button 
                    className='icon-button delete'
                    onClick={() => handelDeleteTodo(singleTodo.id)}
                  >
                    X
                  </button> 
                </div> 
              </div> 
            </div> 
          ))}
          {currentTab.length === 0 && <p className="empty-state-text">No tasks remaining in this list!</p>}
        </div> 
      </div>
    </> 
  ) 
} 

export default App
