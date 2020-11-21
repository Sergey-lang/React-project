import React from 'react';
import {Field,reduxForm} from 'redux-form';
import {Textarea} from '../../common/FormsControls/FormControls';
import {maxLengthCreator, required} from '../../../utils/validators/validators';

const maxLength50 = maxLengthCreator(100)

const AddMessageForm = (props) => {
   return (
      <form onSubmit={props.handleSubmit}>
         <div>
            <Field component={Textarea}
                   name={'newMessageText'}
                   validate={[required,maxLength50]}
                   placeholder={'Enter your message'}
            />
         </div>
         <div>
            <button>Send message</button>
         </div>
      </form>
   )
}

export default reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)