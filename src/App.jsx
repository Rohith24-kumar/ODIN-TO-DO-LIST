
import { useState } from 'react';
import './App.css';

function App() {
  const [isCreating, setIsCreating] = useState(false);
  const [newProjectName, setProjectName] = useState('');
  const [activeTab, setActiveTab] = useState('default');
  const [errorMessage, setErrorMessage] = useState('');
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showTodoModal, setShowTodoModel] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'MEDIUM'
  });

  const [todo, setTodo] = useState({
    default: [
      {
        id: 1,
        title: 'learn JS',
        description: 'study modules and class',
        dueDate: '2026-09-10',
        priority: 'HIGH',
        completed: false
      },
      {
        id: 2,
        title: 'Read Documentation',
        description: 'Go Through Guides',
        dueDate: '2026-09-08',
        priority: 'MEDIUM',
        completed: false
      },
      {
        id: 3,
        title: 'Build the project',
        description: 'configure the build',
        dueDate: '2026-09-15',
        priority: 'LOW',
        completed: false
      }
    ],

    work: [
      {
        id: 4,
        title: 'prepare weekly report',
        description: 'Summarize completed tasks',
        dueDate: '2026-09-12',
        priority: 'HIGH',
        completed: false
      },
      {
        id: 5,
        title: 'Team meeting',
        description: 'Sync on Q3 goals',
        dueDate: '2026-09-11',
        priority: 'MEDIUM',
        completed: false
      }
    ],

    personal: [
      {
        id: 6,
        title: 'Grocery shopping',
        description: 'Milk, eggs, bread',
        dueDate: '2026-09-09',
        priority: 'LOW',
        completed: false
      }
    ]
  });

  const handleAddTodo = (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!formData.title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: formData.title.trim(),
      description:
        formData.description.trim() || 'No Description provided.',
      dueDate:
        formData.dueDate ||
        new Date().toISOString().split('T')[0],
      priority: formData.priority,
      completed: false
    };

    setTodo({
      ...todo,
      [activeTab]: [...todo[activeTab], newTask]
    });

    setFormData({
      title: '',
      description: '',
      dueDate: '',
      priority: 'MEDIUM'
    });

    setShowTodoModel(false);
  };

  const confirmCustomDelete = () => {
    const updateTodoState = { ...todo };
    delete updateTodoState[activeTab];

    const remainingTabs = Object.keys(updateTodoState);

    if (remainingTabs.length > 0) {
      setActiveTab(remainingTabs[0]);
      setTodo(updateTodoState);
    } else {
      setActiveTab('default');
      setTodo({ default: [] });
    }

    setDeleteModal(false);
  };

  const triggerDeleteProject = () => {
    setDeleteModal(true);
  };

  const submitNewProject = () => {
    const formattedName = newProjectName.trim();

    if (!formattedName) {
      setIsCreating(false);
      setErrorMessage('');
      return;
    }

    const formattedKey = formattedName.toLowerCase();

    if (todo[formattedKey]) {
      setErrorMessage(
        'A project with the same Name already Exists!..'
      );
      return;
    }

    setTodo({
      ...todo,
      [formattedKey]: []
    });

    setActiveTab(formattedKey);
    setProjectName('');
    setErrorMessage('');
    setIsCreating(false);
  };

  const handleDeleteTodo = (id) => {
    const updatedCategoryList = todo[activeTab].filter(
      (item) => item.id !== id
    );

    setTodo({
      ...todo,
      [activeTab]: updatedCategoryList
    });
  };

  const handleToggleComplete = (id) => {
    const updatedCategoryList = todo[activeTab].map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed
        };
      }

      return item;
    });

    setTodo({
      ...todo,
      [activeTab]: updatedCategoryList
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
              className={`nav-button-tab ${
                activeTab === tabname ? 'active-tab' : ''
              }`}
              onClick={() => setActiveTab(tabname)}
            >
              {tabname.charAt(0).toUpperCase() + tabname.slice(1)}
            </button>
          ))}
        </div>

        <div className="left-nav">
          {isCreating ? (
            <div className="inline-project-creator">
              <button
                className="nav-cancel-project"
                onClick={() => {
                  setIsCreating(false);
                  setProjectName('');
                  setErrorMessage('');
                }}
              >
                ✕ Cancel
              </button>

              <div className="input-wrapper-container">
                <input
                  type="text"
                  placeholder="Project Name"
                  className={`project-name-input ${
                    errorMessage ? 'input-error-border' : ''
                  }`}
                  autoFocus
                  value={newProjectName}
                  onChange={(e) => {
                    setProjectName(e.target.value);

                    if (errorMessage) {
                      setErrorMessage('');
                    }
                  }}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && submitNewProject()
                  }
                />

                {errorMessage && (
                  <div className="custom-error-popup animate-fade-in">
                    <span className="error-triangle-arrow"></span>
                    ⚠️ {errorMessage}
                  </div>
                )}
              </div>

              <button
                className="nav-save-inline"
                onClick={submitNewProject}
              >
                Save
              </button>
            </div>
          ) : (
            <>
              <button
                className="nav-delete"
                onClick={triggerDeleteProject}
              >
                x Delete
              </button>

              <button
                className="nav-add"
                onClick={() => setIsCreating(true)}
              >
                + New Project
              </button>

              {showDeleteModal && (
                <div className="modal-backdrop">
                  <div className="custom-modal-box">
                    <h3 className="model-title">
                      Delete Project
                    </h3>

                    <p className="modal-text">
                      Are you sure you want to delete the entire{' '}
                      <strong>{activeTab}</strong> project folder?
                      This action will delete all tasks in the folder.
                    </p>

                    <div className="modal-action-row">
                      <button
                        className="modal-btn-cancel"
                        onClick={() => setDeleteModal(false)}
                      >
                        Cancel
                      </button>

                      <button
                        className="modal-btn-confirm"
                        onClick={confirmCustomDelete}
                      >
                        Delete Folder
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="default-page">
        <h5 className="default-htag">
          {activeTab.charAt(0).toUpperCase() +
            activeTab.slice(1)}
        </h5>

        <button
          className="default-add"
          onClick={() => setShowTodoModel(true)}
        >
          + Add ToDo
        </button>

        {showTodoModal && (
          <div className="modal-backdrop">
            <form
              className="custom-modal-box todo-form-box"
              onSubmit={handleAddTodo}
            >
              <h3 className="model-title todo-form-header">
                New Todo
              </h3>

              <div className="form-group-field">
                <label>Title</label>

                <input
                  type="text"
                  placeholder="Enter the Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value
                    })
                  }
                  required
                />
              </div>

              <div className="form-group-field">
                <label>Description</label>

                <textarea
                  placeholder="Enter the Description"
                  rows="4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value
                    })
                  }
                />
              </div>

              <div className="form-group-field">
                <label>Due Date</label>

                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dueDate: e.target.value
                    })
                  }
                  required
                />
              </div>

              <div className="form-group-field">
                <label>Priority</label>

                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: e.target.value
                    })
                  }
                  required
                >
                  <option value="HIGH">HIGH</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="LOW">LOW</option>
                </select>
              </div>

              <div className="modal-actions-row todo-form-footer">
                <button
                  type="button"
                  className="modal-btn modal-btn-cancel"
                  onClick={() => {
                    setShowTodoModel(false);

                    setFormData({
                      title: '',
                      description: '',
                      dueDate: '',
                      priority: 'MEDIUM'
                    });
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-btn todo-btn-create"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="todo-item-list">
          {currentTab.map((singleTodo) => (
            <div
              key={singleTodo.id}
              className="work"
            >
              <div className="info">
                <div className="todo-content-left">
                  <input
                    type="checkbox"
                    checked={singleTodo.completed}
                    onChange={() =>
                      handleToggleComplete(singleTodo.id)
                    }
                    name={`${activeTab}-todo-${singleTodo.id}`}
                    id={`${activeTab}-checkbox-${singleTodo.id}`}
                    className="custom-checkbox"
                  />

                  <div className="to-do-text-block">
                    <h4
                      className={`todo-title ${
                        singleTodo.completed
                          ? 'completed-task'
                          : ''
                      }`}
                    >
                      {singleTodo.title}
                    </h4>

                    <p className="todo-desc">
                      {singleTodo.description}
                    </p>

                    <div className="todo-metadata">
                      <span className="due-label">
                        Due:
                      </span>

                      <input
                        type="date"
                        defaultValue={singleTodo.dueDate}
                        className="todo-date-field"
                      />

                      <span
                        className={`priority-tag ${
                          (
                            singleTodo.priority || 'LOW'
                          ).toLowerCase()
                        }`}
                      >
                        {singleTodo.priority || 'LOW'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="todo-content-right">
                  <button className="icon-btn">
                    ✏️
                  </button>

                  <button
                    className="icon-button delete"
                    onClick={() =>
                      handleDeleteTodo(singleTodo.id)
                    }
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          ))}

          {currentTab.length === 0 && (
            <p className="empty-state-text">
              No tasks remaining in this list!
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
