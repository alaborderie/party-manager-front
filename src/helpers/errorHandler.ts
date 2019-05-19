export function handleAxiosError(err: any) {
  if (err.response) {
  //  Error comes from server
    switch(err.response.status) {
      case 404:
        return 'Cette ressource n\'existe pas.';
      case 403:
        return 'Vous n\'avez pas les droits nécessaires.';
      default:
        return err.response;
    }
  } else {
    return err.toString();
  }
}