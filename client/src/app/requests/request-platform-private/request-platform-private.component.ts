import { Component, OnInit } from '@angular/core';
import { StepCode, StepInfo } from '../shared/models/step-info.model';
import { FormGroup, FormControl, Validators, ValidatorFn, FormArray } from '@angular/forms';
import { RequestService } from './../shared/services/request.service';
import { RequestPlatformPrivate } from '../shared/models/request-platform.model';
import { RequestStatus } from '../shared/models/request.model';
import { Person } from 'src/app/shared/models/person.model';
import { IShip, Ship } from 'src/app/shared/models/ship.model';
import { LicenseThumbs, LicenseType } from 'src/app/licenses/shared/models/license.model';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { IFishery, IFisheryCraft } from 'src/app/shared/models/utilsModel';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { of } from 'rxjs';

@Component({
  selector: 'ui-request-platform-private',
  templateUrl: './request-platform-private.component.html',
  styleUrls: ['./request-platform-private.component.css']
})
export class RequestPlatformPrivateComponent implements OnInit {

  steps: StepInfo[] = [
    {
      number: 1,
      code: StepCode.PersonalInfo,
      description: 'Datos Identificativos del Solicitante',
      next: {
          title: 'Siguiente',
          code: StepCode.ShipInfo,
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
      code: StepCode.ShipInfo,
      description: 'Datos Identificativos de la Embarcación',
      next: {
          title: 'Siguiente',
          code: StepCode.CaptainInfo,
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
      code: StepCode.CaptainInfo,
      description: 'Datos del Capitán o Patrón de la Embarcación',
      next: {
          title: 'Siguiente',
          code: StepCode.DocsInfo,
          cssClass: null,
        },
      back: {
          title: 'Átras',
          code: StepCode.ShipInfo,
          cssClass: null,
        }
    },
    {
      number: 4,
      code: StepCode.DocsInfo,
      description: 'Certificaciones y Contratos',
      next: {
          title: 'Finalizar',
          code: null,
          cssClass: null,
        },
      back: {
          title: 'Átras',
          code: StepCode.CaptainInfo,
          cssClass: null,
        }
    }
  ];

  currentStep: StepInfo;
  totalSteps: number;
  addPersonForm: FormGroup;
  addShipForm: FormGroup;
  addCaptainForm: FormGroup;
  addDocsForm: FormGroup;
  fisherys: IFishery[];

  constructor(private requestService: RequestService,
              private utilService: UtilsService,
              private validator: ValidatorsService) {
              }

  ngOnInit(): void {
    this.currentStep = this.steps[0];
    this.initPersonForm();
    this.initShipForm();
    this.initCaptainForm();
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

  get fisheryFormArray() {
    return this.addShipForm.controls.fisheryList as FormArray;
  }

  getFisheryList() {
    return this.utilService.getFisherys();
  }

  private addCheckboxes() {
    this.fisherys.forEach(() => this.fisheryFormArray.push(new FormControl(false)));
  }

  private initShipForm(){

    this.addShipForm = new FormGroup({
      shipName: new FormControl('', [Validators.required,
                                    this.validator.textValidator()]),
      shipPort: new FormControl('', [Validators.required,
                                    this.validator.usualPattern()]),
      shipFolio: new FormControl('', [Validators.required,
                                      this.validator.usualPattern()]),
      shipRegistry: new FormControl('', [Validators.required,
                                        this.validator.usualPattern()]),
      shipLength: new FormControl('', [ Validators.required,
                                        Validators.pattern('^[1-9]+[0-9]*$'),
                                        this.validator.nonZero()]),
      shipBreadth: new FormControl('', [Validators.required,
                                        Validators.pattern('^[1-9]+[0-9]*$'),
                                        this.validator.nonZero()]),
      shipRegistryBrut: new FormControl('', [Validators.required,
                                            this.validator.usualPattern()]),
      shipEngine: new FormControl('', [Validators.required,
                                      this.validator.usualPattern()]),
      fisheryCraft: new FormControl(1, Validators.required),
      fisheringAreas: new FormControl('', [Validators.required,
                                    this.validator.usualPattern()]),
      fisheryList: new FormArray([], this.validator.minSelectedCheckboxes(1))
    });

    of(this.getFisheryList()).subscribe(fishery => {
      this.fisherys = fishery;
      this.addCheckboxes();
    });

  }

  get fisheryType(){
    const selectedFisherys = (this.addShipForm.controls.fisheryList as FormArray).controls
      .map((checked, i) => checked.value ? this.fisherys[i].fisheryCode : null)
      .filter(v => v !== null);
    return selectedFisherys;
  }


  inValidShipForm(){
    if (!this.addShipForm.valid){
      return true;
    }
  }

  private get shipValue(): Ship {

    const newShip: IShip = {
      shipName: this.addShipForm.value.shipName.trim(),
      shipRegistry: this.addShipForm.value.shipRegistry.trim(),
      shipFolio: this.addShipForm.value.shipFolio.trim(),
      shipLength: this.addShipForm.value.shipLength,
      shipBreadth: this.addShipForm.value.shipBreadth,
      shipPort: this.addShipForm.value.shipPort.trim(),
      shipRegistryBrut: this.addShipForm.value.shipRegistryBrut.trim(),
      shipEngine: this.addShipForm.value.shipEngine.trim(),
    };
    return new Ship(newShip);
  }

  private initCaptainForm(){
    this.addCaptainForm = new FormGroup({
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

  inValidCaptainForm(){
    if (!this.addCaptainForm.valid){
      return true;
    }
  }

  private get captainValue(): Person {

    const newCaptain: Person = new Person(
      null,
      this.addCaptainForm.value.personName.trim(),
      this.addCaptainForm.value.personLastName.trim(),
      this.addCaptainForm.value.personCI.trim(),
      this.addCaptainForm.value.personDir.trim(),
      this.addCaptainForm.value.personMunicipalite,
      this.addCaptainForm.value.personProvince,
      this.addCaptainForm.value.personPhone.trim(),
      this.addCaptainForm.value.personEmail.trim().toLowerCase()
    );

    return newCaptain;
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

  inValidDocForm(){
    if (!this.addDocsForm.valid){
      return true;
    }
  }

  private get requestValue(): RequestPlatformPrivate {

    const newRequest = new RequestPlatformPrivate(
      null,
      this.requestService.createRequestOrderNumber(this.addPersonForm.value.personProvince, LicenseThumbs.PlatformPrivate),
      {
        licenseTypeCode: 3,
        licenseTypeThumbs: LicenseThumbs.PlatformPrivate,
        licenseTypeName: LicenseType.PlatformPrivate
      },
      RequestStatus.Solicitada,
      this.personValue,
      this.personValue.personProvince,
      null,
      this.addDocsForm.value.licenseNotTaxDebt,
      this.addDocsForm.value.licenseTaxAboutShipProperty,
      this.addDocsForm.value.licenseCertificateOfNavigability,
      this.addDocsForm.value.licenseBoatRegistrationCertificate,
      this.shipValue,
      this.captainValue,
      this.fisheryType,
      this.addShipForm.value.fisheryCraft,
      this.addShipForm.value.fisheringAreas,
      this.addDocsForm.value.licenseContractNumber,
      this.addDocsForm.value.licenseContract,
    );

    return newRequest;
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

  inValidForm(){
    return false;
  }

  private cleanForms(){
    this.addPersonForm.reset();
    this.addShipForm.reset();
    this.addCaptainForm.reset();
    this.addDocsForm.reset();
  }

  onSubmit(){
    this.requestService.addPlatformPrivate(this.requestValue);
    this.cleanForms();
  }

}
