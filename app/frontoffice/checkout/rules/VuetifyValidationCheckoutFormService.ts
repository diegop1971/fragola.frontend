class VuetifyValidationCheckoutFormService {
  public static async validateRuleEmail(value: string): Promise<boolean | string> {
    if (!value) {
      return 'The email is required.'
    }
    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@(hotmail\.com|outlook\.com|gmail\.com|yahoo\.com|icloud\.com|protonmail\.com|zoho\.com|aol\.com)$/
    if (!emailPattern.test(value)) {
      return 'The email must be from Hotmail, Outlook, Google, Yahoo, iCloud, ProtonMail, Zoho, or AOL.'
    }
    return true
  }

  public static async validateName(value: string): Promise<boolean | string> {
    // Check if the value is a string
    if (typeof value !== 'string') {
      return 'The field must be a string'
    }

    // Check if the value is empty
    if (value.trim() === '') {
      return 'The field is required.'
    }

    // Check if the value starts or ends with a space
    if (/^\s|\s$/.test(value)) {
      return 'Spaces at the beginning or end are not allowed.'
    }

    // Check the length of the value
    if (value.length < 1 || value.length > 50) {
      return 'The field field must be between 1 and 50 characters.'
    }

    // Check if the value contains only alphabetic characters
    const regex = /^[a-zA-Z\s]*$/
    if (!regex.test(value)) {
      return 'The field field can only contain alphabetic characters and spaces.'
    }

    return true
  }
}

export default VuetifyValidationCheckoutFormService
