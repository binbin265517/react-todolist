import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import './todo.css';

const TodoList = () => {
    let isCurrentId = null;
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const onChange = (e) => {
        setInputValue(e.target.value)
    }
    const addTodo = () => {
        if (!inputValue.trim()) return false;
        setTodos([...todos, { title: inputValue.trim(), id: Date.now(), completed: false, isCli: false}])
        setInputValue('')
        
    }
    useEffect(() => {    
        if (todos.length === 0) {
            localStorage.removeItem('todos')
        } else {
            localStorage.setItem('todos', JSON.stringify(todos))
        }
    }, [todos])
    const deleteToDo = (item) => {
        setTodos(todos.filter(todo => todo.id !== item.id));
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    const doubleEditClick = (todo) => { 
       isCurrentId = todo.id;
       const data = todos.map(item => {
            if (item.id === todo.id) {           
                item.completed = !todo.completed
            }
            if (item.id !== isCurrentId && item.completed) {
                item.completed = false;
            }
            return item
        })
        setTodos([...todos])
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    const onChangeValue = (value, todo) => {
        const data = todos.map(item => {
            if (item.id === todo.id) {         
                item.title = value
            }
            return item
        })
        setTodos([...todos])
        localStorage.setItem('todos', JSON.stringify(todos))
    }
    
    const toggleClick = (todo) => {
        const data = todos.map(item => {
            if (item.id === todo.id) {         
                item.isCli = !todo.isCli
            }
            return item
        })
        setTodos([...todos])
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    const footerClick = (item) => {

    }

    return (
        <SessionDiv>
            <TitleStyle>
                <INPUT
                    type="text"
                    placeholder='What needs to be done?'
                    value={inputValue}
                    onChange={e => onChange(e)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()} />
                <TitleButton onClick={addTodo}>Add</TitleButton>
            </TitleStyle>
            <ul className='ul_style'>
                {todos.map(todo => (
                    <li key={todo.id} className='li_item_style'>
                        <input type="checkbox" className='toggle_style' onClick={e => toggleClick(todo)} />
                        {todo.completed ? 
                            <input value={todo.title}
                                className='input_style'
                                onChange={e => onChangeValue(e.target.value, todo)}
                                onBlur={e => doubleEditClick(todo)}  />
                            :
                            <>  
                                
                                <span onClick={e => doubleEditClick(todo)} className='span_style'>{todo.title}</span>
                                <button onClick={() => deleteToDo(todo)}>删除</button>
                            </>
                        }
                    </li>
                ))}
            </ul>
            {todos.length > 0 && 
              <FooterStyle>
                <span>{todos.length}items left</span>
                <ul>
                    {['All', "Active", "Completed"].map((item, index) => {
                        return  <li key={index} onClick={e => footerClick(item)}>{item}</li>
                    })}
                </ul>
            </FooterStyle>
            }
        </SessionDiv>
    );
}

const SessionDiv = styled.div`
    width: 556px;
    height: auto;
    background: #fff;
    margin: 130px 0 40px;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2), 0 25px 50px 0 rgba(0, 0, 0, .1);
    margin: 0 auto;
`;
const TitleStyle = styled.div`
   display: flex;
`;

const TitleButton = styled.button`
   width: 40px;
   height: 60px;
`;

const INPUT = styled.input`
    width: 550px;
    height: 65.59px;
    padding: 16px 16px 16px 60px;
    border: none !important;
    font-size: 24px;
    color: #111
`;

const LiStyle = styled.li`
   

`;

const FooterStyle = styled.footer`
padding: 10px 15px;
    height: 20px;
    text-align: center;
    font-size: 15px;
    border-top: 1px solid #e6e6e6;
    box-shadow: rgba(0, 0, 0, .2) 0 1px 1px, #f6f6f6 0 8px 0 -3px, rgba(0, 0, 0, .2) 0 9px 1px -3px, #f6f6f6 0 16px 0 -6px, rgba(0, 0, 0, .2) 0 17px 2px -6px;
    display: flex;
    ul {
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        li {
            color: inherit;
            margin: 3px;
            padding: 3px 7px;
            text-decoration: none;
            border: 1px solid transparent;
            border-radius: 3px;
        }
    }
`


export default TodoList;
