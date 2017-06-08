import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	NavLink as Link,
	Route
} from 'react-router-dom';

class SignUpPage extends React.Component {
	render() {
		return (
		)
	}
}

class LoginPage extends React.Component {
	render() {
		return (
		)
	}
}

class ListPage extends React.Component {
	render() {
		return (
		)
	}
}

class Contact extends React.Component {
	render() {
		return (
		)
	}
}

class App extends React.Component {
	render() {
		return(
			<Router>
				<main>
					<nav>
						<Link to="/">Home</Link>
						<Link to="/login">Login</Link>
						<Link to="/signup">Sign Up</Link>
						<Link to="/contact">Contact</Link>
					</nav>
					<h1>Makeup Stash</h1>
					<h2>Online cosmetics organizer</h2>
					<button>Sign Up</button>
					<button>Log In</button>
					<Route exact path="/" component={Home}/>
					<Route path="/login" component={LogIn}/>
					<Route path="/signup" component={SignUp}/>
					<Route path="/contact" component={Contact}/>
				</main>
			</Router>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));