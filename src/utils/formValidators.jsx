export const generateEmptyInputMessage = (input) => {
  if (!input.value) {
    const inputName = input.name.split("_").join(" ");
    return `Don't forget the shop's ${inputName}!`;
  }
};
