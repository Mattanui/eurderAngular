import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ItemOverview } from './item.model';
import { Observable } from 'rxjs';

@Service()
export class ItemService {
  private readonly http = inject(HttpClient);
  private readonly itemUrl = `${environment.apiUrl}/items`;

  getAllItems(): Observable<ItemOverview[]> {
    return this.http.get<ItemOverview[]>(this.itemUrl);
  }
}
