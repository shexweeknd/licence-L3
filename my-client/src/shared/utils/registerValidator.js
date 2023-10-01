export const validateRegisterForm = ({ username, mail, password1, password2 }) => {
    const isUsernameValid = validateUsername(username);
    const isMailValid = validateMail(mail);
    const arePasswordsValid = validatePasswords(password1, password2);
  
    return {
        username: {
            message: isUsernameValid.message,
            status: isUsernameValid.state
        },
        email: {
            message: isMailValid.message,
            status: isMailValid.state
        },
        password: {
            messsage: arePasswordsValid.message,
            status: arePasswordsValid.state
        }
    }

    // return isUsernameValid.state && isMailValid.state && arePasswordsValid.state;
  };

  const validateUsername = (username) => {
    if (username.length < 3) {
        return {
            state: false,
            message: 'nom d\'utilisateur est trop court'
        }
    } else if (username.length > 16) {
        return {
            state: false,
            message: 'nom d\'utilisateur est trop long'
        }
    }
    return {
        state: true,
        message: ""
    };
  };
  
  const validatePasswords = (password1, password2) => {
    console.log(password2)
    if (password1.length < 8) {
        return {
            state: false,
            message: 'mot de passe est trop court'
        }
    } else if (password1.length > 16) {
        return {
            state: false,
            message: 'mot de passe est trop long'
        }
    } else if (password2 !== password1) {
        return {
            state: false,
            message: 'les mots de passe ne correspondent pas'
        }
    };
    return {
        state: true,
        message: ""
    }
  }
  
  const validateMail = (mail) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!emailPattern.test(mail)) {
        return {
            state: false,
            message: "email invalide"
        }
    };
    return {
        state: true,
        message: ""
    };
  };
  