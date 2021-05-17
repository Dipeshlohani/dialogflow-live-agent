$(document).on('click', '.qty-plus', function () {
   $(this).prev().val(+$(this).prev().val() + 1);
});
$(document).on('click', '.qty-minus', function () {
   if ($(this).next().val() > 0) $(this).next().val(+$(this).next().val() - 1);
});



(function($) {
    $(document).ready(function(){
        // mobile menu js
        // mobile menu js
        $('#evendi_bar').click(function(){
            $('.menu').animate({
                width:'toggle'
            }, 200)
        })

        // cross bar
        // cross bar
        $('#evendi_bar').on('click', function () {
            $(this).toggleClass('cs_cross_active');
            $(".logo").toggleClass('logo_add_class');
            $(".add_class").toggleClass('add_class_hidden');
            $(".add_class #mtabs").toggleClass('mtabs_relative');
        });

        
        if (screen.width < 991) {
            $('#evendi_bar').on('click', function () {
            $(this).toggleClass('cs_cross_active');
            $(".add_class").toggleClass('add_class_hidden');
            $(".add_class .mtabs_items_area").toggleClass('add_class_hidden');
            $(".add_class #mtabs .all_tabs_items .row").toggleClass('flex-column');
        });
        }


       // tabs
       // tabs
       $( "#mtabs" ).tabs();

   });
})( jQuery );

// cleaning date js
$(function() {
    $('#cs_date').datepicker({
        dateFormat: 'dd-mm-yy',
    });
    $('.date_icon').on('click', function() {
        $('#cs_date').focus();
    })

    // cleaning time
       $('.cs_time').timepicker({
            timeFormat: 'h:mm p',
            interval: 60,
            minTime: '00:00',
            maxTime: '23:00',
            dynamic: false,
            dropdown: true,
            scrollbar: false
        });
});
// quantity counter
// quantity counter
var counterValue = document.querySelector(".s_value");
var counterIncrement = document.querySelector(".s_pluse");
var counterDecrement = document.querySelector(".s_minus");
var count = 0;

this.counterIncrement.addEventListener('click', () => {
    this.count++
    this.counterValue.setAttribute("value", count);
});

this.counterDecrement.addEventListener('click', () => {
    this.count--
    this.counterValue.setAttribute("value", count);
});










