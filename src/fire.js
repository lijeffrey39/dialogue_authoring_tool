var firebase = require('firebase');

var config = {
	apiKey: "AIzaSyBoZTjnkCgwL1bMX9MJcnECHXjCcKPRnEY",
	authDomain: "test-ad0a1.firebaseapp.com",
	databaseURL: "https://test-ad0a1.firebaseio.com",
	projectId: "test-ad0a1",
	storageBucket: "test-ad0a1.appspot.com",
	messagingSenderId: "77517278344"
};
var fire = firebase.initializeApp(config);
export default fire;

