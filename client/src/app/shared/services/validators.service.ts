import { Injectable } from '@angular/core';
import { FormControl, ValidatorFn, FormArray, FormGroup, ValidationErrors, AbstractControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { UserService } from './../../users/shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService implements Validators {

  constructor(private authService: AuthService,
              private userService: UserService) { }

  /**
   * @summary Chequea La Fortaleza de la Contraseña
   *
   * @return boolean => true: válido | false = inválido
   */
   public strongPassValidator(): ValidatorFn {
    return (control: FormControl) => {
      const loweRegex: RegExp = /[0-9]/;
      const upperRegex: RegExp = /[A-Z]/;
      const numberRegex: RegExp = /[a-z]/;
      const specialRegex: RegExp = /[@!#$%^&*\s()\-_+={}\[\]|\\/'";:.,~№?<>]+/;
      if (control.value && (!loweRegex.test(control.value) || !upperRegex.test(control.value)
          || !numberRegex.test(control.value) || !specialRegex.test(control.value))
        ){
        return {
          strongPass: true
        };
      } else {
        return null;
      }
    };
  }

  /**
   * @summary Chequea la coicidencia de las dos contraseñas
   *
   * @return boolean => true: válido | false = inválido
   */
  public checkPasswords(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
  }

  /**
   * @summary Chequea que el usuario no utilice la contraseña actual
   *
   * @return boolean => true: válido | false = inválido
   */
  public currentPassword(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.currentPass) {
            return;
        }
        if (control.value === matchingControl.value) {
          return matchingControl.setErrors({ currentPass: true });
        } else {
            return null;
        }
    };
  }


  /**
   * @summary Chequea que la contraseña anterior sea la actual
   *
   * @return boolean => true: válido | false = inválido
   */
   public oldPassValidator(): ValidatorFn {
    return (control: FormControl) => {
      if ( control.value ) {
        return this.authService.isValidPassword(control.value)
          .subscribe( (res) => {
            if (res){
              return null;
            } else {
              return { oldPass: true };
            }
          });
        }
    };
  }

  /**
   * @summary Chequea que el Usuario no este en Uso
   *
   * @return boolean => true: inválido | false = válido
   */
  public userNameValidator(): ValidatorFn {
    return (control: FormControl) => {
      if ( control.value ) {
      return this.userService.isUsedUser(control.value)
        .subscribe( (res) => res ? control.setErrors({ usedUser: true }) : control.setErrors(null));
      }
    };
  }

  /**
   * @summary Chequea que el identificador de la compañia no este en Uso
   *
   * @return boolean => true: inválido | false = válido
   */
