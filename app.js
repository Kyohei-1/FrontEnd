$(function(){

  $('.js-keyup-valid-email').on('keyup',function (e) {

    // ・Emailの形式になった時にAjax通信をする
    // ・重複がなければsubmitを押せるようにする

    var email = $(this).val();
    // console.log(emailAdress);

    //正規表現（Email形式チェック）
    var reg = /^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/i;

    // Emailの形式かを判定
    if (reg.test(email)) {
      console.log('正しい形式です | Ajax通信を行います');

      // コールバック関数内では、thisはajax関数自体になってしまうため、
      // ajax関数内でイベントのthisを使いたいなら変数に保持しておく
      var $that = $(this);

      //Ajaxを実行する
      $.ajax({
        //Ajaxを用いた処理の中でのthisはAjax自体を指す
        type: "POST",
        url: './ajax.php',
        dataType: "json",
        data: {
          email: email
        }
      }).then(function(data){
          if(data){
          // console.log(data);
          // console.log($(this));

          // フォームにメッセージをセットし、背景色を変更する
          if(data.errorFlg){
            $('.js-set-msg-email').addClass('is-error');
            $('.js-set-msg-email').removeClass('is-success');
            $that.addClass('is-error');
            $that.removeClass('is-success');

            //input[submit]のdisableをつける
            $btn = $('.btn');
            $btn.prop('disabled',true);
          }else{
            $('.js-set-msg-email').addClass('is-success');
            $('.js-set-msg-email').removeClass('is-error');
            $that.addClass('is-success');
            $that.removeClass('is-error');

            //input[submit]のdisableを外す
            $btn = $('.btn');
            $btn.prop('disabled',false);
          }
            $('.js-set-msg-email').text(data.msg);



          }
      });


    } else {
      console.log("間違った形式です");
    }





    // Ajaxを実行する
    // $.ajax({
    //   //Ajaxを用いた処理の中でのthisはAjax自体を指す

    //   type: 'post',
    //   url: 'ajax.php',
    //   dataType: 'json', // 必ず指定すること。指定しないとエラーが出る＆返却値を文字列と認識してしまう
    //   data: {
    //     email: $(this).val()
    //   }
    // }).then(function(data) {
    // // console.log($(this));

    //   // console.log(data);

    //   if(data){
    //     // console.log(data);
    //     // console.log($(this));

    //     // フォームにメッセージをセットし、背景色を変更する
    //     if(data.errorFlg){
    //       $('.js-set-msg-email').addClass('is-error');
    //       $('.js-set-msg-email').removeClass('is-success');
    //       $that.addClass('is-error');
    //       $that.removeClass('is-success');
    //     }else{
    //       $('.js-set-msg-email').addClass('is-success');
    //       $('.js-set-msg-email').removeClass('is-error');
    //       $that.addClass('is-success');
    //       $that.removeClass('is-error');
    //     }
    //     $('.js-set-msg-email').text(data.msg);
    //   }
    // });
  });
});
