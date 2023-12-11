const vendedoresView = Vue.createApp({
    data() {
        return {
            vendedores: [],
            url: 'https://rominagg.pythonanywhere.com/vendedores',   
            error: false,
            loading: true,
            /*atributos para el guardar los valores del formulario */
            apellido: "",
            idVendedor: 0,
            imagen: "",
            descripcion:"",
            mail: "",
            matricula: "",
            nombre: "",
            profesion: "",
            sueldo: 0,
            telefono: 0,
        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(this.url)
                    this.vendedores = data
                    console.log(data)
                    this.loading = false
                })
                .catch(err => {
                    console.error(err)
                    this.error = true
                })
        },
        
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#view_vend')