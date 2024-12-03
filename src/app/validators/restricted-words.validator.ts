import { AbstractControl, ValidationErrors } from '@angular/forms';

/** Проверяет текстовое поле на наличие запрещенных слов */
export function restrictedWordsValidator(values: string[]) {
  return (control: AbstractControl): ValidationErrors | null => {
    const invalidWordsList: (string | null)[] = values
      .map((value: string) => (control.value?.includes(value) ? value : null))
      .filter((word: string | null) => word !== null);

    return invalidWordsList.length > 0
      ? { restricted: invalidWordsList.join(', ') }
      : null;
  };
}
