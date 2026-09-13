/**
 * TODO (Venu): swap these for what you are actually reading.
 * Keep 3 to 6 entries. `note` is your own one line, not a blurb.
 * `spine` is the colour of the book spine in the 3D shelf.
 */
export type Book = {
  title: string;
  author: string;
  status: "reading" | "finished" | "next";
  note: string;
  spine: string;
};

export const books: Book[] = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    status: "reading",
    note: "Replication and partitioning made me rethink how I model schemas.",
    spine: "#2f4858",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Hunt and Thomas",
    status: "finished",
    note: "The chapter on orthogonality is the one that stuck.",
    spine: "#7a3b2e",
  },
  {
    title: "Clean Architecture",
    author: "Robert C. Martin",
    status: "next",
    note: "Picked it up to argue with it as much as to learn from it.",
    spine: "#4a5a4e",
  },
];
