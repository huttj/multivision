angular.module('app').value('myToastr', toastr);

angular.module('app').factory('mvNotifier', function(myToastr) {
    myToastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "showDuration": "200",
        "hideDuration": "300",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "swing",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    return {
        success: function(msg) {
            myToastr.success(msg);
            console.log(msg);
        },
        warn: function(msg) {
            myToastr.warning(msg);
            console.warn(msg);
        },
        error: function(msg) {
            myToastr.error(msg);
            console.error(msg);
        }
    }
});