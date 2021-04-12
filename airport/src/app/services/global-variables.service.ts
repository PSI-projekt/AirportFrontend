import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  public lastPage: number;

  constructor() {
    this.lastPage = 1;
  }

  public setLastPage(page: number | undefined): void {
    this.lastPage = page === undefined ? 1 : page;
  }
}
