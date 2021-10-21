import React from 'react';
import { Link } from 'react-router-dom';
import { ImLeaf } from 'react-icons/im';
import { login } from '../../actions/session_actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  demoUser: {
    email: 'groot@guardians.gal',
    password: 'groot123',
  },
});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
});

const Welcome = (props) => {
  return (
    <main>
      <div className='white-box'>
        <div className='flex-col-center'>
          <h2>Welcome to</h2>
          <h1 className='title-header'>PlantPress</h1>

          <Link to='/login'>
            <button>Log In</button>
          </Link>
          <Link to='#'>
            <button
              onClick={() => props.login(props.demoUser)}
              className='d-flex justify-content-center splash-login'
            >
              Demo
            </button>
          </Link>
          <Link to='/signup'>Create A New Account</Link>
        </div>
      </div>
    </main>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
