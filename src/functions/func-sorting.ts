export const funcSorting = (obj: any, field: string, direction: string) => {
  if (field === "name" && direction === "desc") {
    return (obj.name = -1);
  } else if (field === "name") {
    return (obj.name = 1);
  } else if (field === "createdAt" && direction === "asc") {
    return (obj.createdAt = 1);
  } else {
    return (obj.createdAt = -1);
  }
};