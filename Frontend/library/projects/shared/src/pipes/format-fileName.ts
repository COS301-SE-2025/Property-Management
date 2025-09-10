import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatFile'
})
export class FormatFileName implements PipeTransform {
    transform(url: string | null | undefined): string {
        if (!url) {
            return 'No file available';
        }
    
        const parts = url.split('/');
        const lastPart = parts[parts.length - 1];
        const longFilename = lastPart.split('?')[0];
        const filenameArr = longFilename.split('-');
        const filename = filenameArr[filenameArr.length - 1];
    
        return decodeURIComponent(filename);
    }
}