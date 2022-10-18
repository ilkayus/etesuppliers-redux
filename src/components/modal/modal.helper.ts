const formNames = {
  company: [
    "Name",
    "Legal N.",
    "Website",
    "Inc.Country",
    "Logo",
    "Description",
  ],
  product: [
    "Name",
    "Category",
    "Amount",
    "Unit",
    "Company",
    "Logo",
    "Description",
  ],
};

const formKeys = {
  company: [
    "name",
    "legalNumber",
    "website",
    "incorporationCountry",
    "photo",
    "description",
  ],
  product: [
    "name",
    "category",
    "amount",
    "amountUnit",
    "company",
    "photo",
    "description",
  ],
};

const formRequired = new Set([
  "name",
  "legalNumber",
  "website",
  "incorporationCountry",
  "category",
  "company",
]);

export { formNames, formKeys, formRequired };
