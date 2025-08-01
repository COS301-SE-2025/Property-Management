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
    else if(amountString.length >= 7)
    {
      return `${amountString.slice(0,1)} ${amountString.slice(1, 4)} ${amountString.slice(4)}`;
    }
    return amountString; 
  }
}
