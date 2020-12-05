import React from 'react';
import s from './FormControls.module.css'

const FormControl = ({input, meta, child, ...props}) => {
   const hasError = meta.touched && meta.error
   return (
      <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
         <div>
            {props.children}
         </div>
         {hasError && <span>{meta.error}</span>}
      </div>
   )
}

export const Textarea = (props) => {
   const {input, meta, ...restProps} = props
   return <FormControl {...props}><textarea {...input}{...restProps}/></FormControl>
}

export const Input = (props) => {
   const {input, meta, ...restProps} = props
   return <FormControl {...props}><input {...input}{...restProps}/></FormControl>
}


/*const Element = Element => ({ input, meta, ...props }) => {
   const hasError = meta.touched && meta.error;
   return (
      <div className={ s.formControl + " " + (hasError ? s.error : "") }>
         <Element {...input} {...props} />
         { hasError && <span> { meta.error } </span> }
      </div>
   );
};

А потом просто его импортим в компоненту формы, вызываем как

const Textarea = Element("textarea");

и передаем

<Field component={Textarea} .../>

P.S. Аргумент у HOC должен быть с большой буквы, чтобы React понимал, что перед ним не обычный html-тег, а компонент/переменная.
P.P.S. Создавать const Textarea = Element("textarea"); нужно вне компонента с формой. Иначе фокус с формы сбрасывается после первого символа (хз почему, видимо, ререндерится)

*/

