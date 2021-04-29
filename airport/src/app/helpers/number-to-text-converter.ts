export class NumberToTextConverter {
  public static ConvertNumber(inputNumber: number): string {
    const singleDigits = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eight', 'Ninth'];
    const teens = ['Tenth', 'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth'];
    const doubleDigitsTh = ['Twentieth', 'Thirtieth', 'Fortieth', 'Fiftieth', 'Sixtieth', 'Seventieth', 'Eightieth', 'Ninetieth'];
    const doubleDigits = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (inputNumber < 10) {
      return singleDigits[inputNumber - 1];
    }
    if (inputNumber >= 10 && inputNumber < 20) {
      return teens[inputNumber - 10];
    }
    if (inputNumber < 100) {
      if (inputNumber % 10 === 0) {
        return doubleDigitsTh[inputNumber / 10 - 2];
      }

      const n = Math.floor(inputNumber / 10);
      let s = `${doubleDigits[n - 2]} `;
      s += singleDigits[inputNumber % 10 - 1].toLowerCase();

      return s;
    }

    return inputNumber.toString();
  }
}
