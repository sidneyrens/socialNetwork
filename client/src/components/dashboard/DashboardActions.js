import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light"
      ><i className="fas fa-user-circle text-prime"></i> Edit Profile</Link>
      <Link to="/add-experience" className="btn btn-light"
      ><i className="fab fa-black-tie text-prime"></i> Add Experience</Link>
      <Link to="/add-education" className="btn btn-light"
      ><i className="fas fa-graduation-cap text-prime"></i> Add Education</Link>

    </div>
  )
}

export default DashboardActions
