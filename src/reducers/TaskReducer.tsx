import { ActionTypes } from '../consts/index';
import { ITasksState, ITaskAction } from "../interfaces/index"

const taskReducer = (state: ITasksState, action: ITaskAction): ITasksState => {

   
    const { Fetch, Add, Edit, Delete } = ActionTypes;


    switch (action.type) {
        case Fetch:
            return action.tasks;
        case Add:
            return [...state, action.payload];
        case Edit:
            
            return state.map((task) => {
                if (task.id === action.id) {
                    return {
                        ...task,
                        ...action.updates
                    };
                } else {
                    return task;
                };
            });
        case Delete:
            
            return state.filter(({ id }) => id !== action.id);
        default:
            return state;
    }
}

export default taskReducer 