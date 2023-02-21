export type MongoBlogQueryModel = {
  searchNameTerm: string | null;
  sortBy: string;
  sortDirection: string;
  pageNumber: number;
  pageSize: number;
};