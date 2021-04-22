import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorMesagge } from 'src/app/shared/models/error.enum';

@Component({
  selector: 'ui-docs-form',
  templateUrl: './docs-form.component.html',
  styleUrls: ['./docs-form.component.css']
})
export class DocsFormComponent implements OnInit {

  @Input() docsForm: FormGroup;
  @Input() contract: boolean;
  @Input() irh: boolean;

  notTaxDebtFile: File;
  notTaxAboutShipPropertyFile: File;
  boatRegistrationCertificateFile: File;
  certificateOfNavigabilityFile: File;
  licenseContractFile: File;
  iRHCertificateFile: File;

  constructor() { }

  ngOnInit(): void { }

  get errors(){
    return ErrorMesagge;
  }

  get licenseNotTaxDebt(){
    return this.docsForm.get('licenseNotTaxDebt');
  }

  get licenseTaxAboutShipProperty(){
    return this.docsForm.get('licenseTaxAboutShipProperty');
  }

  get licenseBoatRegistrationCertificate(){
    return this.docsForm.get('licenseBoatRegistrationCertificate');
  }

  get licenseCertificateOfNavigability(){
    return this.docsForm.get('licenseCertificateOfNavigability');
  }

  get licenseContractNumber(){
    return this.docsForm.get('licenseContractNumber');
  }

  get licenseContract(){
    return this.docsForm.get('licenseContract');
  }

  get licenseIRHCertificate(){
    return this.docsForm.get('licenseIRHCertificate');
  }

  private async updateDocs(){
    this.docsForm.value.licenseNotTaxDebt = this.notTaxDebtFile;
    this.docsForm.value.licenseTaxAboutShipProperty = this.notTaxAboutShipPropertyFile;
    this.docsForm.value.licenseBoatRegistrationCertificate = this.boatRegistrationCertificateFile;
    this.docsForm.value.licenseCertificateOfNavigability = this.certificateOfNavigabilityFile;
    this.docsForm.value.licenseContract = this.licenseContractFile;
    this.docsForm.value.licenseIRHCertificate = this.iRHCertificateFile;
  }

  async setNotTaxDebt(event){
    this.notTaxDebtFile = await event.target.files[0];
    await this.updateDocs();
  }

  async setTaxAboutShipProperty(event){
    this.notTaxAboutShipPropertyFile = await event.target.files[0];
    await this.updateDocs();
  }

  async setBoatRegistrationCertificate(event){
    this.boatRegistrationCertificateFile = await event.target.files[0];
    await this.updateDocs();
  }

  async setCertificateOfNavigability(event){
    this.certificateOfNavigabilityFile = await event.target.files[0];
    await this.updateDocs();
  }

  async setLicenseContract(event){
    this.licenseContractFile = await event.target.files[0];
    await this.updateDocs();
  }

  async setIRHCertificate(event){
    this.iRHCertificateFile = await event.target.files[0];
    this.updateDocs();
  }

  async setUpdate(event){
    await this.updateDocs();
  }


}
