import { Component, Input, OnInit } from '@angular/core';
import { CurrencyDescriptor } from '../model/event';
import { PurchaseContext } from '../model/purchase-context';

@Component({
  selector: 'app-price-tag',
  templateUrl: './price-tag.component.html'
})
export class PriceTagComponent implements OnInit {
  @Input()
  event: PurchaseContext;
  @Input()
  formattedPrice: string;
  @Input()
  discountedPrice: string;
  @Input()
  showTaxDetails: boolean;
  @Input()
  displayTextInline: boolean;
  @Input()
  showDiscount: boolean;

  displayCurrencySymbol: boolean;
  currencyDescriptor: CurrencyDescriptor;

  ngOnInit(): void {
    this.currencyDescriptor = this.event.currencyDescriptor;
    this.displayCurrencySymbol = this.currencyDescriptor && this.currencyDescriptor.symbol !== this.currencyDescriptor.code;
  }

  get displayDiscountedPrice(): boolean {
    return this.showDiscount && this.discountedPrice != null && this.discountedPrice !== this.formattedPrice;
  }

  get showTaxes(): boolean {
    return this.showTaxDetails && (Number(this.event.vat) || 0) > 0.0;
  }

  removeRedundantPrecision(input: string): string {
    let substringEnd = input.lastIndexOf('.');
    if (substringEnd > -1) {
      const fraction = input.substring(substringEnd + 1);
      let additionalChars = 1;
      for (let i = 0; i < fraction.length; i++) {
        if (fraction.charAt(i) !== '0') {
          additionalChars++;
        }
      }
      if (additionalChars > 1) {
        substringEnd += additionalChars;
      }
      return input.substring(0, substringEnd);
    }
    return input;
  }
}
