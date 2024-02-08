import { UntypedFormGroup } from "@angular/forms";

export class ValidationsForm {

    static match(firstControlName, secondControlName, customError = 'mismatch') {
        return (fg: UntypedFormGroup) => {
            return fg.get(firstControlName).value === fg.get(secondControlName).value ? null : fg.get(secondControlName).setErrors({'no-same': true});
        };
    }

}