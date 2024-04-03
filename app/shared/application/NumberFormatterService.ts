class NumberFormatterService
{
    constructor(){}

    public formatNumber(number: number): number
    {
      const locale = 'es-AR';
      const minimumFractionDigits = 2;
      const maximumFractionDigits = 2;

      let formattedNumber = number.toLocaleString(locale, {
        minimumFractionDigits: minimumFractionDigits,
        maximumFractionDigits: maximumFractionDigits,
      });

      // Detecta los separadores de miles y decimales
      const thousandSeparator = (1e3).toLocaleString(locale).charAt(1);
      const decimalSeparator = (0.1).toLocaleString(locale).charAt(1);

      // Elimina los separadores de miles
      formattedNumber = formattedNumber.replace(new RegExp('\\' + thousandSeparator, 'g'), '');

      // Reemplaza el separador decimal por un punto
      formattedNumber = formattedNumber.replace(decimalSeparator, '.');

      // Convierte la cadena de texto a un número
      const result = parseFloat(formattedNumber);

      return result;
    }
}
export default NumberFormatterService;
