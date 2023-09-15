import React, { useState } from 'react';
import '../styles/todobody.css';

interface TodoItem {
  text: string;
  completed: boolean;
}

const TodoBody: React.FC = () => {
  const [task, setTask] = useState<string>(''); // Состояние для хранения текущей задачи
  const [todoList, setTodoList] = useState<TodoItem[]>([]); // Состояние для хранения списка задач
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All'); // Состояние для фильтрации задач

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (task.trim() !== '') {
      // Добавляем задачу в список, если она не пуста
      setTodoList([...todoList, { text: task, completed: false }]);
      setTask(''); // Очищаем поле ввода
    }
  };

  const handleToggleTask = (index: number) => {
    // Переключаем состояние выполнения задачи
    const updatedTodoList = [...todoList];
    updatedTodoList[index].completed = !updatedTodoList[index].completed;
    setTodoList(updatedTodoList);
  };

  const handleDeleteTask = (index: number) => {
    // Удаляем задачу из списка
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(index, 1);
    setTodoList(updatedTodoList);
  };

  const handleFilterChange = (newFilter: 'All' | 'Active' | 'Completed') => {
    setFilter(newFilter);
  };

  const clearCompleted = () => {
    const updatedTodoList = todoList.filter((task) => !task.completed);
    setTodoList(updatedTodoList);
  };

  const filteredTodoList = todoList.filter((task) => {
    if (filter === 'Active') {
      return !task.completed;
    } else if (filter === 'Completed') {
      return task.completed;
    }
    return true; // Показать все задачи при фильтре 'All'
  });

  return (
    <div className='todo_container'>

      <p data-testid='todoText' className='todotext'>todos</p>

      <div className='todo_box'>

        <div className='inputbox'>
          <input
            type='text'
            placeholder='Введите новую задачу'
            className='input'
            value={task}
            onChange={handleInputChange}
          />
          <button className='add_button' onClick={handleAddTask}>Добавить</button>
        </div>

        <div className='todoitem_container' data-testid='todo-item-container'>
        {filteredTodoList.map((task, index) => (
          <li key={index} data-testid='добавленная задача'>
            <div className='todoitem'>
            <input
                className={`checkbox ${task.completed ? 'checked' : ''}`}
                type='checkbox'
                data-testid='checkboxid'
                checked={task.completed}
                onChange={() => handleToggleTask(index)}
              />
              <span className={task.completed ? 'completed' : ''}>
                {task.text}
              </span>
            </div>
          </li>
        ))}
      </div>

        <div className='todolast'>

        <div className='task-count'>
         {todoList.length} items left
        </div>
      
        <div className='filter-buttons'>
        <button
          className={`filter-button ${filter === 'All' ? 'active' : ''}`}
          onClick={() => handleFilterChange('All')}
        >
          All
        </button>
        <button
          className={`filter-button ${filter === 'Active' ? 'active' : ''}`}
          onClick={() => handleFilterChange('Active')}
        >
          Active
        </button>
        <button
          className={`filter-button ${filter === 'Completed' ? 'active' : ''}`}
          onClick={() => handleFilterChange('Completed')}
        >
          Completed
        </button>
        </div>

        <button onClick={clearCompleted} className='clear-completed-button'>
          Clear completed
        </button>

        </div>

      </div>
    </div>
  );
};

export default TodoBody;