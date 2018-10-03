var datatable;

$(function(){

    $('#guardar').click(function(){

        verificar();
    });

    $('#nuevo').click(function(){

        $('.inputmodal').empty();
        $('.modal').modal('show');
    });

    $('#salir').click(function(){

        swal({
            title: 'Salir',
            text: "Usted está por salir del sistema",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Salir',
            camcelButtonText: "Cancelar"
          }).then((result) => {
            if (result.value) {
                $.ajax({
                    method: "GET",
                    url: "logout",
                    success: function(data){
                        //console.log(data);
        
                        window.location.href = "/";
                    }
        
                });
            }
          })


    });

    datatable = $('#datatable').DataTable({
        "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
        "processing": true,
        "ajax": "/data",
        "responsive": "single",
        "select": true,
        "lengthMenu": [ 5, 10, 20, 30 ],
        "columns": [
            {"data": "expediente"},
            {"data": "establecimiento"},
            {"data": "nombrefantasia"},
            //{"data": "domicilio"},
            //{"data": "contacto"},
            {"data": "propiedad"},
            {"data": "dirtecnica"},
            {"data": "estado"},
            //{"data": "observaciones"}
        ]
    });

    datatable.on('select', function(e,dt,type,indexes){
        //console.log(e)
        //console.log(dt)
        //console.log(type)
        //console.log(indexes)

        data = datatable.row(indexes).data();

        swal({
            title: 'Datos del expediente <strong>' + data.expediente + '</strong>',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Editar',
            camcelButtonText: "Cancelar",
            html:
                '<div class="text-left p-5">' +
                '   <p><b>Establecimiento:</b> ' + data.establecimiento + '</p>' +
                '   <p><b>Nombre de fantasía:</b> ' + data.nombrefantasia + '</p>' +
                '   <p><b>Domicilio:</b> ' + data.domicilio + '</p>' +
                '   <p><b>Contacto:</b> ' + data.establecimiento + '</p>' +
                '   <p><b>Propiedad:</b> ' + data.propiedad + '</p>' +
                '   <p><b>Dir. Técnica:</b> ' + data.dirtecnica + '</p>' + 
                '   <p><b>Estado:</b> ' + data.estado + '</p>' +
                '   <p><b>Observaciones:</b> ' + data.observaciones + '</p>' +
                '</div>'
        }).then(function(result){

            if(result.value){

                editar(data);
            }
        });
    });

});

function editar(data){

    $('.inputmodal').empty();


    for(var index in data){

        $('#'+index).val(data[index]);
        
    }

    $('.modal').modal('show')
}

function verificar(){
    
    var data2send = {};

    data2send.expediente = $('#expediente').val();
    data2send.establecimiento = $('#establecimiento').val();
    data2send.nombrefantasia = $('#nombrefantasia').val();
    data2send.domicilio = $('#domicilio').val();
    data2send.contacto = $('#contacto').val();
    data2send.propiedad = $('#propiedad').val();
    data2send.dirtecnica = $('#dirtecnica').val();
    data2send.estado = $('#estado').val();
    data2send.observaciones = $('#observaciones').val();

    for(var index in data2send){

        if(!data2send[index]){
            delete data2send[index];
        }
    }

    if($.isEmptyObject(data2send)){
        swal({
            title: 'Error',
            text: "No se ingresó ningún dato",
            type: 'error',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
          });
    }else{

        //console.log('enviando', data2send)

        $.ajax({

            method: 'POST',
            url: 'data',
            data: data2send,
            success: function(d){

                //console.log(d)
                
                if(d == 'exist'){

                    swal({
                        title: 'Error',
                        text: "Ya existe este número de expediente",
                        type: 'error',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Aceptar',
                      });

                }else if(d){

                    swal({
                        title: 'Confirmación',
                        text: "El nuevo expediente ha sido guardado",
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Aceptar',
                      }).then(function(){
                        $(".modal").modal('hide');
                        refreshTable();
                      });



                }else if(d === 'error'){

                    swal({
                        title: 'Error',
                        text: "No se pudo guardar el registro",
                        type: 'error',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Aceptar',
                      });
                }
            }
        });
    }

}

function notEmpty(v){

    if(v){
        return v;
    }
}

function refreshTable(){

    datatable.ajax.reload();
}