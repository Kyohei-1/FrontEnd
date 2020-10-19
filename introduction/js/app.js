$(function() {
  //footerを最下部に固定
  var $ftr = $('.footer'); //footerのDOMを取得
  if(window.innerHeight > $ftr.offset().top + $ftr.outerHeight()){
    $ftr.attr({'style': 'position: fixed; top:'+(window.innerHeight - $ftr.outerHeight()) + 'px;'});
  }
});
