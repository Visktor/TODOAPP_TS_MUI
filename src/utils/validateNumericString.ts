// If we need the string to contain one or more dots, we need to pass the
// function either a boolean or a number as the second argument. When a
// number is passed, it'll allow that specific ammount of dots in the
// string. When a boolean is passed It'll allow an infinite ammount of
// dots within the string, as long as there's at least a single number
// in between dots.

export default function numericStrValidation(
  str: string,
  dots?: boolean | number
): boolean {
  if (dots) {
    if (typeof dots === "boolean") {
      return str.match(/^[\d]+(\.[\d]+)*$/gm) ? true : false;
    }

    if (typeof dots === "number") {
      const regex = new RegExp(`^[\\d]+(\\.[\\d]+){0,${dots}}$`, "gm");
      return str.match(regex) ? true : false;
    }
  }

  return str.match(/^[\d]+$/gm) ? true : false;
}
