export interface IPerson{
    personCode?: number;
    personName: string;
    personLastName: string;
    personCI: string;
    personDir: string;
    personMunicipalite: string;
    personProvince: string;
    personPhone: string;
    personEmail: string;
  }

export class Person implements IPerson{
    public personCode?: number;
    public personName: string;
    public personLastName: string;
    public personCI: string;
    public personDir: string;
    public personMunicipalite: string;
    public personProvince: string;
    public personPhone: string;
    public personEmail: string;

    constructor(personCode: number,
                personName: string,
                personLastName: string,
                personCI: string,
                personDir: string,
                personMunicipalite: string,
                personProvince: string,
                personPhone: string,
                personEmail: string) {
        this.personCode = personCode;
        this.personName = personName;
        this.personLastName = personLastName;
        this.personCI = personCI;
        this.personDir = personDir;
        this.personMunicipalite = personMunicipalite;
        this.personProvince = personProvince;
        this.personPhone = personPhone;
        this.personEmail = personEmail;
    }
}

export class Captain {
  public personCode: number;
  public personName: string;
  public personLastName: string;
  public personCI: string;

  constructor(personCode: number,
              personName: string,
              personLastName: string,
              personCI: string) {
      this.personCode = personCode;
      this.personName = personName;
      this.personLastName = personLastName;
      this.personCI = personCI;
  }
}
