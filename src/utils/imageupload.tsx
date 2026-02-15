import firebase from "../Firebase-global";

export const uploadImage = async (file: any) => {
  let url = await firebase
    .storage()
    .ref("/images" + file.name)
    .put(file)
    .then(async(data: any) => {
      data = await firebase
        .storage()
        .ref("/images" + file.name)
        .getDownloadURL()
        .then((url: string) => {
          return url;
        })
        .catch((err: string) => {
          console.log(err);
        });
        return data;
    })
    .catch((err: string) => {
      console.log(err);
    });
  return url;
};
