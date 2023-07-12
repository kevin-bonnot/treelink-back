import Link from "./Link";

export default interface UserWithLinks {
  id: number;
  name: string;
  links: Link[];
}