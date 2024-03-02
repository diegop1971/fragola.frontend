class VuetifyValidationProductFormService {
  public static async validateProductRuleName(value: string): Promise<boolean | string> {
    if (typeof value === 'string' && (value.length > 1 && value.length < 50)) {
      return true
    }
    return 'The name field is required.'
  }

  public static async validateProductRuleDescription(value: string): Promise<boolean | string> {
    if (typeof value === 'string' && (value.length > 1 && value.length < 500)) {
      return true
    }
    return 'The short description is required, it must be greater than one character and less than 500 characters.'
  }

  public static async validateProductRuleDescriptionShort(value: string): Promise<boolean | string> {
    if (typeof value === 'string' && (value.length > 1 && value.length < 250)) {
      return true
    }
    return 'The short description is required, it must be greater than one character and less than 250 characters.'
  }

  public static async validateProductRuleProductEnabled(value: boolean): Promise<boolean | string> {
    if (typeof value === 'boolean') {
      return true
    }
    return 'The enabled field is required and must be true or false.'
  }

  public static async validateProductRuleProductLowAlertEnabled(value: boolean): Promise<boolean | string> {
    if (typeof value === 'boolean') {
      return true
    }
    return 'The Low stock alert field is required and must be true or false.'
  }
}

export default VuetifyValidationProductFormService
