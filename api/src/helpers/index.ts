export function clearCpf(cpf: string): string {
  return cpf.replace(/\D/g, '');
}
