/** @format */

import React, { Component } from 'react';
import Login from './components/Login';
import MyAccount from './components/MyAccount';
import Register from './components/Register';
import Home from './components/Home';
import ChangePassword from './components/ChangePassword';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import Translation from './components/Authentication';
import Notification from './components/Notification';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { createBrowserHistory } from 'history';
import { verifyAuthentication } from './redux/Authentication/action';
import PublicRoute from './components/PublicRoute';
import EmailConfirmation from './components/SuccessRegitester';
import Dashboard from './components/Dashboard';
import Homepage from './components/Homepage';
import ResetPassword from './components/ResetPassword';
import ImagePage from './components/ImagePage';
import ImagePageUpload from './components/ImagePageUpload';
import VideoPage from './components/VideoPage';
import VideoPageUpload from './components/VideoPageUpload';
import Background from './images/Back.jpg';
import Help from './components/Help';
function App() {
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				backgroundImage: `url(${Background})`,
				backgroundRepeat: 'no-repeat',
				    backgroundSize: 'cover'
			}}>
			<BrowserRouter>
				<Switch>
					<Route path='/help' component={Help}/>
					<Route path='/reset-password/:id' component={ResetPassword} />
					<PublicRoute exact path='/' component={Homepage} />
					<PublicRoute path='/login' component={Login} />
					<PrivateRoute path='/account' component={MyAccount} />
					<PublicRoute path='/register' component={Register} />
					<PublicRoute path='/ChangePassword' component={ChangePassword} />
					<Route path='/email-confirmation' component={EmailConfirmation} />
					<PrivateRoute exact path='/dashboard' component={Dashboard} />
					<PrivateRoute
						exact
						path='/portofoliu/imagini'
						component={ImagePage}
					/>{' '}
					<PrivateRoute exact path='/portofoliu/video' component={VideoPage} />
					<PrivateRoute
						exact
						path='/portofoliu/upload/video'
						component={VideoPageUpload}
					/>
					<PrivateRoute
						path='/portofoliu/upload/image'
						component={ImagePageUpload}
					/>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		verifyAuthentication: () => dispatch(verifyAuthentication()),
	};
};

export default connect(null, mapDispatchToProps)(App);
