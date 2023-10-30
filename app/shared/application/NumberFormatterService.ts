class NumberFormatterService
{
    constructor(){}

    public formatNumber(number: number): number
    {
      const locale = 'es-AR';
      const minimumFractionDigits = 2;
      const maximumFractionDigits = 2;

      const formattedNumber = number.toLocaleString(locale, {
        minimumFractionDigits: minimumFractionDigits,
        maximumFractionDigits: maximumFractionDigits,
      });

      return formattedNumber;
    }
}
export default NumberFormatterService;

