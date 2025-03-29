import React, { useState, useEffect, useReducer } from 'react';

const initialState = {
    todos: [],
    filter: 'ALL'
};

const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                 todos: [...state.todos, action.payload]
            }
       case 'TOGGLE_TODO':
          return {
                ...state,
                todos: state.todos.map(todo => {
                    if(todo.id === action.payload) {
                        return {
                            ...todo,
                            completed: !todo.completed
                        }
                    }
                    return todo;
                })
          }     
        case 'Delete_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            }

        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload
            }
        default:
            return state;
    }
}

const TodoList = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [text, setText] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const addTodo = () => {
        dispatch({
            type: 'ADD_TODO',
            payload: {
                id: Math.random(),
                text,
                completed: false
            }
        });
        setText('');
    }

    const toggleTodo = (id) => {
        dispatch({
            type: 'TOGGLE_TODO',
            payload: id
        });
    }

    const deleteTodo = (id) => {
        dispatch({
            type: 'DELETE_TODO',
            payload: id
        });
    }

    const setFilter = (filter) => {
        dispatch({
            type: 'SET_FILTER',
            payload: filter
        });
    }

    const { todos, filter } = state;
    const filteredTodos = filter === 'ALL' ? todos : todos.filter(todo => filter === 'COMPLETED' ? todo.completed : !todo.completed);

    return (
        <div>
            <input type="text" value={text} onChange={handleChange} />
            <button onClick={addTodo}>Add Todo</button>
            <ul>
                {filteredTodos.map(todo => (
                    <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.text}
                        <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => setFilter('ALL')}>All</button>
            <button onClick={() => setFilter('COMPLETED')}>Completed</button>
            <button onClick={() => setFilter('INCOMPLETED')}>Incompleted</button>
        </div>
    );
}