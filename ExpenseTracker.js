import React, {useEffect, useState, useReducer} from "react";


const initialState = {

};

const reducer = (action, state) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
             return {
                ...state,
                expenses: [...state.expenses, action.payload]
             }
        case 'DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense.id !== action.payload)
            }     
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload
            }   
        case 'LOAD_EXPENSES':
            return {
                ...state,
                expenses: action.payload
            }    
        default:
            return state;     
    }
}

const ExpenseTracker = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        const savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
        dispatch({ type: "LOAD_EXPENSES", payload: savedExpenses });
    
      }, []);

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(state.expenses));
    }
    , [state.expenses]); 
    

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const addExpense = () => {
        dispatch({
            type: 'ADD_EXPENSE',
            payload: {
                id: Math.random(),
                text,
                amount,
                completed: false
            }
        });
    }

    return (
      <div>
        <input type="text" value={text} onChange={handleChange} />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full mt-2"
        />
        <button onClick={addExpense}>Add Expense</button>

        {/* Expenses list */}
        <ul 
            className="mt-4"
        >
            {state.expenses && state.expenses.length === 0 && <p>No expenses</p>}
            {state.expenses.map(expense => (
                <li key={expense.id}>
                    {expense.text} - {expense.amount}
                    <button onClick={() => dispatch({ type: 'DELETE_EXPENSE', payload: expense.id })}>Delete</button>
                </li>
            ))}
            </ul>
            
            <h3 >Total: {state.expenses.reduce((total, expense) => total + expense.amount, 0)}</h3>
      </div>
    );
}
