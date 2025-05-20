export const NAVEBAR_ITEMS = [
  {
    title: "Jobs",
    route: "/job",
  },
  {
    title: "Interview Experience",
    route: "/interview-experience",
  },
  {
    title: "About Us",
    route: "/about",
  },
];

export let globalEmail: string | null = null;

export const setGlobalEmail = (data: string) => {
  globalEmail = data;
};
