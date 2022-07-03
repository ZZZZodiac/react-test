export function PrepareData(loans) {
  loans.forEach((element) => {
    if (typeof element.available === "string") {
      element.available = Number(element.available.replace(/\,/g, ""));
    }
    if (typeof element.amount==='string') {
      element.amount = Number(element.amount.replace(/\,/g, ""))
    }
  });
  return loans;
}
