import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[ngxLoading]'
})
export class LoadingButtonDirective implements OnChanges {

  @Input() textLoading!: string;
  @Input() textInitial!: string;
  @Input() loadingFlag: boolean | undefined = undefined;
  @Input() disabled!: boolean;

  constructor(private elementRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.elementRef.nativeElement.innerText = (this.loadingFlag) ? this.textLoading : this.textInitial;
    if (this.loadingFlag !== undefined) {
      this.elementRef.nativeElement.disabled = this.loadingFlag;
    }
    if (this.disabled) {
      this.elementRef.nativeElement.disabled = this.disabled;
    }

  }

}
