from flask import Flask ,jsonify ,request
# del modulo flask importar la clase Flask y los métodos jsonify,request
from flask_cors import CORS       # del modulo flask_cors importar CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
app=Flask(__name__)  # crear el objeto app de la clase Flask
CORS(app) #modulo cors es para que me permita acceder desde el frontend al backend


# configuro la base de datos, con el nombre el usuario y la clave
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:kayser2012@localhost/propieteeradmin'
# URI de la BBDD                          driver de la BD  user:clave@URLBBDD/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False #none
db= SQLAlchemy(app)   #crea el objeto db de la clase SQLAlquemy
ma=Marshmallow(app)   #crea el objeto ma de de la clase Marshmallow


# defino la tabla Vendedores
class Vendedores(db.Model):   # la clase Producto hereda de db.Model    
    idVendedor=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    nombre=db.Column(db.String(100))
    apellido=db.Column(db.String(100))
    telefono=db.Column(db.Integer)
    mail=db.Column(db.String(100))
    sueldo=db.Column(db.Double)
    imagen=db.Column(db.String(500))
    matricula=db.Column(db.String(50))
    profesion=db.Column(db.String(100))


    def __init__(self,nombre,apellido,telefono,mail,sueldo,imagen,matricula,profesion):   #crea el  constructor de la clase
        self.nombre=nombre
        self.apellido=apellido
        self.telefono=telefono
        self.mail=mail
        self.sueldo=sueldo
        self.imagen=imagen
        self.matricula=matricula
        self.profesion=profesion




    # defino la tabla Propiedades
class Propiedades(db.Model):   # la clase Producto hereda de db.Model   

    idPropiedad=db.Column(db.Integer, primary_key=True)
    direccion=db.Column(db.String(100))
    provincia=db.Column(db.String(100))
    precio=db.Column(db.Double)
    ambientes=db.Column(db.String(50))
    descripcion=db.Column(db.String(1000))
    imagen=db.Column(db.String(500))
    propietario=db.Column(db.String(100))
    tel_contacto=db.Column(db.String(13))
    mail_contacto=db.Column(db.String(100))


    def __init__(self,direccion,provincia,precio,ambientes,descripcion,imagen,propietario,tel_contacto,mail_contacto):   #crea el  constructor de la clase
        self.direccion=direccion
        self.provincia=provincia
        self.precio=precio
        self.ambientes=ambientes
        self.descripcion=descripcion
        self.imagen=imagen
        self.propietario=propietario
        self.tel_contacto=tel_contacto
        self.mail_contacto=mail_contacto


with app.app_context():
    db.create_all()  # aqui crea todas las tablas

#  ************************************************************

#Configuración de los metodos de la tabla Vendedores
##
#
class VendedorSchema(ma.Schema):
    class Meta:
        fields=('idVendedor','nombre','apellido','telefono','mail','sueldo','imagen','matricula','profesion')




vendedor_schema=VendedorSchema()    

vendedor_schema=VendedorSchema(many=True)  




# crea los endpoint o rutas (json)
@app.route('/vendedores',methods=['GET'])
def get_Vendedores():
    all_vendedores=Vendedores.query.all()         # el metodo query.all() lo hereda de db.Model
    result=vendedor_schema.dump(all_vendedores)  # el metodo dump() lo hereda de ma.schema y
                                                 # trae todos los registros de la tabla
    return jsonify(result)                       # retorna un JSON de todos los registros de la tabla




@app.route('/vendedores/<idVendedor>',methods=['GET'])
def get_vendedor(idVendedor):
    vendedor=Vendedores.query.get(idVendedor)
    return vendedor_schema.jsonify(vendedor)   


@app.route('/vendedores/<idVendedor>',methods=['DELETE'])
def delete_vendedor(idVendedor):
    vendedor=Vendedores.query.get(idVendedor)
    db.session.delete(vendedor)
    db.session.commit()                     # confirma el delete
    return vendedor_schema.jsonify(vendedor) # me devuelve un json con el registro eliminado


