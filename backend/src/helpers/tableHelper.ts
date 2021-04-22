export const Table = {
    userTable: "user_table",
    personTable: "person_table",
    userRoleTable: "user_role_table",
    roleTable: "roles_table",
    passTable: "user_oldpass_table",
    municipaliteTable: "municipalite_table",
    provinceTable: "province_table",
    requestTable: "request_main_table",
    requestStatusTable: "request_status_table",
    requestAquacultureTable: "request_aquaculture_table",
    requestPPTable: "request_platform_table",
    requestPSTable: "request_platform_state_table",
    companyTable: "company_table",
    shipTable: "ship_table",
    reservoirTable: "reservoir_table",
    licenseTypeTable: "license_type_table",
    licenseTable: "license_main_table",
    licenseAPTable: "license_aquaculture_private_table",
    licenseASTable: "license_aquaculture_state_table",
    licensePPTable: "license_platform_table",
    licensePSTable: "license_platform_state_table",
    penaltyTable: "penalty_table",
    fisheryTable: "fishery_table",
    fisheryCraftTable: "fisherycraft_table",
    docsTable: "docs_table",
    contractTable: "docs_contract_table",
    requestFisheryTable: "request_fishery_table",
    licenseFisheryTable: "license_fishery_table",
};

export const View = {
    penaltyView: "offender_view",
    userView: "user_view",
    requestView: "request_view",
    licenseShipView: "license_ship_view",
    fisheryView: "fishery_view",
    lincenseFisheryView: "fishery_license_view",
    oldPassView: "oldpass_view",
};

export const userTable = {
    userCode: "userCode",
    username: "username",
    password: "password",
};

export const userRoleTable = {
    userCode: "userCode",
    roleCode: "roleCode",
};

export const roleTable = {
    roleCode: "roleCode",
    roleShort: "roleShort",
    roleName: "roleName"
};

export const personTable = {
    personCode: "personCode",
    firstName: "firstName",
    lastname: "lastName",
    personCI: "personCI",
    personDir: "personDir",
    personMunicipalite: "personMunicipalite",
    personProvince: "personProvince",
    personEmail: "personEmail",
    personPhone: "personPhone",
};

export const companyTable = {
    companyCode: "companyCode",
    companyREEUP: "companyREEUP",
    companyName: "companyName",
    companyDir: "companyDir",
    companyPhone: "companyPhone",
};

export const municipaliteTable = {
    municipaliteCode: "municipaliteCode",
    municipaliteName: "municipaliteName",
    municipaliteProvince: "municipaliteProvince",
    municipalitePopulation: "municipalitePopulation",
    municipaliteArea: "municipaliteArea",
    municipaliteDescription: "municipaliteDescription",
};

export const provinceTable = {
    provinceCode: "provinceCode",
    provinceName: "provinceName",
    provinceAB: "provinceAB",
    provinceDescription: "provinceDescription",
};


// Terminar Esto
export const requestTable = {
    requestCode: "requestCode",
    requestOrderNumber: "requestOrderNumber",
    requestType: "requestType",
    requestPerson: "requestPerson",
    requestProvince: "requestProvince",
    requestDate: "requestDate",
};

// Terminar Esto
export const requestAquacultureTable = {
    requestCode: "requestCode",
    requestCompany: "requestCompany",
    requestIRHCertificate: "requestIRHCertificate",
};

export const licenseTypeTable = {
    licenseTypeCode: "licenseTypeCode",
    licenseTypeThumbs: "licenseTypeThumbs",
    licenseTypeName: "licenseTypeName"
};

// Terminar Esto
export const licenseTable = {
    licenseCode: "licenseCode",
};

// Terminar Esto
export const licenseASTable = {
    licenseCode: "licenseCode",
};

// Terminar Esto
export const licenseAPTable = {
    licenseCode: "licenseCode",
};

// Terminar Esto
export const penaltyTable = {
    penaltyCode: "penaltyCode",
    penaltyTicket: "penaltyTicket",
    penaltyAmount: "penaltyAmount",
    penaltyOffense: "penaltyOffense",
    penaltyDate: "penaltyDate",
    penaltyPersonName: "penaltyPersonName",
    penaltyPersonCI: "penaltyPersonCI",
    penaltyPersonDir: "penaltyPersonDir",
    penaltyInspector: "penaltyInspector",
};

export const fisheryTable = {
    fisheryCode: "fisheryCode",
    fisheryName: "fisheryName",
    fisheryAmount: "fisheryAmount",
    fisheryClasif: "fisheryClasif",
};

export const fisheryCraftTable = {
    fisherycraftCode: "fisherycraftCode",
    fisherycraftName: "fisherycraftName",
    fisherycraftMaxCant: "fisherycraftMaxCant",
    fisherycraftDescription: "fisherycraftDescription",
};


