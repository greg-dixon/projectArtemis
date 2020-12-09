const clearSnapshots = (state: any, path?: string) => {
  if (!path) {
    path = "./artemisCache.json";
  }
  //Sets a default path if one is not passed as an argument
  const confirm = confirm(
    "Are you sure you want to delete all of the snapshots? You won't be able to undo this action.",
  );
  if (confirm) {
    try {
      Deno.writeTextFileSync(path, JSON.stringify([]));
      console.log("You've successfully cleared all data");
    } catch (err) {
      console.log(err);
      return err.message;
    }
  }
};

export default clearSnapshots;
