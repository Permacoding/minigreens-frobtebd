export default ({ $strapi, app }) => {
  $strapi.hook('error', (error) => {
    app.$toast.error(error.message,{
    action : {
        text : 'Fermer',
        onClick : (e, toastObject) => {
            toastObject.goAway(0);
        }
    },})
  })
}
