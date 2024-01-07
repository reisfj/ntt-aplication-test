import { cpf as validateCpfCnpj } from 'cpf-cnpj-validator';

export class CpfCnpjValidator {
  isValid(value: string): boolean {
    return validateCpfCnpj.isValid(value);
  }
}
