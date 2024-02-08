import { UntypedFormGroup } from "@angular/forms";

export class ValidationsForm {

    static match( firstControlName, secondControlName, customError = 'mismatch') {
        return (fg: UntypedFormGroup) => {
            return  fg.get(firstControlName).value >= fg.get(secondControlName).value ? null : fg.get(secondControlName).setErrors({'no-same': true});
        };
    }

    static matchValidation( firstControlName, secondControlName, customError = 'mismatch') {
        return (fg: UntypedFormGroup) => {
            return fg.get('status').value === 2 && fg.get(firstControlName).value > fg.get(secondControlName).value ? fg.get(firstControlName).setErrors({'no-same': true}) : null;
        };
    }

    static matchValidationOrders( firstControlName, secondControlName, customError = 'mismatch') {
        return (fg: UntypedFormGroup) => {
            return fg.get('payment_status').value === 2 && fg.get(firstControlName).value > fg.get(secondControlName).value ? fg.get(firstControlName).setErrors({'no-same': true}) : null;
        };
    }

    static bailsValidation(firstControlName, customError = 'mismatch') {
        return (fg: UntypedFormGroup) => {
            return fg.get(firstControlName).value > (fg.get('total').value - fg.get('total_bails').value) ? fg.get(firstControlName).setErrors({'no-same': true}) : null;
        };
    }

}