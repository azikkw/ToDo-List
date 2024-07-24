// Get Tasks from local storage
export const getTasks = () => {
    // Getting tasks
    if(localStorage.getItem("todoList") !== null)
        return JSON.parse(localStorage.getItem("todoList"));
    return [];
}
export const getCompleteTasks = () => {
    // Getting complete tasks
    if(localStorage.getItem("completeList") !== null)
        return JSON.parse(localStorage.getItem("completeList"));
    return [];
}