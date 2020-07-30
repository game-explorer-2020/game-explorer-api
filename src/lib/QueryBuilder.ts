class QueryBuilder {
  private readonly itemsPerPage = 10;

  private fields: string[];
  private whereSentence: string | null;
  private sortField: string | null;
  private sortOrder: 'asc' | 'desc';
  private pageValue: number;

  constructor() {
    this.fields = [];
    this.whereSentence = null;
    this.sortField = null;
    this.sortOrder = 'desc';
    this.pageValue = 0;
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

  page(pageValue: number): this {
    if (pageValue) {
      this.pageValue = pageValue;
    }
    return this;
  }

  build(): string {
    let query = '';

    if (this.fields?.length) {
      query += this.buildFields();
    }

    if (this.sortField) {
      query += this.buildSort();
    }

    if (this.whereSentence) {
      query += this.buildWhere();
    }

    if (this.pageValue) {
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

  private buildOffset(): string {
    return `offset ${this.pageValue * this.itemsPerPage};`;
  }
}

export default QueryBuilder;
