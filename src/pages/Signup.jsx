import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Define the validation schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be at most 50 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be at most 50 characters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

// Initial form values
const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};

const Signup = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/'); // Redirect to home

  };
  const { t, i18n } = useTranslation();

  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  // };

  // Handle RTL
  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center text-2xl font-bold mb-4">
            Register
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async(values, { setSubmitting, resetForm, setErrors }) => {
              const { firstName, lastName, email, username, password, confirmPassword } = values;

              const payload = {
                first_name: firstName,
                last_name: lastName,
                email,
                username,
                password,
                confirm_password: confirmPassword,
              };

              try {
                 await axios.post('http://localhost:8000/posts/author/register/',payload, {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
                
                resetForm();
                setShowModal(true); 
              } catch (error) {
                // Handle error responses
                if (error.response && error.response.data) {
                  // Assuming API sends validation errors as key:value pairs
                  setErrors(error.response.data);
                } else {
                  alert('Something went wrong. Please try again later.');
                }
                console.error('Error during registration:', error);
              } finally {
                setSubmitting(false);
              }
            
            }}
            
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                {/* First Name Field */}
                <div className="form-control">
                  <label className="label" htmlFor="firstName">
                    <span className="label-text">First Name</span>
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    className="input input-bordered w-full"
                    placeholder="Enter your first name"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-error text-sm mt-1"
                  />
                </div>

                {/* Last Name Field */}
                <div className="form-control">
                  <label className="label" htmlFor="lastName">
                    <span className="label-text">Last Name</span>
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    className="input input-bordered w-full"
                    placeholder="Enter your last name"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-error text-sm mt-1"
                  />
                </div>

                {/* Email Field */}
                <div className="form-control">
                  <label className="label" htmlFor="email">
                    <span className="label-text">Email</span>
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="input input-bordered w-full"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-error text-sm mt-1"
                  />
                </div>

                {/* Username Field */}
                <div className="form-control">
                  <label className="label" htmlFor="username">
                    <span className="label-text">Username</span>
                  </label>
                  <Field
                    type="text"
                    name="username"
                    className="input input-bordered w-full"
                    placeholder="Enter your username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-error text-sm mt-1"
                  />
                </div>

                {/* Password Field */}
                <div className="form-control">
                  <label className="label" htmlFor="password">
                    <span className="label-text">Password</span>
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="input input-bordered w-full"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-error text-sm mt-1"
                  />
                </div>

                {/* Confirm Password Field */}
                <div className="form-control">
                  <label className="label" htmlFor="confirmPassword">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="input input-bordered w-full"
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-error text-sm mt-1"
                  />
                </div>

                {/* Submit Button */}
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      'Register'
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {showModal && (
          <dialog open className="modal modal-open">
            <div className="modal-box">
            <h3 className="font-bold text-lg">{t("registration_success_title")}</h3>
              <p className="py-4" dangerouslySetInnerHTML={{ __html: t("registration_success_message") }}></p>

              <div className="modal-action">
                <button className="btn btn-primary" onClick={handleCloseModal}>Continue</button>
              </div>
            </div>
          </dialog>
        )}
    </div>

  );
};

export default Signup;
