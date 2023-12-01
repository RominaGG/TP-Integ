const miAplicacion = Vue.createApp({
    // creamos el diccionario para acceder a los componentes que se mostraran en el html
    components: {
        'home' : componente_home,
        'propiedades' : componente_propiedades,
        'vendedores' : componente_vendedores
    },
    // inicializamos las variables en negativo para que no se superpongan
    data() {
        return {
            // inicializamos el spinner de carga en true (se mostrara hasta que se cargue la pag)
            error:false,
            loading:true,
            home_view: false,
            propiedades_view: false,
            vendedores_view: false,
        }
    },
    // esto es lo primero que se verá al ingresar al sitio
    mounted() {
        // lo primero que carga es la view del home
        this.home_view = true
        // y cancela el load del spinner
        this.loading = false
    },
    // definimos las fx para cambiar la view activa cuando el admin aprete los botones
    // de nuevo debemos poner en FALSE las demas views excepto la que elija el admin
    methods: {
        // fx que evalua la opcion del admin y muestra el componente
        // el parametro componente es lo que llega del html(on:click="show()"")
        show(componente) {
            this.home_view = false
            this.propiedades_view = false
            this.vendedores_view = false
            if (componente == 'home') {
                this.home_view = true
            } else if (componente == 'propiedades') {
                this.propiedades_view = true
            } else if (componente == 'vendedores') {
                this.vendedores_view = true
            }
        }
    },
}).mount("#app")
