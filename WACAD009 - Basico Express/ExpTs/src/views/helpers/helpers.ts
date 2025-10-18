import { Tech } from "./helpersTypes";

export function technologiesList(tech: Tech[]) {
  const list = tech.filter(t => t.poweredByNodejs).map((p) => `<li>${p.name}-${p.type} </li>`);
  return `<ul>${list.join('')}</ul>`;
}