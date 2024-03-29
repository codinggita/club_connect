const User = require('../models/User');
const {hashPassword, comparePassword} = require('../helpers/auth');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const test = (req, res) => {
	res.json('test route is chal raha hai');
}

//REGISTRATION API 
const registerUser = async (req, res) => {
	try {
		const{name, regno, number, email, password, orgName, domainName, slot} = req.body;

		//checks if user already exists
		if(!name){
			return res.json({
				error: 'Name is required'
			})
		};
		//check if password is good
		if(!password || password.length < 6){
			return res.json({
				error: 'Password is weak, atleast 6 characters needed.'
			})
		};
		//check unique email
		const exist = await User.findOne({email});
		if(exist){
			return res.json({
				error: 'Email is already registered, please login'
			})
		}

		const hashedPassword = await hashPassword(password);
		
		// Create a user in database.
		const user = await User.create({name, regno, number, email, password: hashedPassword, orgName, domainName, slot});

		return res.json(user)

	} catch (error) {
		console.log(error)
	}
}



// LOGIN API
const loginUser = async (req, res) => {
	// console.log("during Login",email,password)
	try {
		const {email, password} = req.body;

		// Check if User Exists ya nahi
		const user = await User.findOne({email});
		if(!user){
			return res.json({
				error: 'No user found'
			})
		}

		// Check if password is correct ya galat
		const match = await comparePassword(password, user.password);
		if(match){
			// create jwt token
			jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
				if(err) throw err;
				res.cookie('token', token).json({
					token,
					user
				})
			})
			return res.json('password matched');
		}
		if (!match){
			return res.json({
				error: 'Wrong Password'
			})
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = { 
	test,
	registerUser,
	loginUser,
}