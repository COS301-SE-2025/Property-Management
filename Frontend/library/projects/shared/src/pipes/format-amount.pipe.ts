import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAmount'
})
export class FormatAmountPipe implements PipeTransform {

  transform(value: number): string {

    const amountString = value.toFixed(2);
    const [integer, decimal] = amountString.split('.');
    
    let formatted = integer;

    if(formatted.length === 5)
    {
      return `${formatted.slice(0,2)} ${formatted.slice(2)}`;
    }
    else if(formatted.length === 6)
    {
       return `${formatted.slice(0,3)} ${formatted.slice(3)}`;
    }
    else if(formatted.length >= 7)
    {
      return `${formatted.slice(0,1)} ${formatted.slice(1, 4)} ${formatted.slice(4)}`;
    }
    return `${formatted}.${decimal}`; 
  }
}
