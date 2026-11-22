/**
 * Builds a new user with a unique email so every test run starts clean.
 * Base data comes from cypress/fixtures/users.json.
 */
export const buildUser = (base) => {
  const id = Date.now();
  return {
    ...base,
    name: `${base.name}${id}`,
    email: `qa.lulu.${id}@testmail.com`,
  };
};
