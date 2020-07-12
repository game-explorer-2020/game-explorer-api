class QueryBuilder {
  private fields: string[];
  private whereSentence: string | null;
  private sortField: string | null;
  private sortOrder: 'asc' | 'desc';
  private searchTerm: string | null;
  private offsetValue: number;

  constructor() {
    this.fields = [];
    this.whereSentence = null;
    this.sortField = null;
    this.sortOrder = 'desc';
    this.searchTerm = null;
    this.offsetValue = 0;
  }

  select(...fields: string[]): this {
    if (fields?.length) {
      this.fields = fields;
    }
    return this;
  }

  where(sentence: string): this {
    if (sentence) {
      this.whereSentence = sentence;
    }
    return this;
  }

  sort(field: string, order: 'asc' | 'desc' = 'desc'): this {
    if (field && order) {
      this.sortField = field;
      this.sortOrder = order;
    }
    return this;
  }

  search(term: string): this {
    if (term) {
      this.searchTerm = term;
    }
    return this;
  }

  offset(offsetValue: number): this {
    if (offsetValue) {
      this.offsetValue = offsetValue;
    }
    return this;
  }

  build(): string {
    let query = '';

    if (this.fields?.length) {
      query += this.buildFields();
    }

    if (this.whereSentence) {
      query += this.buildWhere();
    }

    if (this.searchTerm) {
      query += this.buildSearch();
    } else if (this.sortField) {
      query += this.buildSort();
    }

    if (this.offsetValue) {
      query += this.buildOffset();
    }

    return query;
  }

  private buildFields(): string {
    return `fields ${this.fields.join(',')};`;
  }

  private buildWhere(): string {
    return `where ${this.whereSentence};`;
  }

  private buildSort(): string {
    return `sort ${this.sortField} ${this.sortOrder};`;
  }

  private buildSearch(): string {
    return `search "${this.searchTerm}";`;
  }

  private buildOffset(): string {
    return `offset ${this.offsetValue};`;
  }
}

export default QueryBuilder;
