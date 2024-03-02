class VuetifyFormCommonValidationService {
  public static async validateFieldRequired(value: string): Promise<boolean | string> {
    if (typeof value === 'string' && (value.length > 1 && value.length < 50)) {
      return true
    }
    return 'The field is required.'
  }

  public static async validateNumberGreaterThanOne(value: number): Promise<boolean | string> {
    const numericValue = Number(value)
    if (!isNaN(numericValue) && numericValue > 0) {
      return true 
    }
    return 'The field is required and must be a number greater than 0'
  }
}

export default VuetifyFormCommonValidationService
