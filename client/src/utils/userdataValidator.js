export default async function UserdataValidator(email, password, username) {
    const passValid = checkPassword(password);
    const emailValid = checkEmail(email);
    const usernameValid = username === undefined ? true : checkUsername(username);
    if (passValid && emailValid && usernameValid) {
        return await checkUnique(email, username);
    } else {
        return {emailValid, usernameValid, passValid}
    }
}

const checkPassword = password => password.length >= 4;

const checkEmail = email => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const checkUsername = username => username.length > 3;

const checkUnique = async (email, username) => {
    const result = {
        passValid: true,
        usernameValid: true,
        emailValid: true
    };
    const response = await fetch('/valid', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, username })
    });
    const rs = await response.json();
    if (rs.email) {
        result.emailValid = false;
    } 
    if (rs.username) {
        result.usernameValid = false;
    }
    return result;
}