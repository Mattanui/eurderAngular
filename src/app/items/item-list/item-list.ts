import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ItemService } from '../item-service';
import { STOCK_URGENCY_DISPLAY } from '../stock-urgency-display';
import { filterStartingWith } from '../../shared/starts-with-filter';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-item-list',
  styleUrl: './item-list.css',
  templateUrl: './item-list.html',
})
export class ItemList {
  private readonly itemService = inject(ItemService);

  private readonly items = toSignal(this.itemService.getAllItems(), { initialValue: [] });
  protected readonly searchText = signal('');
  protected readonly filteredItems = computed(() =>
    filterStartingWith(this.items(), this.searchText(), (item) => item.name),
  );
  protected readonly stockUrgencyDisplay = STOCK_URGENCY_DISPLAY;
}
