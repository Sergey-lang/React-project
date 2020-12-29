import React from 'react'
import {reduxForm} from 'redux-form'
import {CreateField, Input} from '../../u2-components/common/FormsControls/FormControls'
import {required} from '../../utils/validators/validators'
import {connect} from 'react-redux'
import {login} from '../../u4-redux/auth-reducer'
import {Redirect} from 'react-router-dom'

import s from './Login.module.css'

export const LoginForm = ({handleSubmit, error, captchaUrl}) => {

   return (
       <form onSubmit={handleSubmit}>
          <p>Use test data</p>
          <p>Email: free@samuraijs.com</p>
          <p>Password: free</p>
          {CreateField('Login', 'login', [required], Input,)}
          {CreateField('Password', 'password', [required], Input, {type: 'password'})}
          {CreateField(null, 'rememberMe', [], Input, {type: 'checkbox'}, 'remember me')}
          <div>
             <button>Login</button>
          </div>
          {
             captchaUrl && <img src={captchaUrl} alt='captcha'/>
          }
          {
             captchaUrl && CreateField('Symbols from image', 'captcha', [required], Input, {})
          }
          {error && <div className={s.formSummaryError}>{error}</div>}
       </form>
   )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
   const onSubmit = (formData) => {
      props.login(formData.login, formData.password, formData.rememberMe, formData.captcha)
   }
   if (props.isAuth) {
      return <Redirect to={'/profile'}/>
   }
   return (
       <div className={s.login}>
          <h1>Login</h1>
          <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
       </div>
   )
}

const mapStateToProps = (state) => ({
   isAuth: state.auth.isAuth,
   captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(Login)
