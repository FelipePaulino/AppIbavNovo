// 1239856
function maskCep(value: string) {
  value = value.replace(/\D/g, "")
  value = value.replace(/(\d{5})(\d)/, "$1-$2")
  value = value.replace(/(-\d{4})(\d+?)$/, "$1");
  return value
}

// (11)1111-1111 
function maskPhone(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/g, "($1)$2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
}

// 11.111,11 (Separação por casas)
function maskCurrency(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
  return value;
}

const maskEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export { maskCep, maskPhone, maskCurrency, maskEmail };
