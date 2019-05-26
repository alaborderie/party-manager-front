export function handleAuthError(err: any) {
  if (err.response) {
  //  Error comes from server
    switch(err.response.status) {
      case 401:
        return 'Email et/ou mot de passe erroné.';
      case 403:
        return 'Vous n\'avez pas les droits nécessaires.';
      default:
        return err.toString();
    }
  } else {
    return err.toString();
  }
}
