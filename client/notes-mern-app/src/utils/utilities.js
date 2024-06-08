function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validateUsername(username) {
  const usernameRegex = /^(?=.{3,16}$)(?![-_])[a-zA-Z0-9-_]+(?<![-_])$/;
  return usernameRegex.test(username);
}

export default { validateEmail, validateUsername };
