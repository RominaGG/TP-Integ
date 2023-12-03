console.log(location.search)     // lee los argumentos pasados a este formulario
var idVendedor=location.search.substr(12)  // producto_update.html?id=1
console.log(idVendedor)
const { createApp } = Vue
  createApp({
    data() {
      return {
        apellido:"",
        idVendedor:0,
        imagen:"",
        mail:"",
        matricula:"",
        nombre:"",
        profesion:"", 
        sueldo:0,
        telefono:0,
        url:'https://marconu2697.pythonanywhere.com/vendedores/' + idVendedor,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.idVendedor=data.idVendedor
                    this.apellido=data.apellido
                    this.nombre=data.nombre
                    this.matricula=data.matricula
                    this.profesion=data.profesion
                    this.mail=data.mail
                    this.telefono=data.telefono
                    this.sueldo=data.sueldo
                    this.imagen=data.imagen
                                        
                })
                .catch(err => {
                    console.error(err)
                    this.error=true              
                })
        },
        modificar(){
            let vendedor = {
                apellido:this.apellido,
                nombre:this.nombre,
                matricula:this.matricula,
                profesion:this.profesion,
                mail:this.mail,
                telefono:this.telefono,
                sueldo: this.sueldo,
                imagen:this.imagen
            }
            var options = {
                body: JSON.stringify(vendedor),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./views-code-tests.html"; 
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }

    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#appeditar')