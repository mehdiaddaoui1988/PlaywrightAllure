import { faker } from "@faker-js/faker";

export class DataFactoryHealthProfessional {
  static getFirstName(): string {
    return faker.person.firstName();
  }

  static getLastName(): string {
    return faker.person.lastName();
  }

  static getEmail(): string {
    return faker.internet.email();
  }

  static getPhoneNumber(): string {
    return faker.phone.number();
  }

  static getProfessionalId(): string {
    return faker.string.uuid();
  }

  static getLicenseNumber(): string {
    return faker.string.alphanumeric(10).toUpperCase();
  }

  static getSpecialty(): string {
    return faker.helpers.arrayElement([
      "Médecin",
      "Infirmier",
      "Pharmacien",
      "Dentiste",
      "Kinésithérapeute",
      "Chirurgien",
      "Orthophoniste",
      "Psychologue",
    ]);
  }

  static getHospitalAffiliation(): string {
    return faker.company.name();
  }

  static getYearsOfExperience(): number {
    return faker.number.int({ min: 1, max: 40 });
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

  static getRib(): string {
    return faker.finance.iban();
  }

  static getInsuranceNumber(): string {
    return faker.string.numeric(15);
  }

  static getRegistrationDate(): string {
    const registrationDate = faker.date.past({years : 10}); // Enregistré il y a moins de 10 ans
    return registrationDate.toLocaleDateString("fr-FR");
  }
}
