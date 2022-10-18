const tableHeaders = {
  product: ["Logo", "Name", "Category", "Amount", "Unit", "Company", "Created"],
  company: [
    "Logo",
    "Name",
    "Legal Number",
    "Website",
    "Inc.Country",
    "Created",
  ],
};
const tableKeys = {
  product: [
    "photo",
    "name",
    "category",
    "amount",
    "amountUnit",
    "company",
    "createdAt",
  ],
  company: [
    "photo",
    "name",
    "legalNumber",
    "website",
    "incorporationCountry",
    "createdAt",
  ],
};

const ago = (createDate: any) => {
  const date = Date.now() - Date.parse(createDate);
  // prettier-ignore
  if(date>(1000*60*60*24*7*4*12)) return `${Math.floor(date/(1000*60*60*24*7*4*12))} y`;
  else if(date>(1000*60*60*24*7*4)) return `${Math.floor(date/(1000*60*60*24*7*4))} m`;
  else if(date>(1000*60*60*24*7)) return `${Math.floor(date/(1000*60*60*24*7))} w`;
  else if(date>(1000*60*60*24)) return `${Math.floor(date/(1000*60*60*24))} d`;
  else if(date>(1000*60*60)) return `${Math.floor(date/(1000*60*60))} h`;
  else if(date>(1000*60)) return `${Math.floor(date/(1000*60))} m`;
  else if(date>(1000)) return `${Math.floor(date/(1000))} s`;
  return "0y";
};

export { tableHeaders, tableKeys, ago };
