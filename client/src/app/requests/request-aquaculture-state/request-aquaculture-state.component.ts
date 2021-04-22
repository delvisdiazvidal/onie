import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { StepCode, StepInfo } from '../shared/models/step-info.model';
import { RequestService } from '../shared/services/request.service';
import { Person } from 'src/app/shared/models/person.model';
import { RequestStatus } from '../shared/models/request.model';
import { RequestAquacultureState } from '../shared/models/request-aquaculture-state.model';
import { Company } from 'src/app/shared/models/company.model';
import { LicenseThumbs, LicenseType } from 'src/app/licenses/shared/models/license.model';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

@Component({
  selector: 'ui-request-aquaculture-state',
  templateUrl: './request-aquaculture-state.component.html',
  styleUrls: ['./request-aquaculture-state.component.css']
})
export class RequestAquacultureStateComponent implements OnInit {

  steps: StepInfo[] = [
    {
      number: 1,
      code: StepCode.PersonalInfo,
      description: 'Datos Identificativos del Solicitante',
      next: {
          title: 'Siguiente',
          code: StepCode.CompanyInfo,
          cssClass: null,
        },
      back: {
          title: null,
          code: null,
          cssClass: null,
        }
    },
    {
      number: 2,
      code: StepCode.CompanyInfo,
      description: 'Datos Identificativos de la Empresa',
      next: {
          title: 'Siguiente',
          code: StepCode.ShipsInfo,
          cssClass: null,
        },
      back: {
          title: 'Átras',
          code: StepCode.PersonalInfo,
          cssClass: null,
        }
    },
    {
      number: 3,
      code: StepCode.ShipsInfo,
      description: 'Listado de Embarcaciones que se utilizarán',
      next: {
          title: 'Siguiente',
          code: StepCode.ReservoirsInfo,
          cssClass: null,
        },
      back: {
          title: 'Átras',
          code: StepCode.CompanyInfo,
          cssClass: null,
        }
    },
    {
      number: 4,
      code: StepCode.ReservoirsInfo,
      description: 'Acuatorios que serán objeto de explotación',
      next: {
          title: 'Siguiente',
          code: StepCode.DocsInfo,
          cssClass: null,
        },
      back: {
          title: 'Átras',
          code: StepCode.ShipsInfo,
          cssClass: null,
        }
    },
    {
      number: 5,
      code: StepCode.DocsInfo,
      description: 'Certificaciones y Contratos',
      next: {
          title: 'Finalizar',
          code: null,
          cssClass: null,
        },
      back: {
          title: 'Átras',
          code: StepCode.ReservoirsInfo,
          cssClass: null,
        }
    }
  ];

  currentStep: StepInfo;
  totalSteps: number;
  addPersonForm: FormGroup;
  addCompanyForm: FormGroup;
  addShipsListForm: FormGroup;
  addReservoirsListForm: FormGroup;
  addDocsForm: FormGroup;
  legendSteps: string;

  constructor(private requestService: RequestService,
              private validator: ValidatorsService,
              private router: Router) { }

