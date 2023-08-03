export function comparedValues(a: any, b: any) {
    if (a.value > b.value) return 1;
    if (a.value < b.value) return -1;
    return 0;
  }

  export function comparedNames(a: any, b: any) {
    if (a.nome > b.nome) return 1;
    if (a.nome < b.nome) return -1;
    return 0;
  }


  export function comparedDisc(a: any, b: any) {
    if (a.discipulador > b.discipulador) return 1;
    if (a.discipulador < b.discipulador) return -1;
    return 0;
  }


  export function comparedNamesIndex(a: any, b: any) {
    if (a[1].nome > b[1].nome) return 1;
    if (a[1].nome < b[1].nome) return -1;
    return 0;
  }