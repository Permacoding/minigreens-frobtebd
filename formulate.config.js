import { fr } from '@braid/vue-formulate-i18n'

export default{
    plugins:[fr],
    locale:'fr',
    classes:{
        wrapper:['w-full'],
        input: ['rounded-md border py-2 px-3 bg-white outline-under w-full shadow-sm'],
        element:['my-1'],
        errors: ['text-red-400 text-xs px-1 pb-2'],
        label:[''],
    }
}