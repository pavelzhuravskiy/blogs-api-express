export type MongoBlogQueryModel = {
  searchNameTerm: null | string;
  searchLoginTerm: string| null;
  searchEmailTerm: null | string;
  sortBy: string;
  sortDirection: string;
  pageNumber: number;
  pageSize: number;
};