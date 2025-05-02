import { faker } from "@faker-js/faker";

export class DataFactoryLegalEntity {
  static getCompanyName(): string {
    return faker.company.name();
  }

  static getLegalStatus(): string {
    return faker.helpers.arrayElement([
      "EI : Entreprise individuelle",
      "EIRL : Entreprise individuelle à responsabilité limitée",
      "GIE : Groupement d’intérêt économique",
      "SAS : Société par actions simplifiée",
    ]);
  }

  static getRegistrationNumber(): string {
    return faker.string.numeric(8);
  }

  static getTaxId(): string {
    return faker.string.numeric(11);
  }

  static getWebsite(): string {
    return faker.internet.url();
  }

  static getAddress(): string {
    return faker.location.streetAddress();
  }

  static getCity(): string {
    return faker.location.city();
  }

  static getZipCode(): string {
    return faker.location.zipCode("#####");
  }

  static getCountry(): string {
    return faker.location.country();
  }

  static getPhoneNumber(): string {
    return faker.phone.number();
  }

  static getDirectorFirstName(): string {
    return faker.person.firstName();
  }

  static getDirectorLastName(): string {
    return faker.person.lastName();
  }

  static getDirectorEmail(): string {
    return faker.internet.email();
  }

  static getRib(): string {
    return faker.finance.iban();
  }

  static getInsuranceNumber(): string {
    return faker.string.numeric(15);
  }

  static getFoundationDate(): string {
    const foundationDate = faker.date.past({years : 20}); // Entreprise fondée il y a moins de 20 ans
    return foundationDate.toLocaleDateString("fr-FR");
  }

  static getEmployeeCount(): number {
    return faker.number.int({ min: 1, max: 500 });
  }

  static getAnnualRevenue(): number {
    return faker.number.int({ min: 100000, max: 100000000 });
  }
}
