import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, type Observable } from 'rxjs';

export class DataSourceUser<T> extends DataSource<T> {

  data = new BehaviorSubject<T[]>([]);
  originalData: T[] = [];

  connect(): Observable<T[]> {
    return this.data;
  }

  init(data: T[]) {
    this.originalData = data;
    this.data.next(data);
  }

  disconnect() { }

}
