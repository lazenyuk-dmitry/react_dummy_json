import { ValidatorConfig, ValidatorResult } from "@/types";

export const validate = (value: string, config: ValidatorConfig = {}): ValidatorResult => {
  const fieldName = config.fieldName ? config.fieldName.charAt(0).toUpperCase() + config.fieldName?.slice(1) : 'Field';
  const result: ValidatorResult = {
    isValid: true,
    message: '',
  };

  if (config.minLength && value.length < config.minLength) {
    result.isValid = false;
    result.message = `${fieldName} must be at least ${config.minLength} characters`
  }

  return result;
};
