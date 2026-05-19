const errorFormatter = (errors) => {
  const result = [];

  for (let error in errors) {
    result.push({ [error]: errors[error].message })
  }
  
  return result;
}

export default errorFormatter;