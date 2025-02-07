type UserInfomation = {
  email: string;
  password: string;
};

function validateUser(values: UserInfomation) {
  const errors = {
    email: '',
    password: '',
  };

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Email is required';
  }

  if (!(values.password.length > 6 && values.password.length < 20)) {
    errors.password = 'Password must be between 6 and 20 characters';
  }
  return errors;
}

function validateLogin(values: UserInfomation) {
  return validateUser(values);
}

function validatesignup(values: UserInfomation & {passwordconfirm: string}) {
  const errors = validateUser(values);
  const signupErrors = {...errors, passwordconfirm: ''};

  if (values.password !== values.passwordconfirm) {
    signupErrors.passwordconfirm = 'Passwords must match';
  }

  return signupErrors;
}

export {validateLogin, validatesignup};
