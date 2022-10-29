import { Switch } from 'react-router-dom'; 

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Customer from '../pages/Customer';
import Historic from '../pages/Historic';
import Completed from '../pages/Completed';

export default function Routes() {
    return(
        <Switch>
            <Route exact path="/" component={SignIn}/>
            <Route exact path="/register" component={SignUp}/>
            <Route exact path="/dashboard" component={Dashboard} isPrivate/>
            <Route exact path="/profile" component={Profile} isPrivate/>
            <Route exact path="/customer" component={Customer} isPrivate/>
            <Route exact path="/historic" component={Historic} isPrivate/>
            <Route exact path="/completed" component={Completed} isPrivate/>
        </Switch>
    )
}