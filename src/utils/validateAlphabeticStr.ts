type alphaValidationOption = "spaces" | "uppers" | "all";

export default function alphabeticStrValidation(
  str: string,
  option?: alphaValidationOption
): boolean {
  const regexObj = {
    all: /^[a-záàâãéèêíïóôõöúçñ\s]+$/gim,
    spaces: /^[a-záàâãéèêíïóôõöúçñ\s]+$/gm,
    uppers: /^[a-záàâãéèêíïóôõöúçñ]+$/gim,
    default: /^[a-záàâãéèêíïóôõöúçñ]+$/gm,
  };

  return str.match(regexObj[option ?? "default"]) ? true : false;
}
