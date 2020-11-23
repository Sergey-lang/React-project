import React from 'react';
import s from './Login.module.css';
import {Field, reduxForm} from 'redux-form';
import {Input} from '../common/FormsControls/FormControls';
import {required} from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';

export const LoginForm = (props) => {
   return (
      <form onSubmit={props.handleSubmit}>
         <div>
            <Field placeholder={'Login'}
                   name={'login'}
                   component={Input}
                   validate={[required]}
            />
         </div>
         <div>
            <Field placeholder={'Password'}
                   name={'password'}
                   type={'password'}
                   component={Input}
                   validate={[required]}
            />
         </div>
         <div>
            <Field type={'checkbox'}
                   name={'rememberMe'}
                   component={Input}
                   validate={[required]}
            />Remember me
         </div>
         <div>
            <button>Login</button>
         </div>
         {props.error &&  <div className={s.formSummaryError}>{props.error}</div>}
      </form>
   )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
   const onSubmit = (formData) => {
      props.login(formData.login, formData.password, formData.rememberMe)
   }
   if (props.isAuth) {
      return <Redirect to={'/profile'}/>
   }
   return (
      <div className={s.login}>
         <h1>Login</h1>
         <LoginReduxForm onSubmit={onSubmit}/>
      </div>
   )
}

const mapStateToProps = (state) => ({
   isAuth: state.auth.isAuth

})

export default connect(mapStateToProps, {login})(Login)
