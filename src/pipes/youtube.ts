import { Injectable, Pipe } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe ({
  name: 'youtube'
})

@Injectable()
export class YouTube {
  constructor(private dom: DomSanitizer){

  }
  // Sanitize YouTube URLs
  transform(value, args) {
    return this.dom.bypassSecurityTrustResourceUrl(value);
  }
}