/*   public companyIDValidator(): ValidatorFn {
    return (control: FormControl) => {
      if ( control.value ) {
      return this.userService.isUsedID(control.value)
        .subscribe( (res) => res ? control.setErrors({ usedID: true }) : control.setErrors(null));
      }
    };
  } */


  /**
   * @summary Chequea que el número del carnet de identidad este correcto
   *
   * @return boolean => true: válido | false = inválido
   */
  public CIValidator(): ValidatorFn {
    return (control: FormControl) => {
      if ( control.value ) {
        const year = new Date(Date.now()).getFullYear();
        // tslint:disable-next-line: max-line-length
        const yearCI = control.value.slice(0, 2) >= String(year).slice(2, 4) ? '19' + control.value.slice(0, 2) : '20' + control.value.slice(0, 2);
        const dateString = yearCI + '/' + control.value.slice(2, 4) + '/' + control.value.slice(4, 6);
        const dateCI = new Date(Date.parse(dateString));
        const limitOld = new Date();
        const limitNew = new Date();
        limitOld.setFullYear(Number(limitOld.getFullYear()) - 100);
        limitNew.setFullYear(Number(limitNew.getFullYear()) - 15);
        if (!((limitOld.getTime() < dateCI.getTime()) && ( dateCI.getTime() < limitNew.getTime()))) {
          return {
            validCI: true
          };
        } else {
          return null;
        }
      }
    };
  }


  /**
   * @summary Valida que el valor es Mayor que cero
   *
   * @return boolean => true: válido | false = inválido
   */
  public nonZero(): ValidatorFn {
    return (control: FormControl) => {
      if (control.value && control.value <= 0){
        return {
          nonZero: true
        };
      } else {
        return null;
      }
    };
  }

  /**
   * @summary Valida que sea la Extension permitida de un Fichero
   *
   * @return boolean => true: válido | false = inválido
   */
   public emailValidator(): ValidatorFn {
    return (control: FormControl) => {
      const emailRegEx: RegExp = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
      if (control.value && !control.value.match(emailRegEx)){
        return {
          email: true
        };
      } else {
        return null;
      }
    };
  }

  /**
   * @summary Valida que sea la Extension permitida de un Fichero
   *
   * @return boolean => true: válido | false = inválido
   */
  public extValidator(): ValidatorFn {
    return (control: FormControl) => {
      const urlRegEx: RegExp = /\.(jpe?g|png|pdf)$/i;
      if (control.value && !control.value.match(urlRegEx)){
        return {
          extension: true
        };
      } else {
        return null;
      }
    };
  }

  /**
   * @summary Valida que sea PDF la Extension permitida de un Fichero
   *
   * @return boolean => true: válido | false = inválido
   */
  public pdfExtValidator(): ValidatorFn {
    return (control: FormControl) => {
      const urlRegEx: RegExp = /\.(pdf)$/i;
      if (control.value && !control.value.match(urlRegEx)){
        return {
          pdfExtension: true
        };
      } else {
        return null;
      }
    };
  }

  /**
   * @summary Permite sólo caracteres Alfanuméricos
   *
   * @return boolean => true: válido | false = inválido
   */
  public alphaNumeric(): ValidatorFn {
    return (control: FormControl) => {
      const regex: RegExp = /^[a-zA-Z0-9_]*$/;
      if (control.value && !regex.test(control.value)){
        return {
          alphaNumeric: true
        };
      } else {
        return null;
      }
    };
  }

  /**
   * @summary Permite sólo caracteres Alfanuméricos
   *
   * @return boolean => true: válido | false = inválido
   */
  public userPattern(): ValidatorFn {
    return (control: FormControl) => {
      const regex: RegExp = /^[a-zA-Z0-9]*$/;
      if (control.value && !regex.test(control.value)){
        return {
          userPattern: true
        };
      } else {
        return null;
      }
    };
  }

  /**
   * @summary Permite sólo caracteres usuales
   *
   * @return boolean => true: válido | false = inválido
   */
  public usualPattern(): ValidatorFn {
    return (control: FormControl) => {
      const regex: RegExp = /^[A-Za-z0-9.,\s\u00f1\u00d1\u00E0-\u00FC\u00C0-\u00DC]*$/;
      if (control.value && !regex.test(control.value)){
        return {
          usualPattern: true
        };
      } else {
        return null;
      }
    };
  }

  /**
   * @summary Permite sólo caracteres usuales + parentesis
   *
   * @return boolean => true: válido | false = inválido
   */
  public usualPlusPattern(): ValidatorFn {
    return (control: FormControl) => {
      const regex: RegExp = /^[A-Za-z0-9.,)(\s\u00f1\u00d1\u00E0-\u00FC\u00C0-\u00DC]*$/;
      if (control.value && !regex.test(control.value)){
        return {
          usualPattern: true
        };
      } else {
        return null;
      }
    };
  }

  /**
   * @summary Permite sólo textos y espacios
   *
   * @return boolean => true: válido | false = inválido
   */
  public textValidator(): ValidatorFn {
    return (control: FormControl) => {
      const regex: RegExp = /^[A-Za-z\s\u00f1\u00d1\u00E0-\u00FC\u00C0-\u00DC]*$/;
      if (control.value && !regex.test(control.value)){
        return {
          noSpecial: true
        };
      } else {
        return null;
      }
    };
  }

  /**
   * @summary Permite sólo textos y espacios
   *
   * @return boolean => true: válido | false = inválido
   */
  public codeValidator(): ValidatorFn {
    return (control: FormControl) => {
      const regex: RegExp = /^[A-Z0-9.-]*$/;
      if (control.value && !regex.test(control.value)){
        return {
          noCode: true
        };
      } else {
        return null;
      }
    };
  }


  /**
   * @summary Validador Genérico
   *
   * @return boolean => true: válido | false = inválido
   */
  public patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }
      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);
      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  /**
   * @summary Valida que al menos un MIN de checkbox este marcado
   *
   * @return boolean => true: válido | false = inválido
   */
  public minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);
      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };
    return validator;
  }

}
