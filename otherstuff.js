import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	NavLink as Link,
	Route
} from 'react-router-dom';

var config = {
	apiKey: "AIzaSyCIhiU_oFNeLMKBknUiFwmCgFY9lPPOGWk",
	authDomain: "makeupstash-a40d9.firebaseapp.com",
	databaseURL: "https://makeupstash-a40d9.firebaseio.com",
	projectId: "makeupstash-a40d9",
	storageBucket: "makeupstash-a40d9.appspot.com",
	messagingSenderId: "797334375717"
};
firebase.initializeApp(config);

const database = firebase.database().ref('/makeupStash');

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			inventoryListItem: []
			
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	// Remove onChange. Not necessary for site's functionality
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		console.log(database);
		const {inventoryListItem} = this.state; 
		inventoryListItem.push(this.state.inventoryListItem);
		this.setState({
			inventoryListItem: []
		});
	}
	componentDidMount() {
		database.on('value', (snapshot) => {
			const databaseListItems = snapshot.val();
			const newListItems = [];
			for (let key in databaseListItems) {
				// Console.log so you know what's going on
				// console.log('key', key);
				// console.log('todos', dbTodos[key]);
				newListItems.push({
					key: key,
					description: databaseListItems[key]
				});
			}
			// console.log(newTodos);
			this.setState({
				inventoryListItem: newListItems
			});
		});
	}
	render() {
		return(
			<main>
				<h1>Makeup Stash</h1>
				<form onSubmit={this.handleSubmit}>
					<h2>Personal Inventory</h2>
					<input name="inventoryListItem" type="text" placeholder="Enter Makeup Product"/>
					<input type="submit" onChange={this.handleChange} value={this.state.inventoryListItem} value="Add to Inventory"/>
					<ul>
						
					</ul>
				</form>
				<form>
					<h2>Wishlist</h2>
					<input name="wishListItem" type="text" placeholder="Enter Makeup Product"/>
					<input type="submit" value="Add to Wishlist"/>
				</form>
					<ul>
						
					</ul>
			</main>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));