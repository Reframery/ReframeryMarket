export const isValidEmail = (str: string) => {
  const reContainSymbol = new RegExp("^.*@.*$")
  return reContainSymbol.test(str)
}

export const isValidPassword = (str: string) => {
  const reContainUppercase = new RegExp("^.*[A-Z].*$")
  const reContainLowercase = new RegExp("^.*[a-z].*$")
  const reContainNumber = new RegExp("^.*[0-9].*$")
  const reLength = new RegExp("^.{6,}$")
  return (
    reContainUppercase.test(str) &&
    reContainLowercase.test(str) &&
    reContainNumber.test(str) &&
    reLength.test(str)
  )
}

export const isValidPhoneNumber = (str: string) => {
  const reLength = new RegExp("^.{11,20}$")
  return reLength.test(str)
}

export const isValidUsername = (str: string) => {
  const reLength = new RegExp("^.{1,15}$")
  return reLength.test(str)
}

export const isValidAddress = (str: string) => {
  const reAddress = new RegExp("^[A-Za-z0-9 ]*$")
  return reAddress.test(str)
}

export const isValidCityAndCountry = (str: string) => {
  const reCityAndCountry = new RegExp("^[A-Za-z ]*$")
  return reCityAndCountry.test(str)
}

export const isValidPostcode = (str: string) => {
  const rePostcode = new RegExp("^[A-Z0-9 ]{6,}$")
  return rePostcode.test(str)
}
