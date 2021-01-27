import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Textarea} from '../../../u2-components/common/FormsControls/FormControls'
import {maxLengthCreator, required} from '../../../utils/validators/validators'
import {Button} from 'antd';

const maxLength50 = maxLengthCreator(100)

const AddMessageForm = (props) => {
   return (
       <form onSubmit={props.handleSubmit}>
          <div>
             <Field component={Textarea}
                    name={'newMessageText'}
                    validate={[required, maxLength50]}
                    placeholder={'Enter your message'}
             />
          </div>
          <div>
             <Button>Send message</Button>
          </div>
       </form>
   )
}

export default reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)