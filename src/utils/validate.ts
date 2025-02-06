type UserInfomation = {
  email: string;
  password: string;
};

function validateLogin(values: UserInfomation) {
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

export default validateLogin;
