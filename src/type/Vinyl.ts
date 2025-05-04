export type Vinyl = {
  id: number;
  artist: string;
  title: string;
  releaseYear?: number;
  addedDate: string;
  coverPath?: string;
  status: "wish" | "got";
};

export type NewVinyl = Omit<Vinyl, "id">;
