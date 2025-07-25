import Joi from "joi"; 

// export
export const validatedData = (schema: Joi.ObjectSchema<any>, data: any) => {
  const { error, value } = schema.validate(data);
  if (error) {
    const errData = error.details;
    // Log.error(JSON.stringify(errData));
    // Log.error(JSON.stringify(value));
    let errMessages = "";

    errData.forEach((val) => {
      errMessages += val.message + ", ";
    });
    return errMessages != "" ? errMessages : "Error: Validating data";
  }
  return null;
};

export const validation = {
  // user: (data: any) => validatedData(userValidatorSchema, data),
};
