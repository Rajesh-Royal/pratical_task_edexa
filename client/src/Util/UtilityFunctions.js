export const validateEmail = (email) => {
  const result =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return result.test(String(email).toLowerCase());
};

export const validateUsername = (userName) => {
  const res = /^[a-z0-9_\.]+$/.exec(userName);
  const valid = !!res;
  return valid;
};

// dumbest age validation
export const validateUserAge = (userAge) => {
  const res = /^[1-9]?[0-9]{1}$|^100$/.exec(userAge);
  const valid = !!res;
  return valid;
};
