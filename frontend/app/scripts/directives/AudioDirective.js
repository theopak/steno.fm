app.directive('audiothing', function () {
    return {
        scope: {
            timestart: '=',
        },
        link: function (scope, element, attrs) {
            var weirdStart = scope.timestart
            var secsPieces = weirdStart.split(',')[0].split(':');
            var secs = parseInt(secsPieces[0])*60*60 + parseInt(secsPieces[1])*60 + parseInt(secsPieces[2]);
            this.currentTime = secs;
            console.log(this.currentTime);
        }
    };
});
// console.log(scope.tooltip);
//  var $trigger = $(element);
//  var text = scope.tooltip
//  var $tooltip = $("<div id='tip' class='tooltip tip is-inactive-tooltip'>"+text+"</div>");
//  $('body').append($tooltip);
//  console.log(scope);
//  var direction = attrs.direction || 'top',
//      el_height = $trigger.innerHeight(),
//      el_width = $trigger.innerWidth(),
//      tip_height = $tooltip.innerHeight(),
//      tip_width = $tooltip.innerWidth(),
//      buffer = 10,
//      offset = { top: -tip_height - buffer, left: 0};
//  $tooltip.addClass(direction);
//  switch(direction) {
//      case 'bottom':
//          offset.top = el_height + buffer;
//          offset.left = 0;
//          break;
//      case 'left':
//          offset.top = el_height / 2 - tip_height / 2;
//          offset.left = -tip_width - buffer;
//          break;
//      case 'right':
//          offset.top = el_height / 2 - tip_height / 2;
//          offset.left = el_width + buffer;

//  }
//  var position = $trigger.offset();
//  console.log(position);
//  $tooltip.css({top:position.top + offset.top, left: position.left+ offset.left});
//  $trigger.hover(
//      function(e){
//          console.log("called");
//          $tooltip.addClass('is-active-tooltip').removeClass('is-inactive-tooltip');

//      },
//      function(e){
//          $tooltip.removeClass('is-active-tooltip').addClass('is-inactive-tooltip');
//      }
//  );


// var setup = function() {
//     alert("TEST");
//     $('audio').each(function(){
//         var weirdStart = $(this).data('start');
//         var secsPieces = weirdStart.split(',')[0].split(':');
//         var secs = parseInt(secsPieces[0])*60*60 + parseInt(secsPieces[1])*60 + parseInt(secsPieces[2]);
//         this.currentTime = secs;
//         console.log(this.currentTime);
//     })
// }
// var timeout = window.setTimeout(setup, 2000);