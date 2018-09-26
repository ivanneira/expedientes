$(function(){

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

    $('#datatable').DataTable();
});