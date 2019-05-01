import React, { Fragment, useState } from 'react';
import axios from 'axios';

// import classnames from 'classnames';


const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Passwords do not match');
    } else {
      const newUser = {
        name,
        email,
        password,
      }

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        const body = JSON.stringify(newUser);

        const res = await axios.post();
      } catch (err) {

      }
    }
  }

  return (
      <Fragment>
      <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                  <input
                    type="text"
                    className='form-control form-control-lg'
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={e => onChange(e)}
                    required
                  />
                  {/* {errors.name && (<div className="invalid-feedback">{errors.name}</div>)} */}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className='form-control form-control-lg'
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                    required
                  />
                  {/* {errors.email && (<div className="invalid-feedback">{errors.email}</div>)} */}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className='form-control form-control-lg'
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={e => onChange(e)}
                    required
                  />
                  {/* {errors.password && (<div className="invalid-feedback">{errors.password}</div>)} */}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className='form-control form-control-lg'
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={e => onChange(e)}
                    required
                  />
                  {/* {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)} */}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
      </Fragment>
    );
  }

export default Register;
