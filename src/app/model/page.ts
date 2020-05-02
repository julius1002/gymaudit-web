export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    number: number;
    size: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
    sort: Sort;
  }
  
  export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  }
  