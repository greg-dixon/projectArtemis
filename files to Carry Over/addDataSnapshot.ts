const addDataSnapshot = (dataArray: object, path?: string): void => {
  if (!path) {
    path = "../../../artemisCache.json";
  }
  //Sets a default path if one is not passed as an argument
  try {
    Deno.writeTextFileSync(path, JSON.stringify(dataArray));
    console.log("You've successfully added a data snapshot");
  } catch (err) {
    console.log(err);
  }
};

export default addDataSnapshot;
