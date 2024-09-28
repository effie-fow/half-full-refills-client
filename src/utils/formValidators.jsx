export const generateEmptyInputMessage = (input) => {
  if (!input.value) {
    const inputName = input.name.split("_").join(" ");
    return `Don't forget the shop's ${inputName}!`;
  }
};

export const inputContainsNumbers = (input) => {
  const numbers = /^([^0-9]*)$/;
  const match = input.match(numbers);
  return match ? false : true;
};

export const emailIsValid = (input) => {
  const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const match = input.match(validEmail);
  return match ? true : false;
};

export const passwordIsStrong = (userPassword) => {
  const strongPassword =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const match = userPassword.match(strongPassword);
  return match ? true : false;
};