  ngOnInit(): void {
    this.currentStep = this.steps[0];
    this.totalSteps = this.steps.length;
    this.initPersonForm();
    this.initCompanyForm();
    this.initShipForm();
    this.initReservoirForm();
    this.initDocForm();
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

  private initPersonForm(){
    this.addPersonForm = new FormGroup({
      personName: new FormControl('', [Validators.required,
                                      this.validator.textValidator()]),
      personLastName: new FormControl('', [Validators.required,
                                      this.validator.textValidator()]),
      personCI: new FormControl('', [ Validators.required,
                                      Validators.pattern('^[0-9]+[0-9]*$'),
                                      Validators.minLength(11),
                                      Validators.maxLength(11)]),
      personEmail: new FormControl('', Validators.email),
      personPhone: new FormControl('', [Validators.required,
                                        Validators.pattern('^[1-9]+[0-9]*$')]),
      personDir: new FormControl('', [Validators.required,
                                      this.validator.usualPattern()]),
      personMunicipalite: new FormControl(1, Validators.required),
      personProvince: new FormControl(1, Validators.required),
    });
  }

  inValidPersonForm(){
    if (!this.addPersonForm.valid){
       return true;
  }}

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

  private initCompanyForm(){

    this.addCompanyForm = new FormGroup({
      companyREEUP: new FormControl('', [Validators.required,
                                        this.validator.codeValidator()]),
      companyName: new FormControl('', [Validators.required,
                                        this.validator.usualPattern()]),
      entityName: new FormControl('', [Validators.required,
                                        this.validator.usualPattern()]),
      fishingBrigade: new FormControl('', [Validators.required,
                                        this.validator.usualPattern()]),
      companyDir: new FormControl('', [Validators.required,
                                        this.validator.usualPattern()]),
      companyMunicipalite: new FormControl(1, Validators.required),
      companyProvince: new FormControl(1, Validators.required),
    });
  }

  inValidCompanyForm(){
    if (!this.addCompanyForm.valid){
       return true;
  }}

  private get companyValue(): Company {

    const newCompany: Company = new Company(
      null,
      this.addCompanyForm.value.companyREEUP.trim(),
      this.addCompanyForm.value.companyName.trim(),
      this.addCompanyForm.value.companyDir.trim(),
      this.addCompanyForm.value.companyMunicipalite,
      this.addCompanyForm.value.companyProvince,
      this.addCompanyForm.value.entityName.trim(),
      this.addCompanyForm.value.fishingBrigade.trim(),
    );

    return newCompany;
  }

  private initShipForm(){
    const licenseShipList = new FormArray([
      new FormGroup({
        shipName: new FormControl('', [Validators.required,
                                      this.validator.textValidator()]),
        shipRegistry: new FormControl('', [Validators.required,
                                            this.validator.usualPattern()]),
        shipFolio: new FormControl('', [Validators.required,
                                            this.validator.usualPattern()]),
        shipLength: new FormControl('', [ Validators.required,
                                        Validators.pattern('^[1-9]+[0-9]*$'),
                                        this.validator.nonZero()]),
        shipBreadth: new FormControl('', [ Validators.required,
                                          Validators.pattern('^[1-9]+[0-9]*$'),
                                          this.validator.nonZero()])
      })
    ]);

    this.addShipsListForm = new FormGroup({
      shipList: licenseShipList
    });
  }

  inValidShipForm(){
    if (!this.addShipsListForm.valid){
       return true;
  }}

  private initReservoirForm(){
    const licenseReservoirList = new FormArray([
      new FormGroup({
        reservoirName: new FormControl('', [Validators.required,
                                            this.validator.usualPattern()]),
        reservoirSurface: new FormControl('', [ Validators.required,
                                                Validators.pattern('^[1-9]+[0-9]*$'),
                                                this.validator.nonZero()])
      })
    ]);

    this.addReservoirsListForm = new FormGroup({
      reservoirList: licenseReservoirList
    });
  }


  inValidReservoirForm(){
    if (!this.addReservoirsListForm.valid){
       return true;
  }}

  private initDocForm(){
    this.addDocsForm = new FormGroup({
      licenseNotTaxDebt: new FormControl('', [Validators.required, this.validator.extValidator()]),
      licenseTaxAboutShipProperty: new FormControl('', [Validators.required, this.validator.extValidator()]),
      licenseBoatRegistrationCertificate: new FormControl('', [Validators.required, this.validator.extValidator()]),
      licenseCertificateOfNavigability: new FormControl('', [Validators.required, this.validator.extValidator()]),
      licenseIRHCertificate: new FormControl('', [Validators.required, this.validator.extValidator()]),
    });
  }

  inValidDocsForm(){
    if (!this.addDocsForm.valid){
       return true;
  }}

  private get requestValue(): any {

    const newRequest = new RequestAquacultureState(
      null,
      this.requestService.createRequestOrderNumber(this.addPersonForm.value.personProvince, LicenseThumbs.AquacultureState),
      {
        licenseTypeCode: 2,
        licenseTypeThumbs: LicenseThumbs.AquacultureState,
        licenseTypeName: LicenseType.AquacultureState
      },
      RequestStatus.Solicitada,
      this.personValue,
      this.companyValue.companyProvince,
      null,
      this.addDocsForm.value.licenseNotTaxDebt,
      this.addDocsForm.value.licenseTaxAboutShipProperty,
      this.addDocsForm.value.licenseBoatRegistrationCertificate,
      this.addDocsForm.value.licenseCertificateOfNavigability,
      this.companyValue,
      this.addShipsListForm.value.shipList,
      this.addDocsForm.value.licenseIRHCertificate,
      this.addReservoirsListForm.value.reservoirList
    );

    return newRequest;
  }

  private cleanForms(){
    this.addPersonForm.reset();
    this.addCompanyForm.reset();
    this.addShipsListForm.reset();
    this.addReservoirsListForm.reset();
    this.addDocsForm.reset();
  }

  onSubmit(){
    this.requestService.addAquacultureState(this.requestValue);
    this.cleanForms();
  }

}
