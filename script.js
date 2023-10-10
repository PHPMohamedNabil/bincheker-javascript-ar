$(function($){
  
     $('[data-numeric]').payment('restrictNumeric');
      $('.cc-number').payment('formatCardNumber');

      $.fn.toggleInputError = function(erred) {
        this.parent('#BinForm').toggleClass('has-error', erred);
        return this;
      };


$('#BinForm').on('submit',function(e){
	e.preventDefault();
      

    let bin_code = $('#BinNumber').val().split(' ').join('');
         
         //alert(bin_code);
         //return false;
    if(bin_code =='')
    {   
    	$('#BinNumber').css('borderColor','red');
    	$('#results').html('');
    	 return false;
    }
    $('#results').html('');
    $('#load').css('display','block');
 
 try{

const data = JSON.stringify({
	bin: bin_code
});


const xhr = new XMLHttpRequest();
xhr.withCredentials = false;
xhr.onloadend = function() {
    if(xhr.status == 404) 
    	$('#results').html(`<h1 class="text-center-important text-primary">لا يوجد بيانات للمعرف البنكى ${bin_code}</h1>`);
		 	 return false;
        throw new Error(' replied 404');
}
xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		 $('#BinNumber').val(' ');
		let data = JSON.parse(this.responseText);
         $('#load').css('display','none');
	     $('#BinNumber').css('borderColor','initial');
		 
		 if(data.code != 200)
		 {
          $('#results').html(`<h1 class="text-center-important text-warning">حدث خطأ بالرجاء المحاوله مره أخرى</h1>`);
		 	 return false;
		 }

		 if(data.BIN.valid)
		 {
		 		$('#results').html(`
			<div class="table-responsive mt-3">
				<table class="table table-striped table-bordered">
                    <tbody>
                      <tr>
                        <td>أول ستة أرقام من البطاقة</td>
                        <td>${data.BIN.number}</td>
                      </tr>
                       <tr>
                        <td>شبكة الكروت</td>
                        <td>${data.BIN.brand}</td>
                       </tr>
                       <tr>
                        <td style="font-weight:bold;">نوع البطاقة</td>
                        <td style="font-weight:bold;">${data.BIN.type}</td>
                       </tr>
                       <tr>
                        <td style="font-weight:bold;">أسم البنك المصدر للبطاقة</td>
                        <td style="font-weight:bold;">${data.BIN.issuer.name}</td>
                      </tr>
                       <tr>
                        <td style="font-weight:bold;">فئات البطاقة </td>
                        <td style="font-weight:bold;">${data.BIN.level}</td>
                      </tr>
                       <tr>
                        <td>الموقع الألكترونى للبنك</td>
                        <td>${data.BIN.issuer.website}</td>
                         </tr>
                       <tr>
                        <td>الدولة التابعة للبنك</td>
                        <td>${data.BIN.country.name}</td>
                       </tr>
                       <tr>
                        <td>عملة دولة البنك</td>
                        <td>${data.BIN.country.currency_symbol}</td>

                      </tr>
                    </tbody>
                </table>
			</div>`);
		 }
		 else
		 {
		 		$('#results').html(`<h1 class="text-center-important text-warning">${bin_code} عذرا رقم المعرف البنكى غير صحيح الرجاء التأكد من الرقم</h1>`);
		 }
		console.log(JSON.parse(this.responseText));
	}
});

xhr.open('POST', 'https://bin-ip-checker.p.rapidapi.com/?bin='+bin_code);
xhr.setRequestHeader('content-type', 'application/json');
xhr.setRequestHeader('Access-Control-Allow-Origin', 'https://rapidapi.com/');
xhr.setRequestHeader('X-RapidAPI-Key', '01b182a45emsh6d6bd856272b8ccp13077fjsn1f117d3f9089');
xhr.setRequestHeader('X-RapidAPI-Host', 'bin-ip-checker.p.rapidapi.com');
xhr.setRequestHeader('content-type', 'application/json');
xhr.send(data);
 }catch(err) {
     $('#BinNumber').css('borderColor','red');
     $('#results').html('');
     $('#results').html(`<h1 class="text-center-important text-warning">حدث خطأ بالرجاء المحاوله مره أخرى</h1>`);

    	 return false;
}

});

});