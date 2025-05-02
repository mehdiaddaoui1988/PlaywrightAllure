import { faker } from "@faker-js/faker";

export class DataFactoryPhysicalMember {
  static getGenderData() {
    const gender = faker.helpers.arrayElement(["Male", "Female"]);
    const civility = gender === "Male" ? "Monsieur" : "Madame";
    const firstName = faker.person.firstName(gender === "Male" ? "male" : "female");

    return { gender, civility, firstName };
  }

  static getEmployeeDataOthers() {
    const gender = faker.helpers.arrayElement(["Male", "Female"]);
    const lastName = faker.person.lastName();

    return { gender, lastName };
  }

  static getLastName(): string {
    return faker.person.lastName();
  }

  static getEmail(): string {
    return faker.internet.email();
  }

  static getBirthData() {
    const birthDate = faker.date.birthdate({ min: 18, max: 80, mode: "age" });
    const birthCountry = faker.location.country();
    const birthDepartment = faker.helpers.rangeToNumber({ min: 1, max: 95 }).toString().padStart(2, "0");

    return { birthDate: birthDate.toLocaleDateString("fr-FR"), birthCountry, birthDepartment };
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

  static getPhoneNumber(): string {
    return faker.phone.number();
  }

  static getInsuranceNumber(): string {
    return faker.string.numeric(15);
  }

  static getNationalId(): string {
    return faker.string.numeric(13);
  }

  //  ######################################################################"
  
  static getEmployeeData() {
    const gender = faker.helpers.arrayElement(["Male", "Female"]);
    const lastName = faker.person.lastName();
    return { gender, lastName };
  }

  static getEmployeeDetails(gender: string) {
    const statusOptions = gender === "Male" 
      ? ["Part-Time Internship", "Part-Time Contract"] 
      : ["Full-Time Permanent", "Full-Time Contract"];

    const jobOptions = gender === "Male" 
      ? ["QA Lead", "QA Engineer"] 
      : ["Software Engineer", "Project Manager"];

    const includeOption = gender === "Male" 
      ? "Current and Past Employees" 
      : "Past Employees Only";

    const subUnitOptions = ["Engineering", "Administration", "Development", "Quality Assurance"];

    return {
      status: this.getRandomOption(statusOptions),
      jobTitle: this.getRandomOption(jobOptions),
      include: includeOption,
      subUnit: this.getRandomOption(subUnitOptions),
    };
  }

  static getRandomOption(options: string[]): string {
    return faker.helpers.arrayElement(options);
  }
}
