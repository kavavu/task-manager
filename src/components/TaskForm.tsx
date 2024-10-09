import React, { FormEvent, useState } from "react";
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';


import { ITaskItem } from "../interfaces/index"
import { TaskFormMode, TaskHistory } from "../consts/index"
import useTaskHistory from "../hooks/useTaskHistory"





//  styling the component 
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        input: {
            marginBottom: 30
        },
        select: {
            border: 0,
            fontSize: 16,
            color: "#000",
            display: "block",
            width: "100%",
            borderBottom: "1px solid rgba(0, 0, 0, 0.5)",
            marginBottom: 30,
            paddingBottom: 5
        },
        floatRight: {
            float: "right",
        }

    }),
);



interface IComponentProps {
    task?: ITaskItem | undefined;
    onSubmit: (task: ITaskItem) => void;
}





const TaskForm: React.FC<IComponentProps> = (props) => {



    
    // using defined classed in oue elements
    const classes = useStyles();



    // this error state will define to handle errors
    const [error, setError] = useState('');


    // where the Edit of Add and also first check the Mode
    const [mode] = useState(props.task ? 'edit' : 'create');



    
    const [id] = useState(props.task ? props.task.id : '');
    const [title, setTitle] = useState(props.task ? props.task.title : '');
    const [description, setDescription] = useState(props.task ? props.task.description : '');
    const [status, setStatus] = useState(props.task ? props.task.status : TaskHistory.Todo);





    //  editing a task from the saved history of the task
    
    const taskHistoryBasedStatus = useTaskHistory(status);



    
    const onTitleChange = (e: FormEvent) => {
        const title = (e.target as HTMLInputElement).value;
        setTitle(title);
    }

    
    const onDescriptionChange = (e: FormEvent) => {
        const description = (e.target as HTMLTextAreaElement).value;
        setDescription(description);
    }

    
    const onStatusChange = (e: FormEvent) => {
        const status = (e.target as HTMLSelectElement).value;
        setStatus(status);
    }



    
    const submitHandler = (e: FormEvent) => {
        e.preventDefault();


        //  checking the title and description. 
       
        if (title.trim() === "" || description.trim() === "") {
            setError("'Please fill Title and Description.'");
        }
        else {

           
            setError("");


            if (mode === TaskFormMode.Create) {
                props.onSubmit({
                    
                    id: nanoid(8),
                    title,
                    description,
                    status
                });
            }
            else {
                props.onSubmit({
                    id,
                    title,
                    description,
                    status
                });
            }
        }
    };


    return (
        <>

            {/* errors if not done properly */}

            {error &&  
            <Alert
                severity="error"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => { setError(""); }} >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {error}
            </Alert>
            }



            <form onSubmit={submitHandler}>

                <TextField
                    fullWidth
                    placeholder="Title"
                    value={title}
                    onChange={onTitleChange}
                    className={classes.input} />

                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Description"
                    value={description}
                    onChange={onDescriptionChange}
                    className={classes.input} />


                

                {mode === TaskFormMode.Edit ?
                    <select value={status} onChange={onStatusChange} className={classes.select} >
                        {taskHistoryBasedStatus.map((status: string, index) => (<option key={index}>{status}</option>))}
                    </select>
                    :
                    undefined
                }




                
                {mode === TaskFormMode.Create ?
                    <Button size="small" variant="contained" color="primary" type="submit"> Add Task </Button> :
                    <Button size="small" variant="contained" color="primary" type="submit"> Edit Task </Button>}





                {/* 
                     a cancel button for both Edit and Add situation                  
                */}
                <Button size="small" variant="contained" component={Link} to={"/"} className={classes.floatRight} >
                    Cancel
                </Button>
            </form>
        </>
    )
}

export default TaskForm