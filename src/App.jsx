import './App.css'

function App() {
  return (
    <>
      <div className="site-title">
        <h2>ToDo list</h2>
        <p>Organize Your Task Efficiently</p>
      </div>

      <div className="site-navBar">
        <div className="nav-left">
          <button className="nav-default">Default</button>
          <button className="nav-work">Work</button>
          <button className="nav-personal">Personal</button>
        </div>

        <div className="left-nav">
          <button className="nav-delete">x Delete</button>
          <button className="nav-add">+ New Project</button>
        </div>
      </div>
      
    </>
  )
}

export default App