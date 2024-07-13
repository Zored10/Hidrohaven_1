import Principal "mo:base/Principal";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

// Actor
actor edificioAgua {
    // Tipos de datos
    //Usuario
    type Usuario = Principal;

    // Funciones

    // Ingreso de departamento
    //Datos de ingreso
    type DatosDepartamento = {
        propietario : Text;
        consumoAguaPotable : Text;
        consumoAguaGris : Text;
        consumoAguaNegra : Text;
        estadoAgua : Text; //Agregar categorías
        registroMantenimiento : Text;
    };

    // Identificador de departamento
    type IdDepartamento = Text;

    // Hashmap de departamento
    type Departamento = HashMap.HashMap<Text, DatosDepartamento>;

    // Inicializar el arreglo
    var departamentos = HashMap.HashMap<Usuario, Departamento>(0, Principal.equal, Principal.hash);
    // Funciones
    // Función para obtener el usuario que realiza la llamada
    public query ({ caller }) func whoami() : async Principal {
        return caller;
    };

    // Funcion para agregar
    public shared (msg) func saveDepartamento(datosDepartamento : DatosDepartamento, idDepartamento : IdDepartamento) : async DatosDepartamento {
        let usuario : Principal = msg.caller;
        let id : Text = idDepartamento;
        let resultDepartamento = departamentos.get(usuario);

        var finalDepartamento : Departamento = switch resultDepartamento {
            case (null) {
                HashMap.HashMap(0, Text.equal, Text.hash);
            };
            case (?resultDepartamento) resultDepartamento;
        };

        finalDepartamento.put(id, datosDepartamento);
        departamentos.put(usuario, finalDepartamento);
        Debug.print("Tu departamento <<" # id # ">> fue agregado correctamente, <<" # Principal.toText(usuario) # ">> gracias! :)");
        return datosDepartamento;
    };

    // Funcion para consultar especificacmente
    public query (msg) func consultDepartamento(idDepartamento : IdDepartamento) : async ?DatosDepartamento {
        let usuario : Principal = msg.caller;
        let resultDepartamento = departamentos.get(usuario);

        switch resultDepartamento {
            case (?departamento) {
                Debug.print("Correcto");
                return departamento.get(idDepartamento);
            };
            case (null) {
                Debug.print("Usuario no encontrado en el HashMap.");
                return null;
            };
        };
    };

    // Funcion para consultar todos los departamentos
    public query (msg) func consultDepartamentos() : async [(Text, DatosDepartamento)] {
        let usuario : Principal = msg.caller;
        let result = departamentos.get(usuario);

        var resultsDepartamentos : Departamento = switch result {
            case (null) {
                HashMap.HashMap<Text, DatosDepartamento>(0, Text.equal, Text.hash);
            };
            case (?result) result;
        };

        // Convertir las entradas del mapa en una secuencia
        let departamentosEntries = Iter.toArray<(Text, DatosDepartamento)>(resultsDepartamentos.entries());

        return departamentosEntries;
    };

    // Función para actualizar datos específicos en DatosDepartamento en el HashMap
    public shared (msg) func updateDatosDepartamento(idDepartamento : IdDepartamento, datosDepartamento : DatosDepartamento) : async Text {
        // Recuperar el HashMap asociado al usuario
        let usuario : Principal = msg.caller;
        let resultDepartamento = departamentos.get(usuario);

        switch resultDepartamento {
            case (null) {
                Debug.print("Usuario no encontrado en el HashMap.");
                return "El usuario no existe"; // Indicador de usuario no encontrado
            };
            case (?currentDepartamento) {
                // Verificar si el idDepartamento existe en el HashMap actual
                let currentDatosDepartamento = currentDepartamento.get(idDepartamento);
                switch currentDatosDepartamento {
                    case (null) {
                        Debug.print("ID de departamento no encontrado para este usuario.");
                        return "El ID de departamento no existe"; // Indicador de ID de departamento no encontrado
                    };
                    case (?existingDatosDepartamento) {
                        // Actualizar solo los datos especificados
                        let updatedDatosDepartamento = {
                            propietario = existingDatosDepartamento.propietario;
                            consumoAguaPotable = datosDepartamento.consumoAguaPotable;
                            consumoAguaGris = datosDepartamento.consumoAguaGris;
                            consumoAguaNegra = datosDepartamento.consumoAguaNegra;
                            estadoAgua = datosDepartamento.estadoAgua;
                            registroMantenimiento = datosDepartamento.registroMantenimiento;
                        };

                        // Actualizar los datos del idDepartamento con los nuevos datos proporcionados
                        currentDepartamento.put(idDepartamento, updatedDatosDepartamento);
                        departamentos.put(usuario, currentDepartamento);
                        Debug.print("Datos principales del departamento actualizados correctamente para el usuario.");
                        return "Datos principales actualizados correctamente";
                    };
                };
            };
        };
    };

    // Función eliminar departamento
    public shared (msg) func deleteDepartamento(idDepartamento: IdDepartamento) : async Text {
        // Recuperar el HashMap asociado al usuario
        let usuario : Principal = msg.caller;
        let resultadoDepartamento = departamentos.get(usuario);

        switch resultadoDepartamento {
            case (null) {
                Debug.print("Usuario no encontrado en el HashMap.");
                return "El usuario no existe"; // Indicador de usuario no encontrado
            };
            case (?departamentoActual) {
                // Verificar si el idDepartamento existe en el HashMap actual
                let datosDepartamentoActual = departamentoActual.get(idDepartamento);
                switch datosDepartamentoActual {
                    case (null) {
                        Debug.print("ID de departamento no encontrado para este usuario.");
                        return "El ID de departamento no existe"; // Indicador de ID de departamento no encontrado
                    };
                    case (?datosDepartamento) {
                        // Eliminar el idDepartamento del HashMap
                        departamentoActual.delete(idDepartamento);
                        departamentos.put(usuario, departamentoActual);
                        Debug.print("ID de departamento eliminado correctamente para el usuario.");
                        return "ID de departamento eliminado correctamente";
                    };
                };
            };
        };
    };

};
