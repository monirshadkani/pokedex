import ky from "ky";

(async () => {
  const parsed = await ky
    .post("https://pokedex.3rgo.tech/", { json: { foo: true } })
    .json();

  console.log(parsed);
  //=> `{data: '🦄'}`
})();
