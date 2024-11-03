import { FormGroup } from '@angular/forms';

declare module '@angular/forms' {
  interface FormGroup {
    GetDate(controlName: string): Date;
  }
}
FormGroup.prototype.GetDate = function (controlName: string): Date {
  const dateValue = this.get(controlName)?.value;
  if (dateValue && typeof dateValue === 'string') {
    const [year, month, day] = dateValue.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
  return new Date();
};
