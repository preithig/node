const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const crypto = require('crypto');
const { reset } = require('nodemon');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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'
    }
  })
);

exports.getLogin = (req, res, next) => {
  let msg = req.flash('error');

  if (msg.length > 0) {
    msg = msg[0];
  } else {
    msg = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: msg
  });
};

exports.getSignup = (req, res, next) => {

  let msg = req.flash('error');

  if (msg.length > 0) {
    msg = msg[0];
  } else {
    msg = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: msg
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email/password');
        return res.redirect("/login");
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          req.flash('error', 'Invalid email/password');

          res.redirect("/login");
        })
        .catch(err => {
          console.log(err);
          res.redirect("/login");
        })

    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash(
          'error',
          'E-Mail exists already, please pick a different one.'
        );
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
          return transporter.sendMail({
            to: email,
            from: 'shop@node-complete.com',
            subject: 'Signup succeeded!',
            html: '<h1>You successfully signed up!</h1>'
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};


exports.getReset = (req, res, next) => {
  console.log('get reset...');

  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message
  });
  
};

exports.postReset = (req, res, next) => {

  console.log("post reset")

  crypto.randomBytes(32, (err, buff) => {

    if (err){
      console.log("Error while reset")
      res.redirect("/reset")
    };

    const token = buff.toString('hex');

    User.findOne({ email: req.body.email} )
    .then( user => {
        if (!user) {
          req.flash('error', 'No account with email');
          return res.redirect("/reset");
        }

        user.resetToken = token;
        user.resetTokenExp = Date.now() + 3600000;
       return user.save();
    }).

    then(result => {
      res.redirect("/");
      return transporter.sendMail({
        to: req.body.email,
        from: 'shop@node-complete.com',
        subject: 'Reset success!',
        html:  '<h1>Click the <a href="http://localhost:3000/reset/${token}"> link </a> to reset the password</h1>'
      });
    })
    .catch(err => {
      console.log(err);
    })


  })


}
