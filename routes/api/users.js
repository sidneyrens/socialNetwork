const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

// Bring in user model
const User = require('../../models/User')

// // @route   POST api/users/register
// // @desc    Register user
// // @access  Public
router.post(
  '/register',
  [
    check('name', 'Name is required.')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      // See if user exists
      if (user) {
        return res.status(400).json({errors: [{ msg: 'User already exists'}] });
      }
      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200', // size
        r: 'g', //rating
        d: 'mm' //default
      })
      // Create a new instance of a user
      user = new User({
        name,
        email,
        avatar,
        password
      });
      // Encrypt Password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt)

      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error')
    }
  }
);

// // @route   GET api/users/login
// // @desc    Login User / Returning JWT Token
// // @access  Public
// router.post('/login', (req, res) => {

//   const email = req.body.email;
//   const password = req.body.password;

//   //find user by email
//   User.findOne({ email }).then(user => {
//     console.log(user);
//     //check for user
//     if (!user) {
//       // errors.email = 'User not found';
//       return res.status(404).json({email: 'User not found'});
//     }

//     //check password
//     bcrypt.compare(password, user.password).then(isMatch => {
//       if (isMatch) {
//         //user matched
//         // return res.json({ message: 'Success' });
//         const payload = {
//           id: user.id,
//           name: user.name,
//           avatar: user.avatar
//         };

//         // sign token
//         jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
//           res.json({
//             success: true,
//             token: 'Bearer ' + token
//           });
//         });
//       } else {
//         errors.password = 'Password incorrect'
//         return res.status(400).json(errors);
//       }
//     });
//   });
// });

// // @route   GET api/users/current
// // @desc    Return current user
// // @access  Private
// router.get('/current', passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//   res.json(req.user);
//   }
// );

module.exports = router;
