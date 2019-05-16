import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
// import Spinner from '../../img/giphy.gif'
import ProfileItem from './ProfileItem'

// Redux
import { connect } from 'react-redux'
import { getAllProfiles } from '../../actions/profile'

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  return (<Fragment>
    {loading ? ('Loading...') : <Fragment>
      <h1 className="large text-prime">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with developers
      </p>
      <div className="profiles">
        {profiles !== null ? (profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ))
        ) : (<h4>No profiles found...</h4>)}
      </div>
    </Fragment>}
  </Fragment>)
}

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getAllProfiles })(Profiles)
