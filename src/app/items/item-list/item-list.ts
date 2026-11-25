import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ItemService } from '../item-service';
import { STOCK_URGENCY_DISPLAY } from '../stock-urgency-display';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-item-list',
  styleUrl: './item-list.css',
  templateUrl: './item-list.html',
})
export class ItemList {
  private readonly itemService = inject(ItemService);

  protected readonly items = toSignal(this.itemService.getAllItems(), { initialValue: [] });
  protected readonly stockUrgencyDisplay = STOCK_URGENCY_DISPLAY;
}
