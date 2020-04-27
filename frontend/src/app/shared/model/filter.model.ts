export class FilterModel {
  filters: Array<Filter>;
  order_by: Array<OrderBy>;

  constructor() {
    this.filters = new Array<Filter>();
    this.order_by = new Array<OrderBy>();
  }
}

export class Filter {
  name: string;
  op: string;
  val: string | number | boolean;

  constructor(name: string, op: string, val: string | number | boolean) {
    this.name = name;
    this.op = op;
    this.val = val;
  }
}

export class OrderBy {
  field: string;
  direction: 'asc' | 'desc';

  constructor(field: string, direction: 'asc' | 'desc') {
    this.field = field;
    this.direction = direction;
  }
}
