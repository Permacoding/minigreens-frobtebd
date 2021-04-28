export default async function ({redirect, $strapi, $toast}) {
  if(process.server){
    await $strapi.fetchUser();
    if (!$strapi.user) {
      return redirect('/auth/login');
    }
  }
  if(process.client){
        if (!$strapi.user) {
    $toast.error('Vous devez vous authentifier pour accéder à cette page.')
    return redirect('/farm');
  }
  }
}
