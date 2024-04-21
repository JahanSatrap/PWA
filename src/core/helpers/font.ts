const farsiDigits: string[] = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
const englishDigits: string[] = ['0','1','2','3','4','5','6','7','8','9']

const converter = (input:string) => {
  if (englishDigits.indexOf(input) >= 0){
    return farsiDigits[parseInt(input)]
  }
  else {
    return input
  }
}

export function toFarsiNumber(n:string) {
  return n
    .toString()
    .split('')
    .map((x) => converter(x))
    .join('')
}
