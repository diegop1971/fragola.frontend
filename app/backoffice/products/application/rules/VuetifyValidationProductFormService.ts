class VuetifyValidationProductFormService {
  public static async validateProductRuleName(value: string): Promise<boolean | string> {
    if (typeof value === 'string' && (value.length > 1 && value.length < 50)) {
      return true
    }
    return 'El nombre es requerido'
  }

  public static async validateProductRuleDescription(value: string): Promise<boolean | string> {
    if (typeof value === 'string' && (value.length > 1 && value.length < 500)) {
      return true
    }
    return 'La descripcion corta es requerida, debe ser mayor a un caracter y menor a 500 caracteres'
  }

  public static async validateProductRuleDescriptionShort(value: string): Promise<boolean | string> {
    if (typeof value === 'string' && (value.length > 1 && value.length < 250)) {
      return true
    }
    return 'La descripcion corta es requerida, debe ser mayor a un caracter y menor a 250 caracteres'
  }

  public static async validateNumberGreaterThanOne(value: number): Promise<boolean | string> {
    const numericValue = Number(value)
    if (!isNaN(numericValue) && numericValue > 0) {
      return true 
    }
    return 'El campo es requerido y debe ser un número mayor a 0'
  }

  public static async validateProductRuleProductEnabled(value: boolean): Promise<boolean | string> {
    if (typeof value === 'boolean') {
      return true
    }
    return 'El campo enabled es requerido y debe ser true o false'
  }

  public static async validateProductRuleProductLowAlertEnabled(value: boolean): Promise<boolean | string> {
    if (typeof value === 'boolean') {
      return true
    }
    return 'El campo enabled es requerido y debe ser true o false'
  }
}

export default VuetifyValidationProductFormService
