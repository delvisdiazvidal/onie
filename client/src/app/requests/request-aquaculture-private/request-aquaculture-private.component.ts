import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestAquaculturePrivate } from '../shared/models/request-aquaculture-private.model';
import { StepCode, StepInfo } from '../shared/models/step-info.model';
import { Person } from 'src/app/shared/models/person.model';
import { LicenseThumbs, LicenseType } from 'src/app/licenses/shared/models/license.model';
import { RequestStatus } from '../shared/models/request.model';
import { RequestService } from '../shared/services/request.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/shared/services/confirm-dialog.service';

@Component({
  selector: 'ui-request-aquaculture-private',
  templateUrl: './request-aquaculture-private.component.html',
  styleUrls: ['./request-aquaculture-private.component.css']
})
export class RequestAquaculturePrivateComponent implements OnInit {

  steps: StepInfo[] = [
    {
      number: 1,
      code: StepCode.PersonalInfo,
      description: 'Datos Identificativos del Solicitante',
      next: {
          title: 'Siguiente',
          code: StepCode.DocsInfo,
          cssClass: null,
        },
      back: {
          title: 'Cancelar',
          code: null,
          cssClass: null,
        }
    },
    {
      number: 2,
      code: StepCode.DocsInfo,
      description: 'Certificaciones y Contratos',
      next: {
          title: 'Finalizar',
          code: null,
          cssClass: null,
        },
      back: {
          title: 'Átras',
          code: StepCode.PersonalInfo,
          cssClass: null,
        }
    }
  ];

  currentStep: StepInfo;
  totalSteps: number;
  private: boolean;
  addPersonForm: FormGroup;
  addDocsForm: FormGroup;
  componentTitle: string;
  docInValid: boolean;

  constructor(private requestService: RequestService,
              private route: ActivatedRoute,
              private router: Router,
              private validator: ValidatorsService,
              private dialog: ConfirmDialogService) {
                this.componentTitle = LicenseType.AquaculturePrivate;
               }

  ngOnInit(): void {
    this.currentStep = this.steps[0];
    this.totalSteps = this.steps.length;
    this.docInValid = false;
    this.initPersonForm();
    this.initDocForm();
  }

  private initPersonForm(){
    this.addPersonForm = new FormGroup({
      personName: new FormControl('', [Validators.required,
                                      this.validator.textValidator()]),
      personLastName: new FormControl('', [Validators.required,
                                      this.validator.textValidator()]),
      personCI: new FormControl('', [ Validators.required,
                                      Validators.pattern('^[0-9]+[0-9]*$'),
                                      Validators.minLength(11),
                                      this.validator.CIValidator()]),
      personEmail: new FormControl('', this.validator.emailValidator()),
      personPhone: new FormControl('', [Validators.required,
                                        Validators.minLength(8),
                                        Validators.pattern('^[1-9]+[0-9]*$')]),
      personDir: new FormControl('', [Validators.required,
                                      this.validator.usualPattern()]),
      personMunicipalite: new FormControl(null, Validators.required),
      personProvince: new FormControl(null, Validators.required),
    });
  }

  inValidPersonForm(){
   if (!this.addPersonForm.valid){
       return true;
    }
  }

  private initDocForm(){
    this.addDocsForm = new FormGroup({
      licenseNotTaxDebt: new FormControl('', [Validators.required, this.validator.extValidator()]),
      licenseTaxAboutShipProperty: new FormControl('', [Validators.required, this.validator.extValidator()]),
      licenseBoatRegistrationCertificate: new FormControl('', [Validators.required, this.validator.extValidator()]),
      licenseCertificateOfNavigability: new FormControl('', [Validators.required, this.validator.extValidator()]),
      licenseContractNumber: new FormControl('', Validators.required),
      licenseContract: new FormControl('', [Validators.required, this.validator.extValidator()]),
    });
  }


  get inValidDocsForm(){
    return this.addDocsForm.invalid ? true : false;
  }

  onDismiss(){
    this.cleanForms();
    this.router.navigate(['../solicitudes/nueva-solicitud']);
  }

  goNext(){
    if (this.currentStep.next.code)
      { this.currentStep = this.steps.find( element => element.code === this.currentStep.next.code); }
  }

  goBack(){
    if (this.currentStep.back.code)
        { this.currentStep = this.steps.find( element => element.code === this.currentStep.back.code); }
  }

  setStep(stepCode: string){
    if (this.currentStep.code === stepCode) {
      return true;
    }
  }

  private get personValue(): Person {

    const newPerson: Person = new Person(
      null,
      this.addPersonForm.value.personName.trim(),
      this.addPersonForm.value.personLastName.trim(),
      this.addPersonForm.value.personCI.trim(),
      this.addPersonForm.value.personDir.trim(),
      this.addPersonForm.value.personMunicipalite,
      this.addPersonForm.value.personProvince,
      this.addPersonForm.value.personPhone.trim(),
      this.addPersonForm.value.personEmail.trim().toLowerCase()
    );

    return newPerson;
  }

  private get requestValue(): RequestAquaculturePrivate {

    const newRequest = new RequestAquaculturePrivate(
      null,
      this.requestService.createRequestOrderNumber(this.addPersonForm.value.personProvince, LicenseThumbs.AquaculturePrivate),
      {
        licenseTypeCode: 1,
        licenseTypeThumbs: LicenseThumbs.AquaculturePrivate,
        licenseTypeName: LicenseType.AquaculturePrivate
      },
      this.personValue,
      RequestStatus.Solicitada,
      this.personValue.personProvince,
      null,
      this.addDocsForm.value.licenseNotTaxDebt,
      this.addDocsForm.value.licenseTaxAboutShipProperty,
      this.addDocsForm.value.licenseBoatRegistrationCertificate,
      this.addDocsForm.value.licenseCertificateOfNavigability,
      this.addDocsForm.value.licenseContractNumber,
      this.addDocsForm.value.licenseContract
    );

    return newRequest;
  }

  private cleanForms(){
    this.addPersonForm.reset();
    this.addDocsForm.reset();
  }

  onSubmit(){
    if (this.inValidDocsForm){
      this.docInValid = true;
    } else {
      this.dialog.confirm(' Está seguro que desea enviar la Solicitud? Revise todos los Datos cuidadosamente.')
                .then((confirmed) => {
                  if (confirmed) {
                    this.requestService.addAquaculturePrivate(this.requestValue);
                    this.cleanForms();
                  } else { return false; }
                })
                .catch(() => false);
    }
  }

}
