export const validateLoginForm = ({ mail, password }) => {
  const isMailValid = validateMail(mail);
  const isPasswordValid = validatePassword(password);

  return isMailValid.state && isPasswordValid.state;
};

const validatePassword = (password) => {
  if (password.length < 8) {
    return {
      state: false,
      message: "mot de passe trop court"
    }
  } else if (password.length > 16) {
    return {
      state: false,
      message: 'mot de passe trop long'
    }
  };
  return {
    state: true,
    message: ""
}
};

const validateMail = (mail) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(mail)) {
    return {
      state: false,
      message: "email invalide"
    }
  };
  return {
    state: true,
    message: ""
}
};
