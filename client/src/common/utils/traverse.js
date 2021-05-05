import isEmpty from "../components/validation/is-empty";
export default function traverse(graph, path, def = undefined) {
  if (isEmpty(graph)) {
    return def;
  }

  let leaf = graph;
  const keys = path.split(".");
  for (let index = 0; index < keys.length; ++index) {
    const key = keys[index];
    if (leaf[key] === undefined || leaf[key] === null) {
      return def;
    }
    leaf = leaf[key];
  }
  return leaf;
}
