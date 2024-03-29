import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../redux/actions/authentication';
import classnames from 'classnames';
import ActionBtn from '../common/ActionBtn/';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirm: '',
      errors: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    };
    this.props.registerUser(user, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    const { errors } = this.state;
    const { t } = this.props;
    return (
      <div className='container' style={{ marginTop: '50px', width: '700px' }}>
        <h2 style={{ marginBottom: '40px' }}>{t('Auth.register')}</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              placeholder={t('Auth.usernameInput')}
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.name
              })}
              name='username'
              onChange={this.handleInputChange}
              value={this.state.username}
            />
            {errors.name && (
              <div className='invalid-feedback'>{errors.name}</div>
            )}
          </div>
          <div className='form-group'>
            <input
              type='email'
              placeholder={t('Auth.emailInput')}
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.email
              })}
              name='email'
              onChange={this.handleInputChange}
              value={this.state.email}
            />
            {errors.email && (
              <div className='invalid-feedback'>{errors.email}</div>
            )}
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder={t('Auth.passwordInput')}
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.password
              })}
              name='password'
              onChange={this.handleInputChange}
              value={this.state.password}
            />
            {errors.password && (
              <div className='invalid-feedback'>{errors.password}</div>
            )}
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder={t('Auth.passwordInput')}
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.password_confirm
              })}
              name='password_confirm'
              onChange={this.handleInputChange}
              value={this.state.password_confirm}
            />
            {errors.password_confirm && (
              <div className='invalid-feedback'>{errors.password_confirm}</div>
            )}
          </div>
          <div className='form-group'>
            <ActionBtn type='submit' title={t('Auth.register')} />
          </div>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withNamespaces('common')(
  connect(mapStateToProps, { registerUser })(withRouter(Register))
);
