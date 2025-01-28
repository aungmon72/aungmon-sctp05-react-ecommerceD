
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useLocation } from 'wouter';
import { useFlashMessage } from './FlashMessageStore';
import { useJwt } from './UserStore';
console.log("UserPassword.jsx");
function UserPassword() {
  const [, setLocation] = useLocation();
  const { showMessage } = useFlashMessage();

  // Inside the UserLogin component
  const { setJwt } = useJwt();
  
  const initialValues = {
    email: '',
    password: '',
    passwordNew1: '',
    passwordNew2: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    passwordNew1: Yup.string().min(8, 'Password must be at least 8 characters').required('New Password is required')
    .test('not-equal','Passwords must not match',
          function (value) {
              const { password } = this.parent;
              return value !== password;
          }
    ),
    passwordNew2: Yup.string().oneOf([Yup.ref('passwordNew1'), null], 'Passwords must match').required('Confirm Password is required'),
  });

  const handleSubmit = async (values, actions) => {
    console.log("values & actions  ==  ",  values, " & ", actions)
    try {
      
      const response = await axios.post(import.meta.env.VITE_API_URL + '/api/users/password', values);
      console.log('Password change successful:', response.data);
      console.log("response.data.token   == ", response.data.token)
      // todo: store the JWT 
      setJwt(response.data.token); // Store the JWT
      actions.setSubmitting(false);
      showMessage('Password change successful!', 'success');
      setLocation('/');
    } catch (error) {
      console.error('Password change error:', error);
      actions.setErrors({ submit: error.response.data.message });      
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {function(formik) {
          return (
            <Form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field type="email" id="email" name="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <Field type="password" id="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="passwordNew1" className="form-label">Enter a New Password</label>
                <Field type="password" id="passwordNew1" name="passwordNew1" className="form-control" />
                <ErrorMessage name="passwordNew1" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label htmlFor="passwordNew2" className="form-label">Re Enter the New Password</label>
                <Field type="password" id="passwordNew2" name="passwordNew2" className="form-control" />
                <ErrorMessage name="passwordNew2" component="div" className="text-danger" />
              </div>


              {formik.errors.submit && <div className="alert alert-danger">{formik.errors.submit}</div>}

              <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? 'Changing Password...' : 'Change Password'}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}


export default UserPassword;