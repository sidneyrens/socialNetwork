import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';


const Login = ({ login, isAuthenticated }) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  }

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Fragment>
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign In</h1>
          <p className="lead text-center">Sign into your DevConnector account</p>
          <form noValidate onSubmit={e => onSubmit(e)}>
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
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" value='Login' />
          </form>
          <p className="my-1">
            Don't have an account? <Link to="/register"> Sign up.</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { login })(Login);
