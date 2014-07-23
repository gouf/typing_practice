$(document).ready(function(){
  $('#ed').on('change keyup paste', matcher);
  (function(){
    var data = $('#data').html();
    data = generateNumbers(10);
    var d = data.pop();
    $('#data').css({display: 'none'});
    $('#data_store').css({display: 'none'});
    $('#data_store').html(data.join(','));
    $('#data').html(d);
    $('#preview').html(d);
  })();
});

function generateNumbers(n) {
  res = new Array();
  for(var i = n; n > 0; n--){
    res.push(Math.ceil(Math.random() * 9000 + 1234));
  }
  return res;
}

function fetchNext() {
  var data = $('#data_store').html().split(',');
  $('#ed').val('');
  if(data.length > 1){
    var d = data.pop();
    $('#data_store').html(data.join(','));
    $('#data').html(d);
    $('#preview').html(d);
  }else{
    console.log('Finished');
    $('#preview').html('Finished! :D');
    $('#ed').off('change keyup paste', matcher);
  }
}

function matcher() {
  var input = $('#ed').val().split('');
  var data = $('#data').html().split('');
  var res = '';
  for(var d in data) {
    if(input[d] == data[d]) {
      res += '<span class="collect">' + data[d] + '</span>'
    }else {
      if(input[d] == undefined || data[d] == undefined) {
        res += data[d];
      }else{
        res += '<span class="incollect">' + data[d] + '</span>';
      }
    }
  }
  $('#preview').html(res);
  if(input.join() === data.join()){
    res = '<span class="all_collect">' + data.join('') + '</span>'
    $('#preview').html(res);
    setTimeout(function(){fetchNext();}, 80);
  }
}
