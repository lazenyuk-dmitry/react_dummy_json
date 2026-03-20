export interface ValidatorConfig {
  fieldName?: string;
  minLength?: number;
}

export interface ValidatorResult {
  isValid: boolean;
  message: string;
}
