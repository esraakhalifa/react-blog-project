import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { setTokens } from '../utils/authService';
import { useNavigate } from 'react-router-dom';

// Define validation schema
const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
};

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/'); // Redirect to home
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center text-2xl font-bold mb-4">Login</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
              try {
                const response = await axios.post(
                  'http://localhost:8000/posts/author/login/',
                  values,
                  { headers: { 'Content-Type': 'application/json' } }
                );
                setTokens(response.data);
                resetForm();
                setShowModal(true); // show success modal
              } catch (error) {
                if (error.response && error.response.data) {
                  setErrors(error.response.data);
                } else {
                  alert('Something went wrong. Please try again later.');
                }
                console.error('Error during login:', error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div className="form-control">
                  <label className="label" htmlFor="username">
                    <span className="label-text">Username</span>
                  </label>
                  <Field type="text" name="username" className="input input-bordered w-full" />
                  <ErrorMessage name="username" component="div" className="text-error text-sm mt-1" />
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="password">
                    <span className="label-text">Password</span>
                  </label>
                  <Field type="password" name="password" className="input input-bordered w-full" />
                  <ErrorMessage name="password" component="div" className="text-error text-sm mt-1" />
                </div>

                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                    {isSubmitting ? <span className="loading loading-spinner"></span> : 'Login'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* ✅ Success Modal */}
      {showModal && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Login Successful!</h3>
            <p className="py-4">
            🔐 Welcome back to <strong>Maktoob</strong><br />
            Access your journey, where every session writes a new line.<br />
            Log in, sync your path, and continue where destiny left off.
          </p>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleCloseModal}>Continue</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Login;
