import React, { useContext } from "react";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { globalStyles } from "../styles/globalStyles"
import TaskForm from "./TaskForm"
import Context from '../context/tasksContext';
import { addTask } from "../actions/TaskActions"
import history from '../routers/History';


// styling the addtask page
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
        },

        horizontalDivider: {
            marginTop: 15,
            marginBottom: 30,
        },
    }),
);




const AddTask: React.FC = () => {

    
    const globalClasses = globalStyles();
    const classes = useStyles();



    
    const { dispatch } = useContext(Context);


    return (
        <main className={globalClasses.content}>
            <div className={globalClasses.drawerHeader} />


            <Grid container justify="center" alignItems="center">
                <Grid item xs={12} sm={12} md={6}>

                    <h1 data-testid="headerH1">Add Task</h1>

                    <Divider light  className={classes.horizontalDivider} />

                        { /* 
                             Task form will remove addTask action 
                             and then will go back to dashboard page
                          */ }
                    
                        <TaskForm
                            onSubmit={(task) => {
                                dispatch(addTask(task));
                                history.push('/');
                            }}
                        />
                </Grid>
            </Grid>
            
        </main>
    )
}

export default AddTask

