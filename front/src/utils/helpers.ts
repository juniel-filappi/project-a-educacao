import type { ErrorObject } from "@vuelidate/core";

export const setMaskCpf = (cpf: string) => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export function mapErrorsValidation(errors: ErrorObject[]): string[] {
  return errors.map(error => error.$message) as string[];
}
