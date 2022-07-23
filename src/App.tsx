import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
// CRUD => СRUD
// GUI & CLI
export type FilterValuesType = "all" | "active" | "completed"
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    console.log(v1())
    // BLL:
    const title: string = "What to learn"


    const removeTask = (taskID: string, todolistId: string): void => {
        let todolistTasks = tasks[todolistId]
        let filteredTasks = todolistTasks.filter(t=>t.id !== taskID)
        tasks[todolistId] = filteredTasks
        setTasks({...tasks})
    }
    const addTask = (title: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let newTask = {id: v1(), title: title, isDone: false}
        let newTodolistTasks = [...todolistTasks, newTask]
        tasks[todolistId] = newTodolistTasks
        setTasks({...tasks})
    }
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(tl=> tl.id === todolistId)
        if(todolist){todolist.filter = filter}
        setTodolists([...todolists])
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todolistId: string) => {  // 3, false
        let todolistTasks = tasks[todolistId]
        let changedTodolistTasks = todolistTasks.map(t=>t.id === taskID ? {...t, isDone: isDone} : t)
        tasks[todolistId] = changedTodolistTasks
        setTasks({...tasks})
        //setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} :t))
    }

    const removeTodolist = (todolistId:string) => {
        debugger
        let newTodolists = todolists.filter(tl=>tl.id != todolistId)
        setTodolists(newTodolists)
        delete tasks[todolistId]
        setTasks({...tasks})
    }

   let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"}
    ])
    const [tasks, setTasks] = useState({ //[newState, setter(fn)]
        [todolistId1]: [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/ES6", isDone: false},
    ],
            [todolistId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
        ]
}

        )


    // UI:

    return (
        <div className="App">
            {
                todolists.map( (tl)=>{
                    let tasksForRender;
                    switch (tl.filter) {
                        case "completed":
                            tasksForRender = tasks[tl.id].filter(t => t.isDone === true)
                            break
                        case "active":
                            tasksForRender = tasks[tl.id].filter(t => t.isDone === false)
                            break
                        default:
                            tasksForRender = tasks[tl.id]
                    }
                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasksForRender}

                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                    />})
            }

        </div>
    );
}

export default App;
