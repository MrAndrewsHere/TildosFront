export const ViewOrPreview = {

    computed: {
        ViewOrPreview: {
            get() {
                return this.$route.meta.mode === 'view' || this.$route.meta.mode === 'preview';
            }
        },
    }
}

export const View = {

    computed: {
        View: {
            get() {
                return this.$route.meta.mode === 'view';
            }
        },
    }
}

export const Preview = {

    computed: {
        Preview: {
            get() {
                return this.$route.meta.mode === 'preview';
            }
        },
    }
}


export const Edit = {

    computed: {
        Preview: {
            get() {
                return this.$route.meta.mode === 'edit';
            }
        },
    }
}
export const isSomeRole = {

    computed: {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
        isSuperAdmin : function(){ return this.$store.getters.isSuperAdmin},
        isAdmin : function(){ return this.$store.getters.isAdmin},
        isDomainAdmin : function(){ return this.$store.getters.isDomainAdmin},
    }
}