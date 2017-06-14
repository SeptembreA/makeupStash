import React from 'react';
import ReactDOM from 'react-dom';
import {SectionsContainer, Section} from 'react-fullpage';
// import rsScroller from 'react-smooth-scroller';

var config = {
	apiKey: "AIzaSyCIhiU_oFNeLMKBknUiFwmCgFY9lPPOGWk",
	authDomain: "makeupstash-a40d9.firebaseapp.com",
	databaseURL: "https://makeupstash-a40d9.firebaseio.com",
	projectId: "makeupstash-a40d9",
	storageBucket: "makeupstash-a40d9.appspot.com",
	messagingSenderId: "797334375717"
};

firebase.initializeApp(config);

const auth = firebase.auth();
const databaseRef = firebase.database().ref('wishlistitems');
const provider = new firebase.auth.GoogleAuthProvider();
const rsScroller = require('react-smooth-scroller');


databaseRef.on('value', (data) => {
	console.log(data.val());
});

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			wishListItems: [],
			currentItem: '',
			loggedIn: false,
			user: null
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit (event) {
		event.preventDefault();
		const userId = this.state.user.userId;
		const databaseRef = firebase.database().ref(`wishlistitems`);
		databaseRef.push(this.state.currentItem);
		this.setState({
			currentItem: ''
		});
	}
	removeItem(key) {
		const userId = this.state.user.userId;
		const itemRefCode = firebase.database().ref(`/wishlistitems/${key}`)
		itemRefCode.remove();
	}

	login() {
		auth.signInWithPopup(provider)
			.then((result) => {
				const user = result.user;
				this.setState({
					user: user,
					loggedIn: true
				})
			});
	}
	logout() {
		auth.signOut()
			.then(() => {
				this.setState({
					user: null,
					loggedIn: false
				});
			});
	}
	render() {
		let options = {
			sectionClassName: 'section',
			anchors: ['sectionOne', 'sectionTwo', 'sectionThree'],
			scrollBar: false,
			navigation: true,
			verticalAlign: false,
			arrowNavigation: false
		    };
		const showItems = () => {
			console.log(this.state)
			if (this.state.loggedIn === true) {
				return (
					<ul>
					{this.state.wishListItems.map((item) => {
						return (
							<li key={item.key}>
								{item.description}
								<button onClick={() => this.removeItem(item.key)}><i className="fa fa-minus" aria-hidden="true"></i></button>
							</li>
						)
					})}
				</ul>
				)
			}
		}
		return (
			<SectionsContainer className="SectionContainer" {...options}>
			<main>
				<Section className="sectionOne">
					<div className="headerDiv">
						<h1 className="makeuph1">Makeup</h1>
						<h1 className="stashh1">Stash</h1>
						<h2>Your online makeup organizer</h2>
						<div className="buttonDiv">
							<button onClick={this.login} className="button1">Log In/Sign Up</button>
							<button onClick={this.logout}>Log Out</button>
						</div>
					</div>
				</Section>
				<Section className="sectionTwo">
				<span className="circle"></span>
					<div className="brandTitleDiv">
						<p>Having trouble keeping track of all the makeup you own? That’s where <span className="soloTitle">Makeup Stash</span> comes in! Use our personal database to create an inventory of the makeup you want or the makeup you already have.</p>
						</div>
					<div className="listHeaders">
						<form onSubmit={this.handleSubmit}>
							<p>Enter item name</p>
							<input type="text" name="currentItem" placeholder="eg. NYX Liquid Suede Lipstick in Amethyst" onChange={this.handleChange} value={this.state.currentItem}/>
							<input type="submit" value="Submit"/>
						</form>
					</div>
				</Section>
				<Section className="sectionThree">
					<h4>Makeup List</h4>
					<div className="borderDiv">
						<div className="lists">
							<div className="listContainer">
								{showItems()}
							</div>
							
						</div>
					</div>
					<section className="footer">
						<p>Designed and Created by <a href="https://septembreanderson.com/">Septembre Anderson</a>. Background vector created by <a href="http://www.freepik.com/free-photos-vectors/background">Freepik</a>.</p>
					</section>
				</Section>
			</main>
			</SectionsContainer>
		)
	}
	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				console.log('User is logged in!');
				this.setState({
					user: user,
					loggedIn: true
				});
			const userId = user.uid;
			const databaseRef = firebase.database().ref('wishlistitems');
		databaseRef.on('value', (snapshot) => {
			const databaseItems = snapshot.val();
			const newItems = [];

			for(var key in databaseItems){
				newItems.push({
				key: key,
				description: databaseItems[key]
			});
		}

		this.setState({
			wishListItems: newItems
		});
	});
		} else { 
			console.log('User is not logged in.');
			this.setState({
				user: null,
				loggedIn: false
			})
		}
	});
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));