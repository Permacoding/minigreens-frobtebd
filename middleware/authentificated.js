export default function ({redirect, $strapi, $toast}) {
   if (!$strapi.user) {
       $toast.error('Vous devez vous authentifier pour accéder à cette page.')
    return redirect('/auth/login')
  }
}
