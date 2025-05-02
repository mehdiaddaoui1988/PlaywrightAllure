import { faker } from "@faker-js/faker";
import moment from "moment";

export class DataFactoryPhysicalMember {
  static getFirstName(gender: "Male" | "Female" | "Other"): string {
    return faker.person.firstName(gender === "Male" ? "male" : "female");
  }

  static getLastName(): string {
    return faker.person.lastName();
  }

  static getGender(): "Male" | "Female" | "Other" {
    return faker.helpers.arrayElement(["Male", "Female", "Other"]);
  }

  static getEmail(): string {
    return faker.internet.email();
  }

  static getPassword(): string {
    return "MotDePasseSecurise123"; // Remplacez par une logique de génération si nécessaire
  }

  static getBirthDate(): string {
    const birthDate = faker.date.birthdate({ min: 18, max: 80, mode: "age" });
    return birthDate.toLocaleDateString("fr-FR");
  }
  static getRandomBirthDate(): string {
    
    const currentDate = moment();
    //  30 jours (1 mois) et 43800 jours (120 ans)
    const randomDays = faker.number.int({ min: 30, max: 43800 });
    
    const birthDate = currentDate.subtract(randomDays, 'days');
    return birthDate.format('DD/MM/YYYY');
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

  static getRib(): string {
    return faker.finance.iban();
  }

  static getInsuranceNumber(): string {
    return faker.string.numeric(15);
  }

  static getNationalId(): string {
    return faker.string.numeric(13);
  }

  static getPassportNumber(): string {
    return faker.string.alphanumeric(9).toUpperCase();
  }

  static getMembershipNumber(): string {
    return faker.string.numeric(8);
  }

  static getSubscriptionDate(): string {
    return new Date().toLocaleDateString("fr-FR");
  }
  static getPaymentCenter():string{
    const randomNumber = faker.number.int({ min: 1, max: 9999 });
    return randomNumber.toString();
  }
  static getPaymentCenter1():number{
     
    return faker.number.int({ min: 1, max: 9999 });
  }
}

