interface Sort {
    order: "asc" | "desc";
    orderBy: keyof User;
}