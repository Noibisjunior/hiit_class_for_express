//importing the model folder
const Auth = require('../model/auth');
const nodemailer = require('nodemailer');

//creating the register controller/functionality
exports.register = async (req, res) => {
  const { email,username,password } = req.body;

  if (!email ||!username || !password) {
    console.log('Please provide all the required information');
    return res.status(400).render('register', {
      msg: 'Please provide all the required information',
    });
  }

  //checking existing email
  const user = await Auth.findOne({ email });

  if (user) {
    console.log('User already exists');
    return res.status(400).render('register', { msg: 'User already exists' });
  }
  //creating the column in the database
  const newUser = await Auth.create({ ...req.body });
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'Abdulsalaamnoibi1@gmail.com',
      pass: 'mxivpkhpjtydavvj', //follow the 2-step-verification process to get the password
    },
  });

  const mailOptions = {
    from: 'Abdulsalaamnoibi1@gmail.com',
    to: req.body.email,
    subject: 'TESTING THE NODEMAILER ON MY EXPRESS APPLICATION',
    text: 'GOOD EVENING MR STEVE,MY ASSIGNMENT IS DONE AND DUSTED',
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('please check,we just sent you an email' + info.response);

      }});
    
  

  return res.status(201).redirect('login');
    }
//creating the login controller/functionality
exports.login = async (req, res) => {
  try {
    const { email,password } = req.body;

    const user = await Auth.findOne({ email });

    if (!user) {
      console.log('User does not exist in the database');
      return res
        .status(400)
        .render('login', { msg: 'User does not exist in our database' });
    }
    const userExist = await user.comparePasswords(password);
    if (!userExist) {
      return res.status(400).render('login', { msg: 'password is incorrect' });
    }

    return res.status(200).redirect('dashboard');

  } catch (error) {
    console.log(error);
  }
}

//creating controllers for the registerPage get route
exports.registerPage = (req, res) => {
  return res.render('register', { title: 'REGISTER' });
};

//creating controllers for the loginPage get route

exports.loginPage = (req, res) => {
  return res.render('login', { title: 'LOGIN' });
};

//creating controllers for the dashboard get route

exports.dashboard = (req, res) => {
  return res.render('dashboard', { title: 'DASHBOARD' });
};
