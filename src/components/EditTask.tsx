import React, { useContext } from "react";
import { RouteComponentProps } from "react-router-dom"
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

import { globalStyles } from "../styles/globalStyles"
import history from '../routers/History';
import TaskForm from "./TaskForm";
import Context from '../context/tasksContext';
import { editTask, removeTask } from "../actions/TaskActions";


//  styling the component 
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
        floatRight: {
            float: "right",
        }
    }),
);



interface RouterProps {
    id: string;
}


interface IComponentProps extends RouteComponentProps<RouterProps> {
}


// this Componet helps to Edit a task 
const EditTask: React.FC<IComponentProps> = (props) => {


    const globalClasses = globalStyles();
    const classes = useStyles();



    
    const { state, dispatch } = useContext(Context);



    //  ID used to help  find our desired task to Edit
    
    const selectedTask = state.find((task) => task.id === props.match.params.id)


    // this state and handlers will use to handle the state of dialog to confirm deleting
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <main className={globalClasses.content}>
            <div className={globalClasses.drawerHeader} />

            <Grid container justify="center" alignItems="center">
                <Grid item xs={12} sm={12} md={6}>


                    <h1> Edit Task


                    {/* 
                         Button handle remove a task based on ID
                        
                    */}
                        <Button
                            className={classes.floatRight}
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={handleClickOpen} >
                            Remove Task
                        </Button>

                        <Dialog
                            open={openDialog}
                            onClose={handleCloseDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">Are You Sure to Delete the Task</DialogTitle>
                            <DialogContent dividers>
                                <DialogContentText id="alert-dialog-description">
                                    <ReportProblemOutlinedIcon color="secondary" style={{ fontSize: 40 }} />
                                    <br />
              
                                    This action can delete your task and you can not restore it. 
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" onClick={handleCloseDialog} color="primary" autoFocus>
                                    No I'm Not
                                </Button>
                                <Button variant="contained" onClick={() => {
                                    dispatch(removeTask(props.match.params.id));
                                    props.history.push('/');
                                }} color="secondary" >
                                    Yes I'm Sure
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </h1>



                    <Divider light className={classes.horizontalDivider} />


                    {/* 
                       
                         editing and redirecting user to dashboard home page
                    */}
                    <TaskForm
                        task={selectedTask}
                        onSubmit={(task) => {
                            dispatch(editTask(props.match.params.id, task));
                            history.push('/');
                        }}
                    />
                </Grid>
            </Grid>

        </main>

    )
}

export default EditTask;