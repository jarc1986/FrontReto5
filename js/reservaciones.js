function autoinicioRelacionCliente() {
    console.log("Se esta ejecutando el autoinicio de Client...");
    $.ajax({
        url:"http://144.22.232.91:8080/api/Client/all",
        //url: "http://localhost:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {

            let $select = $("#select-Client");
            $.each(response, function (id, name) {
                $select.append('<option value=' + name.idClient + '>' + name.name + '</option>');
                console.log("select " + name.idClient);
            });

        },
        error: function (jqXHR, textStatus, errorThrown) { }
    });
}


//Manejador "POST"
function guardarInformacionReservation() {
    
    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
        alert("Todos los campos son Obligatorios")
    }else{  
        let elemento = {
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            skate:{id: +$("#select-skate").val()},
            client:{idClient: +$("#select-client").val()},
            
        }

        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url:"http://144.22.232.91:8080/api/Reservation/save",
            //url: "http://localhost:8080/api/Reservation/save",
            data: dataToSend,
            datatype: "json",

            success: function (response) {
                console.log(response);
                //Limpiar Campos
                $("#resultado4").empty();
                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");

                //Listar Tabla

                alert("Se ha guardado Correctamente!")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se guardo Correctamente!")
            }
        });
    }
}

function pintarRespuestaReservation(response){
   
    let myTable="<table>";
    myTable+="<tr>";
        myTable+="<td>Fecha Inicio</td>";
        myTable+="<td>fecha Devolucion</td>";
        myTable+="<td>Estado</td>";
        myTable+="<td>Juego</td>";
        myTable+="<td>Cliente</td>";
     "</tr>";
      
    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>"+response[i].startDate+"</td>";
        myTable+="<td>"+response[i].devolutionDate+"</td>";
        myTable+="<td>"+response[i].status+"</td>";
        myTable+="<td>"+response[i].Game.name+"</td>";
        myTable+="<td>"+response[i].Client.name+"</td>";
        myTable+='<td><button onclick="borrarReservation(' + response[i].idReservation + ')">Borrar Reserva!</button></td>';
        myTable+='<td><button onclick="cargarDatosReservation(' + response[i].idReservation + ')">Editar Reserva!</button></td>';
        myTable+='<td><button onclick="actualizarReservation(' + response[i].idReservation + ')">Actualizar Reserva!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado4").html(myTable);
}


//Manejador DELETE
function borrarReservation(idElemento) {
    let elemento = {
        id: idElemento
    }

    let dataToSend = JSON.stringify(elemento);

    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://144.22.232.91:8080/api/Reservation/"+idElemento,
            //url: "http://localhost:8080/api/Reservation/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#resultado4").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Capturar informacion para Actualizar
function cargarDatosReservation(id) {
    $.ajax({
        dataType: 'json',
        url:"http://144.22.232.91:8080/api/Reservation/"+id,
        //url: "http://localhost:8080/api/Reservation/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#startDate").val(item.startDate);
            $("#devolutionDate").val(item.devolutionDate);
            $("#status").val(item.status);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

//Manejador PUT
function actualizarReservation(idElemento) {
    
    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            skate:{id: +$("#select-skate").val()},
            client:{idClient: +$("#select-client").val()},
        }

        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://144.22.232.91:8080/api/Reservation/update",
            //url: "http://localhost:8080/api/Reservation/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#resultado4").empty();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado4").empty();

                $("#startDate").val("");
                $("#devolutionDate").val("");
                $("#status").val("");

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}

