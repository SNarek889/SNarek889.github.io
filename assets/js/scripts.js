//===================
//  Odometer
//  Here set the numebers
//===================

setTimeout(function(){
  $('.odometer.01').html(2900);
}, 1000);
setTimeout(function(){
  $('.odometer.02').html(170);
}, 1000);


//===================
//  Magnific Popup
//===================

jQuery(document).ready(function() {
  jQuery('.image-gallery').magnificPopup({
    delegate: '.item a', // child items selector, by clicking on it popup will open
    type:'image'
  });

  //===================
  //  WOW
  //  do not touch
  //===================

  new WOW().init();

  //===================
  //  Calculator
  //===================
  $('#calc-btn').click(function() {
    var first = parseFloat($('#calc-first').val());
    var second = parseFloat($('#calc-second').val());
    var operation = $('#calc-operation').val();
    var resultText = '';

    if (isNaN(first) || isNaN(second)) {
      $('#calc-result').text('Խնդրում ենք մուտքագրել երկու թիվ։');
      return;
    }

    if (operation === '+') {
      resultText = first + second;
    } else if (operation === '-') {
      resultText = first - second;
    } else if (operation === '*') {
      resultText = first * second;
    } else if (operation === '/') {
      if (second === 0) {
        $('#calc-result').text('0-ի վրա բաժանումը թույլատրելի չէ։');
        return;
      }
      resultText = first / second;
    }

    var displayResult = Number(resultText).toFixed(2);
    $('#calc-result').text('Արդյունք՝ ' + displayResult);
  });

});



//===================
// Scroller
//  do not touch
//===================

$(function(){

  $('nav.pushy a[href*=#]').click(function() {

  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
      && location.hostname == this.hostname) {

          var $target = $(this.hash);

          $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');

          if ($target.length) {

              var targetOffset = $target.offset().top -0;

              $('html,body').animate({scrollTop: targetOffset}, 800);

              return false;

          }

      }

  });

});
