import { ITasksState, IFilterTask } from "../interfaces/index";





const filterTasks = (tasks: ITasksState, filter: IFilterTask): ITasksState => {
    return tasks.filter((task) => {
        let textMatch: boolean = false;

        if (filter.status.toLowerCase() !== "all") {
            textMatch = (task.title.toLowerCase().includes(filter.text.toLowerCase()) || task.description.toLowerCase().includes(filter.text.toLowerCase()))
                && task.status.toLowerCase() === filter.status.toLowerCase();
        }
        else {
            textMatch = (task.title.toLowerCase().includes(filter.text.toLowerCase()) || task.description.toLowerCase().includes(filter.text.toLowerCase()))
        }

        return textMatch;
    })
};

export default filterTasks;