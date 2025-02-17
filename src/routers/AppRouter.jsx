import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import CssBaseline from "@material-ui/core/CssBaseline";

import history from './History'
import Header from '../components/Header'
import TaskDashboard from '../components/TaskDashboard'
import AddTask from '../components/AddTask'
import EditTask from '../components/EditTask'
import NotFoundPage from '../components/NotFoundPage'




const AppRouter = () => (
    <Router history={history} >
        <React.Fragment>
           
            <CssBaseline />
            <Header />
            <Switch>
                <Route path="/" component={TaskDashboard} exact={true} />
                <Route path="/create" component={AddTask} />
                <Route path="/edit/:id" component={EditTask} />
                <Route component={NotFoundPage} />
            </Switch>
        </React.Fragment>
    </Router >
);

export default AppRouter;
