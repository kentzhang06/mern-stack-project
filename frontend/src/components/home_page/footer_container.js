import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Footer } from './footer';

const mSTP = (state, ownProps) => ({
  user: state.session.user,
});

// const mDTP = dispatch => ({

// });

export default withRouter(connect(mSTP, null)(Footer));