import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ItemList } from './item-list';
import { ItemService } from '../item-service';
import { ItemOverview } from '../item.model';

describe('ItemList', () => {
  const items: ItemOverview[] = [
    { id: '1', name: 'MacBuk Air', price: 3179.99, amountOfStock: 4, stockUrgency: 'STOCK_LOW' },
    { id: '2', name: 'iPhony', price: 799.99, amountOfStock: 25, stockUrgency: 'STOCK_HIGH' },
  ];
  let fixture: ComponentFixture<ItemList>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    const itemServiceStub = { getAllItems: () => of(items) };

    await TestBed.configureTestingModule({
      imports: [ItemList],
      providers: [{ provide: ItemService, useValue: itemServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemList);
    await fixture.whenStable();
    compiled = fixture.nativeElement as HTMLElement;
  });

  async function typeInFilter(text: string) {
    const filterInput = compiled.querySelector<HTMLInputElement>('input.filter')!;
    filterInput.value = text;
    filterInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();
  }

  function displayedItemNames(): string[] {
    return Array.from(compiled.querySelectorAll('.card-title')).map((title) =>
      title.textContent!.trim(),
    );
  }

  it('should display one card per item', () => {
    expect(compiled.querySelectorAll('.card').length).toBe(2);
  });

  it('should display the name and the price of an item', () => {
    const firstCard = compiled.querySelector('.card')!;
    expect(firstCard.querySelector('.card-title')?.textContent).toContain('MacBuk Air');
    expect(firstCard.querySelector('.card-footer')?.textContent).toContain('€3,179.99');
  });

  it('should display the stock urgency with the matching colored icon', () => {
    const stocks = compiled.querySelectorAll('.stock');
    expect(stocks[0].textContent).toContain('Low');
    expect(stocks[0].querySelector('img')?.getAttribute('src')).toBe('img/warning-icon-red.png');
    expect(stocks[1].textContent).toContain('High');
    expect(stocks[1].querySelector('img')?.getAttribute('src')).toBe('img/warning-icon-green.png');
  });

  it('should only display the items whose name starts with the filter, ignoring the case', async () => {
    await typeInFilter('mac');

    expect(displayedItemNames()).toEqual(['MacBuk Air']);
  });

  it('should display a message when no item matches the filter', async () => {
    await typeInFilter('air');

    expect(displayedItemNames()).toEqual([]);
    expect(compiled.textContent).toContain('No items found.');
  });

  it('should display all the items again when the filter is cleared', async () => {
    await typeInFilter('mac');
    await typeInFilter('');

    expect(displayedItemNames()).toEqual(['MacBuk Air', 'iPhony']);
  });
});
