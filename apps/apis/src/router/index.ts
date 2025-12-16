import { createPlanet, findPlanet, listPlanet } from "./planet";

export const router = {
  planet: {
    list: listPlanet,
    find: findPlanet,
    create: createPlanet,
  },
};
