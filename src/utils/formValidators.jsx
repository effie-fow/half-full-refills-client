export const generateEmptyInputMessage = (input) => {
  if (!input.value) {
    const inputName = input.name.split("_").join(" ");
    return `Looks like you forgot to add the ${inputName}! Please add the ${inputName} and try again.`;
  }
};
