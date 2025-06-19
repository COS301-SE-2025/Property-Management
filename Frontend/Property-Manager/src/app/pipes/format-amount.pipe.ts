import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAmount'
})
export class FormatAmountPipe implements PipeTransform {

  transform(value: number): string {
    const amountString = value.toString();
    if(amountString.length === 5)
    {
      return `${amountString.slice(0,2)} ${amountString.slice(2)}`;
    }
    else if(amountString.length === 6)
    {
       return `${amountString.slice(0,3)} ${amountString.slice(3)}`;
    }
    return amountString; 
  }
}
