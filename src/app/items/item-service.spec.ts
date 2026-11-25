import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ItemService } from './item-service';
import { ItemOverview } from './item.model';
import { environment } from '../../environments/environment';

describe('ItemService', () => {
  let service: ItemService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ItemService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('getAllItems should GET /items and return the items of the backend', () => {
    const backendItems: ItemOverview[] = [
      { id: '1', name: 'iPhony', price: 799.99, amountOfStock: 25, stockUrgency: 'STOCK_HIGH' },
    ];
    let receivedItems: ItemOverview[] | undefined;

    service.getAllItems().subscribe((items) => (receivedItems = items));

    const request = httpTesting.expectOne(`${environment.apiUrl}/items`);
    expect(request.request.method).toBe('GET');
    request.flush(backendItems);

    expect(receivedItems).toEqual(backendItems);
  });
});
