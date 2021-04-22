import { Injectable } from '@angular/core';
import { IFishery, IFisheryCraft, IOurEntity } from '../models/utilsModel';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IResponse } from '../models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  ourEntitys: IOurEntity[] = [
    {
      ourEntityCode: 1,
      ourEntityName: 'Oficina Nacional de Inspección Estatal, Oficina Central',
      ourEntityDir: 'Ave. De Independencia No. 4904 e/ Callejón de la Guayaba y Calle B, Cerro, La Habana',
      ourEntityMunicipalite: 1,
      ourEntityProvince: 1,
      ourEntityEmail: 'contactos@onie.cu',
      ourEntityPhone: [ '763-89143' ],
    },
    {
      ourEntityCode: 2,
      ourEntityName: 'ONIE Pinar del Río - Artemisa',
      ourEntityDir: 'Maceo No. 41 e/ Isabel Rubio y Gerardo Medina, Pinar del Río',
      ourEntityMunicipalite: 1,
      ourEntityProvince: 1,
      ourEntityEmail: 'german.amaran@pri.alinet.cu',
      ourEntityPhone: [ '48-754832', '48-771666' ],
    },
    {
      ourEntityCode: 3,
      ourEntityName: 'ONIE Mayabeque',
      ourEntityDir: 'Carretera a Tapaste km 1.5, San José de las Lajas, Mayabeque',
      ourEntityMunicipalite: 1,
      ourEntityProvince: 1,
      ourEntityEmail: 'israel.guerrero@hab.alinet.cu',
      ourEntityPhone: [ '47-844032' ],
    },
    {
      ourEntityCode: 4,
      ourEntityName: 'ONIE La Habana',
      ourEntityDir: 'San Rafael No. 467 e/ Lealtad y Campanario, Centro Habana, La Habana',
      ourEntityMunicipalite: 1,
      ourEntityProvince: 1,
      ourEntityEmail: 'jose.ulloa@hab.alinet.cu',
      ourEntityPhone: [ '786-26116' ],
    },
    {
      ourEntityCode: 5,
      ourEntityName: 'ONIE Matanzas',
      ourEntityDir: 'San Francisco e/ Monserrate y San Cristobal, Pueblo Nuevo, Matanzas',
      ourEntityMunicipalite: 1,
      ourEntityProvince: 1,
      ourEntityEmail: 'dagoberto.fernandez@vcl.alinet.cu',
      ourEntityPhone: [ '45-273280' ],
    },
    {
      ourEntityCode: 6,
      ourEntityName: 'ONIE Villa Clara',
      ourEntityDir: 'Calle 12 y 3ra y 5ta Rpto Camacho, Santa Clara, Villa Clara',
      ourEntityMunicipalite: 1,
      ourEntityProvince: 1,
      ourEntityEmail: 'benigno.pacheco@onievc.alinet.cu',
      ourEntityPhone: [ '42-203831', '42-206744' ]
    },
    {
      ourEntityCode: 7,
      ourEntityName: 'ONIE Cienfuegos',
      ourEntityDir: 'Ave 40 No. 3903 e/ 39 y 41, Cienfuegos',
      ourEntityMunicipalite: 1,
      ourEntityProvince: 1,
      ourEntityEmail: 'oniecf@enet.cu',
      ourEntityPhone: [ '43-518605' ]
    },
    {
      ourEntityCode: 8,
      ourEntityName: 'ONIE Sancti Spíritus',
      ourEntityDir: 'Céspedes No. 375 e/ San Luis y San José, Sancti Spíritus',
      ourEntityMunicipalite: 1,
      ourEntityProvince: 1,
      ourEntityEmail: 'iraldo.romero@vcl.alinet.cu',
      ourEntityPhone: [ '41-326753' ]
    },
    {
      ourEntityCode: 9,
      ourEntityName: 'ONIE Ciego de Ávila',
      ourEntityDir: 'José María Agramonte No. 59 e/ Chicho Valdés y Joaquín de Agüero, Ciego de Ávila',
      ourEntityMunicipalite: 1,
      ourEntityProvince: 1,
      ourEntityEmail: 'dironiecav@enet.cu',
      ourEntityPhone: [ '33-214596', '33-214542' ]
    },
    {
      ourEntityCode: 10,
      ourEntityName: 'ONIE Camagüey',
      ourEntityDir: 'Ave de la Libertad No. 69 e/ Sifonte y Alonso Fruto, Rpto La Caridad, Camagüey',
      ourEntityMunicipalite: 1,
      ourEntityProvince: 1,
      ourEntityEmail: 'gallo@onipcmg.alinet.cu',
      ourEntityPhone: [ '32-287385' ]
    },
    {
      ourEntityCode: 11,
      ourEntityName: 'ONIE Las Tunas',
      ourEntityDir: 'Calle 65 No. 2 Circunvalación Sur, Reparto La Loma, Las Tunas',
      ourEntityMunicipalite: 1,
      ourEntityProvince: 1,
      ourEntityEmail: 'alina@pescatun.alinet.cu',
      ourEntityPhone: [ '31-345639' ]
    },
    {
      ourEntityCode: 12,
      ourEntityName: 'ONIE Holguín',
      ourEntityDir: 'Calle Miró No. 83 e/ Arias y Agramonte, Centro Ciudad Holguín',
      ourEntityMunicipalite: 1,
      ourEntityProvince: 1,
      ourEntityEmail: 'carlos.borregooniehlg@alimaticori.alinet.cu',
      ourEntityPhone: [ '24-461777' ]
    },
    {
      ourEntityCode: 13,
      ourEntityName: 'ONIE Granma',
      ourEntityDir: 'Combinado Pesquero Industrial "Andrés Luján Vázquez", Carretera Ciudad Pesquera s/n, Manzanillo, Granma',
      ourEntityMunicipalite: 1,
      ourEntityProvince: 1,
      ourEntityEmail: 'clemente.chavezonie@alimaticori.alinet.cu',
      ourEntityPhone: [ '23-543511' ]
    },
    {
      ourEntityCode: 14,
      ourEntityName: 'ONIE Santiago de Cuba',
      ourEntityDir: 'Padre Pico S/N e/ Aguilera y Heredia, Santiago de Cuba',
      ourEntityMunicipalite: 1,
      ourEntityProvince: 1,
      ourEntityEmail: 'manuel.menaoniestgo@alimaticori.alinet.cu',
      ourEntityPhone: [ '22-653381', '22-651817' ]
    },
    {
      ourEntityCode: 15,
      ourEntityName: 'ONIE Guantánamo',
      ourEntityDir: 'Carretera de Jamaica km 3.5, Guantánamo',
      ourEntityMunicipalite: 1,
      ourEntityProvince: 1,
      ourEntityEmail: 'onipgtmo@pescaguan.alinet.cu',
      ourEntityPhone: [ '21-391186', '21-391187' ]
    },
    {
      ourEntityCode: 16,
      ourEntityName: 'ONIE Isla de la Juventud',
      ourEntityDir: 'Calle 15 e/ 28 y 32 Sierra de Caballos (Varadero) Nueva Gerona, Isla de la Juventud',
      ourEntityMunicipalite: 1,
      ourEntityProvince: 1,
      ourEntityEmail: 'leudi.cabrera@pri.alinet.cu',
      ourEntityPhone: [ '46-323961' ]
    },
  ];

  private fisheryUrl: string;
  private fisheryCraftUrl: string;
  ourEntity: Observable<IOurEntity[]>;
  fishery: Observable<IFishery[]>;
  fisheryCraft: Observable<IFisheryCraft[]>;
  private $ouEntityChange: BehaviorSubject<IOurEntity[]>;
  private $fisheryChange: BehaviorSubject<IFishery[]>;
  private $fisheryCraftChange: BehaviorSubject<IFisheryCraft[]>;
  private dataStore: {
    ourEntity: IOurEntity[],
    fishery: IFishery[],
    fisheryCraft: IFisheryCraft[],
   };

  constructor(private http: HttpClient) {

    this.fisheryUrl = environment.fisheryUrl;
    this.fisheryCraftUrl = environment.fisheryCraftUrl;

    this.dataStore = {
      ourEntity: [],
      fishery: [],
      fisheryCraft: [],
    };

    this.$ouEntityChange = new BehaviorSubject([]);
    this.$fisheryChange = new BehaviorSubject([]);
    this.$fisheryCraftChange = new BehaviorSubject([]);
    this.ourEntity = this.$ouEntityChange.asObservable();
    this.fishery = this.$fisheryChange.asObservable();
    this.fisheryCraft = this.$fisheryCraftChange.asObservable();
  }

  private refreshFishery() {
    this.$fisheryChange.next(Object.assign({}, this.dataStore).fishery);
  }

  public fetchFishery() {
    return this.http.get<IResponse>(this.fisheryUrl)
                    .subscribe(( res: IResponse ) =>  {
                      this.dataStore.fishery = res.result;
                      this.refreshFishery();
                    });
  }

  public getFisherys(): IFishery[] {
    return this.dataStore.fishery;
  }

  getFisheryById(index: number){
    return this.dataStore.fishery.find( element => element.fisheryCode ===  Number(index));
  }

  private refreshFisheryCraft() {
    this.$fisheryCraftChange.next(Object.assign({}, this.dataStore).fisheryCraft);
  }

  public fetchFisheryCraft() {
    return this.http.get<IResponse>(this.fisheryCraftUrl)
                    .subscribe(( res: IResponse ) =>  {
                      this.dataStore.fisheryCraft = res.result;
                      this.refreshFisheryCraft();
                    });
  }

  public getFisheryCraft(): IFisheryCraft[] {
    return this.dataStore.fisheryCraft;
  }

  getFisheryCraftById(index: number){
    return this.dataStore.fisheryCraft.find( element => element.fisherycraftCode ===  Number(index));
  }

  private refreshOurEntity() {
    this.$ouEntityChange.next(Object.assign({}, this.dataStore).ourEntity);
  }

  public fetchOurEntity() {
    this.dataStore.ourEntity = this.ourEntitys;
    this.refreshOurEntity();
  }

  public getOurEntity(): Observable<IOurEntity[]> {
    return this.$ouEntityChange.asObservable();
  }

}
