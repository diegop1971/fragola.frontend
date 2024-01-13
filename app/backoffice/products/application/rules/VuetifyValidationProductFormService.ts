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
    if (!isNaN(numericValue) && numericValue > 1) {
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

  public static async validateMinimumQuantityRules(minimumQuantity: number, lowStockThreshold: number): Promise<boolean | string> {
    const numericMinimumQuantity = Number(minimumQuantity)
    const numericlowStockThreshold = Number(lowStockThreshold)
    if (!isNaN(numericMinimumQuantity) && numericMinimumQuantity <= numericlowStockThreshold ) {
      return true 
    }
    return 'Debe ser un número mayor a 0 y menor o igual a low stock threshold'
  }

  public static async validateLowStockThresholdRules(lowStockThreshold: number, minimumQuantity: number): Promise<boolean | string> {
    const numericlowStockThreshold = Number(lowStockThreshold)
    const numericMinimumQuantity = Number(minimumQuantity)
    if (!isNaN(numericlowStockThreshold) && numericlowStockThreshold >= numericMinimumQuantity ) {
      return true 
    }
    return 'Debe ser un número mayor o igual a cantidad minima'
  }
  
}

export default VuetifyValidationProductFormService
