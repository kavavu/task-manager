import React, { useEffect, useReducer } from "react";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';

import { ITasksState } from "../interfaces/index"
import { ActionTypes } from '../consts/index';
import Context from "../context/tasksContext";
import taskReducer from '../reducers/TaskReducer';
import AppRouter from '../routers/AppRouter';




// Generate Custom Global theme by Materil UI
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#ab003c"
    },
    primary: {
      main: lightBlue[900]
    }
  },
  typography: {
    
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  },
  
});



export default function App() {


  const [state, dispatch] = useReducer(taskReducer, []);




  // here we get our tasks from local storage. 
  
  useEffect(() => {
    const taskJSON = localStorage.getItem("tasks");
    const tasks: ITasksState = taskJSON !== null ? JSON.parse(taskJSON) : [];

    if (tasks) {
      dispatch({ type: ActionTypes.Fetch, tasks });
    }
  }, []);



  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state));
  }, [state]);



  return (
    <Context.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
          <AppRouter />
      </ThemeProvider>
    </Context.Provider>
  );
}
