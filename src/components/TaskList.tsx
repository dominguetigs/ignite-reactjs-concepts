import { useState } from 'react';

import '../styles/tasklist.scss';

import { Utils } from '../utils';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Utils.gerateUUID(),
        title: newTaskTitle,
        isComplete: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  }

  function handleToggleTaskCompletion(id: string) {
    const updateTasks = [];

    for (const task of tasks) {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
      updateTasks.push(task);
    }

    setTasks(updateTasks);
  }

  function handleRemoveTask(id: string) {
    const remainingTasks = tasks.filter((task) => task.id !== id);
    setTasks(remainingTasks);
  }

  function handleEnterKeyPressed(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') {
      handleCreateNewTask();
    }
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyUp={handleEnterKeyPressed}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