@app.route('/vendedores', methods=['POST']) # crea ruta o endpoint
def create_vendedor():
    #print(request.json)  # request.json contiene el json que envio el cliente
    nombre=request.json['nombre']
    apellido=request.json['apellido']
    telefono=request.json['telefono']
    mail=request.json['mail']
    sueldo=request.json['sueldo']
    imagen=request.json['imagen']
    matricula=request.json['matricula']
    profesion=request.json['profesion']
    new_vendedor=Vendedores(nombre,apellido,telefono,mail,sueldo,imagen,matricula,profesion)
    db.session.add(new_vendedor)
    db.session.commit() # confirma el alta
    return vendedor_schema.jsonify(new_vendedor)


@app.route('/vendedores/<idVendedor>' ,methods=['PUT'])
def update_vendedor(idVendedor):
    vendedor=Vendedores.query.get(idVendedor)
 
    vendedor.nombre=request.json['nombre']
    vendedor.apellido=request.json['apellido']
    vendedor.telefono=request.json['telefono']
    vendedor.mail=request.json['mail']
    vendedor.sueldo=request.json['sueldo']
    vendedor.imagen=request.json['imagen']
    vendedor.matricula=request.json['matricula']
    vendedor.profesion=request.json['profesion']
   

    db.session.commit()    # confirma el cambio
    return vendedor_schema.jsonify(vendedor)  

##
##Configuración de los metodos de la tabla Propiedades
##
class PropiedadSchema(ma.Schema):
    class Meta:
        fields=('idPropiedad','direccion','provincia','precio','ambientes','descripcion','imagen','propietario','tel_contacto','mail_contacto')




propiedad_schema=PropiedadSchema()           
propiedad_schema=PropiedadSchema(many=True) 




# crea los endpoint o rutas (json)
@app.route('/propiedades',methods=['GET'])
def get_propiedades():
    all_propiedades=Propiedades.query.all()         # el metodo query.all() lo hereda de db.Model
    result=propiedad_schema.dump(all_propiedades)  # el metodo dump() lo hereda de ma.schema y
                                                 # trae todos los registros de la tabla
    return jsonify(result)                       # retorna un JSON de todos los registros de la tabla




@app.route('/propiedades/<idPropiedad>',methods=['GET'])
def get_propiedad(idPropiedad):
    propiedad=Propiedades.query.get(idPropiedad)
    return propiedad_schema.jsonify(propiedad)  


@app.route('/propiedades/<idPropiedad>',methods=['DELETE'])
def delete_propiedad(idPropiedad):
    propiedad=Propiedades.query.get(idPropiedad)
    db.session.delete(propiedad)
    db.session.commit()                     # confirma el delete
    return propiedad_schema.jsonify(propiedad) # me devuelve un json con el registro eliminado


@app.route('/propiedades', methods=['POST']) # crea ruta o endpoint
def create_propiedad():
    #print(request.json)  # request.json contiene el json que envio el cliente
    direccion=request.json['direccion']
    provincia=request.json['provincia']
    precio=request.json['precio']
    ambientes=request.json['ambientes']
    descripcion=request.json['descripcion']
    imagen=request.json['imagen']
    propietario=request.json['propietario']
    tel_contacto=request.json['tel_contacto']
    mail_contacto=request.json['mail_contacto']

    new_propiedad=Propiedades(direccion,provincia,precio,ambientes,descripcion,imagen,propietario,tel_contacto,mail_contacto)

    db.session.add(new_propiedad)
    db.session.commit() # confirma el alta
    return propiedad_schema.jsonify(new_propiedad)


@app.route('/propiedades/<idPropiedad>' ,methods=['PUT'])
def update_propiedad(idPropiedad):
    propiedad=Propiedades.query.get(idPropiedad)
 
    propiedad.direccion=request.json['direccion']
    propiedad.provincia=request.json['provincia']
    propiedad.precio=request.json['precio']
    propiedad.ambientes=request.json['ambientes']
    propiedad.descripcion=request.json['descripcion']
    propiedad.imagen=request.json['imagen']
    propiedad.propietario=request.json['propietario']
    propiedad.tel_contacto=request.json['tel_contacto']
    propiedad.mail_contacto=request.json['mail_contacto']

    db.session.commit()    # confirma el cambio
    return propiedad_schema.jsonify(propiedad)   



# programa principal *******************************
if __name__=='__main__':  
    app.run(debug=True, port=5000)    # ejecuta el servidor Flask en el puerto 5000