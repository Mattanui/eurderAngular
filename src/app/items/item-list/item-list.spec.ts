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
});
