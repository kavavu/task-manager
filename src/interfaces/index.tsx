import { ActionTypes } from '../consts/index';


// Each task have 4 properties(id,tittel of the task,description and status of the task)
export interface ITaskItem {
    id: string;
    title: string;
    description: string;
    status: string
}

  
export type ITasksState = ITaskItem[];


 
//  for fetching data for Adding, Editing
// and Deleting
export type ITaskAction =
    { type: ActionTypes.Fetch, tasks: ITaskItem[] } |
    { type: ActionTypes.Add, payload: ITaskItem } |
    { type: ActionTypes.Edit, id: string, updates: ITaskItem } |
    { type: ActionTypes.Delete, id: string }



export interface IContextModel {
    state: ITasksState;
    dispatch: React.Dispatch<ITaskAction>
}



// an interface to filter our task in TasksList component 
export interface IFilterTask {
    text: string;
    status: string;
    
}

