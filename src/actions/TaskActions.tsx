



import { ActionTypes } from '../consts/index';
import { ITaskItem, ITaskAction } from "../interfaces/index"



// for adding task .

export const addTask = (task: ITaskItem): ITaskAction => ({
  type: ActionTypes.Add,
  payload: task
});



//   editting the task

export const editTask = (id: string, updates: ITaskItem): ITaskAction => ({
  type: ActionTypes.Edit,
  id,
  updates
});



// for removing tasks
// 
export const removeTask = (id: string): ITaskAction => ({
  type: ActionTypes.Delete,
  id
});

