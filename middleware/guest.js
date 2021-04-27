export default function ({ redirect, $strapi, $toast}) {
   if ($strapi.user) {
       $toast.error('Vous ne pouvez pas accéder à cette page.')
       return redirect('/')
  }
}