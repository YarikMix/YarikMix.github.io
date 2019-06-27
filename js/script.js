$( document ).ready(function() {
$(".ripple").on("click",function(event){
	$(this).append("<span class='ripple-effect'>");
	$(this).find(".ripple-effect").css({
	   left:event.pageX-$(this).position().left,
	    top:event.pageY-$(this).position().top
	  }).animate({
	    opacity: 0,
	  }, 1500, function() {
	   $(this).remove();
	  });
});

var numberSystem1,numberSystem2,numberSystem3,num1,num2,num3,transform,lastNumberSystem;

function toRoman(num) {  
	var result = '';
	if(num == 0){
		return "0"
	}
	var decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
	var roman = ["M", "CM","D","CD","C", "XC", "L", "XL", "X","IX","V","IV","I"];
		for (var i = 0;i<=decimal.length;i++) {
			while (num%decimal[i] < num) {     
			result += roman[i];
			num -= decimal[i];
			}
		}
	return result;
}

function fromRoman(str) {  
	var result = 0;
	// the result is now a number, not a string
	var decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
	var roman = ["M", "CM","D","CD","C", "XC", "L", "XL", "X","IX","V","IV","I"];
	for (var i = 0;i<=decimal.length;i++) {
		while (str.indexOf(roman[i]) === 0){
	  		result += decimal[i];
	  		str = str.replace(roman[i],'');
		}
	}
	return result;
}

$("#resultCC").on("change",function(){
	numberSystem1 = +$("#choose1 option:selected").attr("class");
	numberSystem3 = +$("#resultCC option:selected").attr("class");
	transform = $(".change option:selected").attr("class");
	if(transform == "change" && $("#num1").val() != ""){
		if($("#num2").val() == ""){
	
			//Перевод из не римской в римскую

			if(lastNumberSystem != "rim" && $("#resultCC option:selected").attr("class") == "rim"){

				if(lastNumberSystem == 16){
					num1 = parseInt(($(".result").html()), 16);
					$(".result").html(toRoman(num1));
					lastNumberSystem = $("#resultCC option:selected").attr("class");
					return;
					$("#resultCC option[class='rim']").prop("selected", true);
				}

				if(lastNumberSystem == 10){
					num1 = toRoman(($(".result").html()));
					$(".result").html(num1);
					lastNumberSystem = $("#resultCC option:selected").attr("class");
					return;
				}

				else if(lastNumberSystem != 10){
					num1 = parseInt((+$(".result").html()), numberSystem1);
					$(".result").html(toRoman(num1));
					$("#resultCC option[class='rim']").prop("selected", true);
					lastNumberSystem = $("#resultCC option:selected").attr("class");
					return;
				} 

			}

			//Перевод из римской в не римскую

			else if(lastNumberSystem == "rim" && $("#resultCC option:selected").attr("class") != "rim"){

				if($("#resultCC option:selected").attr("class") == 10){
					num1 = fromRoman($(".result").html())
					$(".result").html(num1);
					$("#resultCC option[class='10']").prop("selected", true);
					lastNumberSystem = 10;
					return;	
				}

				else if($("#resultCC option:selected").attr("class") != 10){
					num1 = fromRoman($(".result").html())
					$(".result").html(num1.toString(numberSystem3));
					$("#resultCC option[class='" + numberSystem3 + "']").prop("selected", true);
					lastNumberSystem = numberSystem3;
					return;	
				} 

			}

			//Перевод из из не римских систем счисления

			else if(lastNumberSystem != "rim" && $("#resultCC option:selected").attr("class") != "rim"){

				if(lastNumberSystem == 10 && numberSystem3 != 10){
					num1 = (+$(".result").html()).toString(numberSystem3);
					$(".result").html(num1);
					lastNumberSystem = numberSystem3;
					return;
				}
				if(lastNumberSystem != 10 && numberSystem3 == 10){
					num1 = parseInt($(".result").html(), lastNumberSystem);
					$(".result").html(num1);
					lastNumberSystem = numberSystem3;
					return;
				}
				if(lastNumberSystem != 10 && numberSystem3 != 10 && lastNumberSystem != numberSystem3){
					num1 = parseInt($(".result").html(), lastNumberSystem);
					num2 = num1.toString(numberSystem3);
					$(".result").html(num2);
					lastNumberSystem = numberSystem3;
					return;
				}

			}	
		} else {
			$(".result").html("2 поле должно быть пустым");
		}
	} else if(transform == "sum" || transform == "subtract" || transform == "multiply" || transform == "split"){
		
		//Перевод из не римской в римскую

		if(lastNumberSystem != "rim" && $("#resultCC option:selected").attr("class") == "rim"){

			if(lastNumberSystem == 16){
				num1 = parseInt(($(".result").html()), 16);
				$(".result").html(toRoman(num1));
				lastNumberSystem = $("#resultCC option:selected").attr("class");
				return;
				$("#resultCC option[class='rim']").prop("selected", true);
			}

			if(lastNumberSystem == 10){
				num1 = toRoman(($(".result").html()));
				$(".result").html(num1);
				lastNumberSystem = $("#resultCC option:selected").attr("class");
				return;
			}

			else if(lastNumberSystem != 10){
				num1 = parseInt((+$(".result").html()), numberSystem1);
				$(".result").html(toRoman(num1));
				$("#resultCC option[class='rim']").prop("selected", true);
				lastNumberSystem = $("#resultCC option:selected").attr("class");
				return;
			} 

		}

		//Перевод из римской в не римскую

		else if(lastNumberSystem == "rim" && $("#resultCC option:selected").attr("class") != "rim"){

				if($("#resultCC option:selected").attr("class") == 10){
				num1 = fromRoman($(".result").html())
				$(".result").html(num1);
				$("#resultCC option[class='10']").prop("selected", true);
				lastNumberSystem = 10;
				return;	
			}

			else if($("#resultCC option:selected").attr("class") != 10){
				num1 = fromRoman($(".result").html())
				$(".result").html(num1.toString(numberSystem3));
				$("#resultCC option[class='" + numberSystem3 + "']").prop("selected", true);
				lastNumberSystem = numberSystem3;
				return;	
			} 

		}

		//Перевод из из не римских систем счисления

		else if(lastNumberSystem != "rim" && $("#resultCC option:selected").attr("class") != "rim"){

			if(lastNumberSystem == 10 && numberSystem3 != 10){
				num1 = (+$(".result").html()).toString(numberSystem3);
				$(".result").html(num1);
				lastNumberSystem = numberSystem3;
				return;
			}
			if(lastNumberSystem != 10 && numberSystem3 == 10){
				num1 = parseInt($(".result").html(), lastNumberSystem);
				$(".result").html(num1);
				lastNumberSystem = numberSystem3;
				return;
			}
			if(lastNumberSystem != 10 && numberSystem3 != 10 && lastNumberSystem != numberSystem3){
				num1 = parseInt($(".result").html(), lastNumberSystem);
				num2 = num1.toString(numberSystem3);
				$(".result").html(num2);
				lastNumberSystem = numberSystem3;
				return;
			}

		}

	}
});

function cheak(str){
	if(/0x/.test(str)){
		if(str.match(/0x/g).length > 1 || str.search(/0x/) != 0 || str == "0x"){
			return false;
		}
		if(/[^A-F0-9]/i.test(str.slice(2))){
			return false;
		}
	} else{
		if(/[^A-F0-9]/i.test(str)){
			return false;
		}
	}
	
	return true;
}

function isNumeric(n) {
	if(!n.indexOf("0x")) return false;
  	return !isNaN(parseFloat(n)) && isFinite(n);
}

$(".btn").on("click",function(){
	numberSystem1 = +$("#choose1 option:selected").attr("class");
	numberSystem2 = +$("#choose2 option:selected").attr("class");
	transform = $(".change option:selected").attr("class");

	if(transform == "change"){

		if($("#num2").val() == ""){

			// Перевод из не римской в римскую

			if(($("#choose1 option:selected").attr("class") != "rim") && ($("#choose2 option:selected").attr("class") == "rim")){

				if(numberSystem1 == 16){
					if(cheak($("#num1").val()) == true){
						num1 = parseInt($("#num1").val(), 16);
						$(".result").html(toRoman(num1));
						$("#resultCC option[class='rim']").prop("selected", true);
						lastNumberSystem = "rim";
						return;		
					} else{
						$(".result").html("Введите число в 16 CC!");
						return;
					}
				}

				else if(numberSystem1 == 10 && isNumeric($("#num1").val()) == true){
					num1 = parseInt($("#num1").val());
					$(".result").html(toRoman(num1));
					$("#resultCC option[class='rim']").prop("selected", true);
					lastNumberSystem = "rim";
					return;
				}

				else if(numberSystem1 != 10 && isNumeric($("#num1").val()) == true){
					num1 = parseInt($("#num1").val(), numberSystem1);
					$(".result").html(toRoman(num1));
					$("#resultCC option[class='rim']").prop("selected", true);
					lastNumberSystem = "rim";
					return;
				} else {
					$(".result").html("Введите корректные числа!");
				}
			} 


			//Перевод из римской в не римскую

			if(($("#choose1 option:selected").attr("class") == "rim") && ($("#choose2 option:selected").attr("class") != "rim")){

				if(numberSystem2 == 16){
					num1 = fromRoman($("#num1").val())
					$(".result").html(num1.toString(numberSystem2));
					$("#resultCC option[class='16']").prop("selected", true);
					lastNumberSystem = 16;
					return;	
				}

				else if(numberSystem2 == 10){
					num1 = fromRoman($("#num1").val())
					$(".result").html(num1);
					$("#resultCC option[class='10']").prop("selected", true);
					lastNumberSystem = 10;
					return;	
				}

				else if(numberSystem2 != 10){
					num1 = fromRoman($("#num1").val())
					$(".result").html(num1.toString(numberSystem2));
					$("#resultCC option[class='" + numberSystem2 + "']").prop("selected", true);
					lastNumberSystem = numberSystem2;
					return;	
				} 
			} 	

			//Перевод из римской в римскую

			if(($("#choose1 option:selected").attr("class") == "rim") && ($("#choose2 option:selected").attr("class") == "rim")){
				$(".result").html($("#num1").val());
				$("#resultCC option[class='rim']").prop("selected", true);
				lastNumberSystem = "rim";
			}
	
			//Перевод не римских систем счисления
		
			if(($("#choose1 option:selected").attr("class") != "rim") && ($("#choose2 option:selected").attr("class") != "rim")){
				if(numberSystem1 == 16){
					if(cheak($("#num1").val()) == true){
						if(numberSystem2 == 10){
							num1 = parseInt($("#num1").val(), numberSystem1);
							$(".result").html(num1);
							$("#resultCC option[class='10']").prop("selected", true);
							lastNumberSystem = 10;
							return;	
						}
						if(numberSystem2 == 16){
							$(".result").html($("#num1").val());
							$("#resultCC option[class='" + numberSystem2 + "']").prop("selected", true);
							lastNumberSystem = numberSystem2;
							return;
						}
						if(numberSystem2 != 16 && numberSystem2 != 10){
							num1 = parseInt($("#num1").val(), numberSystem1);
							$(".result").html(num1.toString(numberSystem2));
							$("#resultCC option[class='" + numberSystem2 + "']").prop("selected", true);
							lastNumberSystem = numberSystem2;
							return;
						}
					} else{
						$(".result").html("Введите корректные числа!");
						return;
					}
				}
				if(numberSystem1 != 16 && isNumeric($("#num1").val()) == true){
					if(numberSystem1 == 10 && numberSystem2 != 10){
						num1 = +((+$("#num1").val()).toString(numberSystem2));
						$(".result").html(num1);
						$("#resultCC option[class='" + numberSystem2 + "']").prop("selected", true);
						lastNumberSystem = numberSystem2;
					}
					if(numberSystem1 != 10 && numberSystem2 == 10){
						num1 = parseInt($("#num1").val(), numberSystem1);
						$(".result").html(num1);
						$("#resultCC option[class='10']").prop("selected", true);
						lastNumberSystem = 10;
					}
					if(numberSystem1 == numberSystem2){
						$(".result").html($("#num1").val());
						$("#resultCC option[class='" + numberSystem2 + "']").prop("selected", true);
						lastNumberSystem = numberSystem2;
					}
					if(numberSystem1 != 10 && numberSystem2 != 10){
						num1 = parseInt($("#num1").val(), numberSystem1);
						$(".result").html(num1.toString(numberSystem2));
						$("#resultCC option[class='" + numberSystem2 + "']").prop("selected", true);
						lastNumberSystem = numberSystem2;
					}
				} else {
					$(".result").html("Введите корректные числа!");
				}
			}
		} else{
			$(".result").html("Второе поле должно быть пустым!");
		}
	}

	else if(transform == "sum"){

		// Сумма не римской с римской

		if(($("#choose1 option:selected").attr("class") != "rim") && ($("#choose2 option:selected").attr("class") == "rim")){
				
			if(numberSystem1 == 16 && cheak($("#num1").val()) == true){
				num1 = parseInt($("#num1").val(), 16);
				num2 = fromRoman($("#num2").val());
				num3 = num1 + num2;
				$(".result").html(num3.toString(16));
				$("#resultCC option[class='16']").prop("selected", true);
				lastNumberSystem = 16;
			} 
			
			else if(numberSystem1 == 10 && (isNumeric($("#num1").val()) == true)){
				num1 = parseInt($("#num1").val());
				num2 = fromRoman($("#num2").val());
				num3 = num1 + num2;
				$(".result").html(num3);
				$("#resultCC option[class='10']").prop("selected", true);
				lastNumberSystem = 10;
			} 

			else if(numberSystem1 != 16 && (isNumeric($("#num1").val()) == true)){
				num1 = parseInt($("#num1").val(),numberSystem1);
				num2 = fromRoman($("#num2").val());
				num3 = num1 + num2;
				$(".result").html(num3.toString(numberSystem1));
				$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
				lastNumberSystem = numberSystem1;		
			} else{
				$(".result").html("Введите корректные числа!");
			}

		}

		// Сумма римской с не римской

		else if(($("#choose1 option:selected").attr("class") == "rim") && ($("#choose2 option:selected").attr("class") != "rim")){

			if(numberSystem2 == 16 && (cheak($("#num2").val()) == true)){	
				num1 = fromRoman($("#num1").val());
				num2 = parseInt($("#num2").val(), 16);
				num3 = num1 + num2;
				$(".result").html(toRoman(num3));
				$("#resultCC option[class='rim']").prop("selected", true);
				lastNumberSystem = "rim";
			} 

			else if(numberSystem2 == 10 && (isNumeric($("#num2").val()) == true)){
				num1 = fromRoman($("#num1").val());
				num2 = parseInt($("#num2").val());
				num3 = num1 + num2;
				$(".result").html(toRoman(num3));
				$("#resultCC option[class='rim']").prop("selected", true);
				lastNumberSystem = "rim";
			} 

			else if(numberSystem2 != 16 && (isNumeric($("#num2").val()) == true)){
				num1 = fromRoman($("#num1").val());
				num2 = parseInt($("#num2").val(),numberSystem2);
				num3 = num1 + num2;
				$(".result").html(toRoman(num3));
				$("#resultCC option[class='rim']").prop("selected", true);
				lastNumberSystem = "rim";		
			} else {
				$(".result").html("Введите корректные числа!");
			}

		}

		//Сумма римской с римской

		else if(($("#choose1 option:selected").attr("class") == "rim") && ($("#choose2 option:selected").attr("class") == "rim")){
			num1 = fromRoman($("#num1").val());
			num2 = fromRoman($("#num2").val());
			num3 = num1 + num2;
			$(".result").html(toRoman(num3));
			$("#resultCC option[class='rim']").prop("selected", true);
			lastNumberSystem = "rim";
		} else{
			$(".result").html("Введите корректные числа!");
		}

		//Сумма не римских систем счисления

		if(($("#choose1 option:selected").attr("class") != "rim") && ($("#choose2 option:selected").attr("class") != "rim")){
			if(numberSystem1 == 16 && numberSystem2 == 16){
				if((cheak($("#num1").val()) == true && cheak($("#num2").val()) == true)){
					num1 = parseInt($("#num1").val(), 16);
					num2 = parseInt($("#num2").val(), 16);
					num3 = num1 + num2;
					$(".result").html(num3.toString(16));
					$("#resultCC option[class='16']").prop("selected", true);
					lastNumberSystem = 16;
				} else{
					$(".result").html("Введите корректные числа!");
				}
			}
			if(numberSystem1 == 16 && numberSystem2 != 16){
				if((cheak($("#num1").val()) == true && isNumeric($("#num2").val()) == true)){
					if(numberSystem2 == 10){
						num1 = parseInt($("#num1").val(),16);
						num2 = num1 + +$("#num2").val();
						$(".result").html(num2.toString(16));
						$("#resultCC option[class='" + 16 + "']").prop("selected", true);
						lastNumberSystem = 16;
					}
					if(numberSystem2 != 10){
						num1 = parseInt($("#num1").val(), 16);
						num2 = parseInt($("#num2").val(), numberSystem2);
						num3 = num1 + num2;
						$(".result").html(num3.toString(16));
						$("#resultCC option[class='16']").prop("selected", true);
						lastNumberSystem = 16;
					}
				} else {
					$(".result").html("Введите корректные числа!");
				}
			} 
			if(numberSystem1 != 16 && numberSystem2 == 16){
				if((isNumeric($("#num1").val()) == true && cheak($("#num2").val()) == true)){
					if(numberSystem1 == 10){
						num2 = parseInt($("#num2").val(),16);
						num3 = +$("#num1").val() + num2;
						$(".result").html(num3);
						$("#resultCC option[class='10']").prop("selected", true);
						lastNumberSystem = 10;
					}
					if(numberSystem1 != 10){
						num1 = parseInt($("#num1").val(), numberSystem1);
						num2 = parseInt($("#num2").val(), numberSystem2);
						num3 = num1 + num2;
						$(".result").html(num3.toString(numberSystem1));
						$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
						lastNumberSystem = numberSystem1;
					}
				} else {
					$(".result").html("Введите корректные числа!");
				}
			}
			if(numberSystem1 != 16 && numberSystem2 != 16){
				if(isNumeric($("#num1").val()) == true && isNumeric($("#num2").val()) == true){
					if(numberSystem1 == numberSystem2){
						if(numberSystem1 == 10){
							num1 = +$("#num1").val() + +$("#num2").val();
							$(".result").html(num1);
							$("#resultCC option[class='10']").prop("selected", true);
							lastNumberSystem = 10;
						}
						if(numberSystem1 != 10){
							num1 = parseInt($("#num1").val(),numberSystem1);
							num2 = parseInt($("#num2").val(),numberSystem2);
							num3 = num1 + num2;
							$(".result").html(num3.toString(numberSystem1));
							$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
							lastNumberSystem = numberSystem1;
						}	
					}
					if(numberSystem1 == 10 && numberSystem2 != 10){
						num1 = +$("#num1").val();
						num2 = parseInt($("#num2").val(),numberSystem2);
						num3 = num1 + num2;
						$(".result").html(num3);
						$("#resultCC option[class='10']").prop("selected", true);
						lastNumberSystem = 10;
					}
					if(numberSystem1 != 10 && numberSystem2 == 10){
						num1 = parseInt($("#num1").val(),numberSystem1);
						num2 = num1 + +$("#num2").val();
						$(".result").html(num2.toString(numberSystem1));
						$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
						lastNumberSystem = numberSystem1;
					}
					if(numberSystem1 != 10 && numberSystem2 != 10 && numberSystem1 != numberSystem2){
						num1 = parseInt($("#num1").val(), numberSystem1);
						num2 = parseInt($("#num2").val(), numberSystem2);
						num3 = num1 + num2;
						$(".result").html(num3.toString(numberSystem1));
						$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
						lastNumberSystem = numberSystem1;
					}	
				} else{
					$(".result").html("Введите корректные числа!");
				}
			}
		}
	}

	//Разность 

	else if(transform == "subtract"){

		//Разность не римской и римской

		if(($("#choose1 option:selected").attr("class") != "rim") && ($("#choose2 option:selected").attr("class") == "rim")){
			if(numberSystem1 == 16 && cheak($("#num1").val()) == true){
				num1 = parseInt($("#num1").val(), 16);
				num2 = fromRoman($("#num2").val());
				if(num1 < num2){
					$(".result").html("Получилось отрицательное число");
					$("#resultCC option[class='16']").prop("selected", true);
					lastNumberSystem = 16;
				} else if(num1 > num2){
					num3 = num1 - num2;
					$(".result").html(num3.toString(16));
					$("#resultCC option[class='16']").prop("selected", true);
					lastNumberSystem = 16;
				} else{
					$(".result").html("0");
					$("#resultCC option[class='16']").prop("selected", true);
					lastNumberSystem = 16;
				}		
			} 
			
			else if(numberSystem1 == 10 && (isNumeric($("#num1").val()) == true)){
				num1 = parseInt($("#num1").val());
				num2 = fromRoman($("#num2").val());
				if(num1 < num2){
					$(".result").html("Получилось отрицательное число");
					$("#resultCC option[class='10']").prop("selected", true);
					lastNumberSystem = 10;
				} else if(num1 > num2){
					num3 = num1 - num2;
					$(".result").html(num3);
					$("#resultCC option[class='10']").prop("selected", true);
					lastNumberSystem = 10;
				} else{
					$(".result").html("0");
					$("#resultCC option[class='10']").prop("selected", true);
					lastNumberSystem = 10;
				}
					
			} 

			else if(numberSystem1 != 16 && (isNumeric($("#num1").val()) == true)){
				num1 = parseInt($("#num1").val(),numberSystem1);
				num2 = fromRoman($("#num2").val());
				if(num1 < num2){
					$(".result").html("Получилось отрицательное число");
					$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
					lastNumberSystem = numberSystem1;
				} else if(num1 > num2){
					num3 = num1 - num2;
					$(".result").html(num3.toString(numberSystem1));
					$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
					lastNumberSystem = numberSystem1;
				} else{
					$(".result").html("0");
					$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
					lastNumberSystem = numberSystem1;
				}				
			} else{
				$(".result").html("Введите корректные числа!");
			}
		}

		//Разность римской и не римской систем счисления

		else if(($("#choose1 option:selected").attr("class") == "rim") && ($("#choose2 option:selected").attr("class") != "rim")){
			if(numberSystem2 == 16 && (cheak($("#num2").val()) == true)){	
				num1 = fromRoman($("#num1").val());
				num2 = parseInt($("#num2").val(), 16);
				if(num1 < num2){
					$(".result").html("Получилось отрицательное число");
					$("#resultCC option[class='rim']").prop("selected", true);
					lastNumberSystem = "rim";
				} else if(num1 > num2){
					num3 = num1 - num2;
					$(".result").html(toRoman(num3));
					$("#resultCC option[class='rim']").prop("selected", true);
					lastNumberSystem = "rim";
				} else{
					$(".result").html("0");
					$("#resultCC option[class='rim']").prop("selected", true);
					lastNumberSystem = "rim";
				}		
			} 

			else if(numberSystem2 == 10 && (isNumeric($("#num2").val()) == true)){
					num1 = fromRoman($("#num1").val());
					num2 = parseInt($("#num2").val());
					if(num1 < num2){
						$(".result").html("Получилось отрицательное число");
						$("#resultCC option[class='rim']").prop("selected", true);
						lastNumberSystem = "rim";
					} else if(num1 > num2){
						num3 = num1 - num2;
						$(".result").html(toRoman(num3));
						$("#resultCC option[class='rim']").prop("selected", true);
						lastNumberSystem = "rim";
					} else{
						$(".result").html("0");
						$("#resultCC option[class='rim']").prop("selected", true);
						lastNumberSystem = "rim";
					}
					
			} 

			else if(numberSystem2 != 16 && (isNumeric($("#num2").val()) == true)){
					num1 = fromRoman($("#num1").val());
					num2 = parseInt($("#num2").val(),numberSystem2);
					if(num1 < num2){
						$(".result").html("Получилось отрицательное число");
						$("#resultCC option[class='rim']").prop("selected", true);
						lastNumberSystem = "rim";
					} else if(num1 > num2){
						num3 = num1 - num2;
						$(".result").html(toRoman(num3));
						$("#resultCC option[class='rim']").prop("selected", true);
						lastNumberSystem = "rim";	
					} else{
						$(".result").html(toRoman("0"));
						$("#resultCC option[class='rim']").prop("selected", true);
						lastNumberSystem = "rim";
					}
						
			} else {
				$(".result").html("Введите корректные числа!");
			}
		}

		//Разность римских систем счисления

		else if(($("#choose1 option:selected").attr("class") == "rim") && ($("#choose2 option:selected").attr("class") == "rim")){
			num1 = fromRoman($("#num1").val());
			num2 = fromRoman($("#num2").val());
			if(num1 < num2){
				$(".result").html("Получилось отрицательное число");
				$("#resultCC option[class='rim']").prop("selected", true);
				lastNumberSystem = "rim";
			} else if(num1 > num2){
				num3 = num1 - num2;
				$(".result").html(toRoman(num3));
				$("#resultCC option[class='rim']").prop("selected", true);
				lastNumberSystem = "rim";
			} else{
				$(".result").html("0");
				$("#resultCC option[class='rim']").prop("selected", true);
				lastNumberSystem = "rim";
			}
			
		} else{
			$(".result").html("Введите корректные числа");
		}

		//Разность не римских систем счисления

		if(($("#choose1 option:selected").attr("class") != "rim") && ($("#choose2 option:selected").attr("class") != "rim")){
			if(numberSystem1 == 16 && numberSystem2 == 16){
				if((cheak($("#num1").val()) == true && cheak($("#num2").val()) == true)){
					num1 = parseInt($("#num1").val(), 16);
					num2 = parseInt($("#num2").val(), 16);
					num3 = num1 - num2;
					$(".result").html(num3.toString(16));
					$("#resultCC option[class='16']").prop("selected", true);
					lastNumberSystem = 16;
				} else{
					$(".result").html("Введите корректные числа!");
				}
			}

			if(numberSystem1 == 16 && numberSystem2 != 16){
				if((cheak($("#num1").val()) == true && isNumeric($("#num2").val()) == true)){
					if(numberSystem2 == 10){
						num1 = parseInt($("#num1").val(),16);
						num2 = num1 - +$("#num2").val();
						$(".result").html(num2.toString(16));
						$("#resultCC option[class='" + 16 + "']").prop("selected", true);
						lastNumberSystem = 16;
					}
					if(numberSystem2 != 10){
						num1 = parseInt($("#num1").val(), 16);
						num2 = parseInt($("#num2").val(), numberSystem2);
						num3 = num1 - num2;
						$(".result").html(num3.toString(16));
						$("#resultCC option[class='16']").prop("selected", true);
						lastNumberSystem = 16;
					}
				} else {
					$(".result").html("Введите корректные числа!");
				}
			} 

			if(numberSystem1 != 16 && numberSystem2 == 16){
				if((isNumeric($("#num1").val()) == true && cheak($("#num2").val()) == true)){
					if(numberSystem1 == 10){
						num2 = parseInt($("#num2").val(),16);
						num3 = +$("#num1").val() - num2;
						$(".result").html(num3);
						$("#resultCC option[class='10']").prop("selected", true);
						lastNumberSystem = 10;
					}
					if(numberSystem1 != 10){
						num1 = parseInt($("#num1").val(), numberSystem1);
						num2 = parseInt($("#num2").val(), numberSystem2);
						num3 = num1 - num2;
						$(".result").html(num3.toString(numberSystem1));
						$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
						lastNumberSystem = numberSystem1;
					}
				} else {
					$(".result").html("Введите корректные числа!");
				}
			}
			if(numberSystem1 != 16 && numberSystem2 != 16){
				if(isNumeric($("#num1").val()) == true && isNumeric($("#num2").val()) == true){
					if(numberSystem1 == numberSystem2){
						if(numberSystem1 == 10){
							num1 = +$("#num1").val() - +$("#num2").val();
							$(".result").html(num1);
							$("#resultCC option[class='10']").prop("selected", true);
							lastNumberSystem = 10;
						}
						if(numberSystem1 != 10){
							num1 = parseInt($("#num1").val(),numberSystem1);
							num2 = parseInt($("#num2").val(),numberSystem2);
							num3 = num1 - num2;
							$(".result").html(num3.toString(numberSystem1));
							$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
							lastNumberSystem = numberSystem1;
						}	
					}
					if(numberSystem1 == 10 && numberSystem2 != 10){
						num1 = +$("#num1").val();
						num2 = parseInt($("#num2").val(),numberSystem2);
						num3 = num1 - num2;
						$(".result").html(num3);
						$("#resultCC option[class='10']").prop("selected", true);
						lastNumberSystem = 10;
					}
					if(numberSystem1 != 10 && numberSystem2 == 10){
						num1 = parseInt($("#num1").val(),numberSystem1);
						num2 = num1 - +$("#num2").val();
						$(".result").html(num2.toString(numberSystem1));
						$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
						lastNumberSystem = numberSystem1;
					}
					if(numberSystem1 != 10 && numberSystem2 != 10 && numberSystem1 != numberSystem2){
						num1 = parseInt($("#num1").val(), numberSystem1);
						num2 = parseInt($("#num2").val(), numberSystem2);
						num3 = num1 - num2;
						$(".result").html(num3.toString(numberSystem1));
						$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
						lastNumberSystem = numberSystem1;
					}	
				} else{
					$(".result").html("Введите корректные числа!");
				}
			}

		}
		
	} 

	//Произведение

	else if(transform == "multiply"){

		//Произведение не римской и римской

		if(($("#choose1 option:selected").attr("class") != "rim") && ($("#choose2 option:selected").attr("class") == "rim")){
				
				if(numberSystem1 == 16 && cheak($("#num1").val()) == true){
						num1 = parseInt($("#num1").val(), 16);
						num2 = fromRoman($("#num2").val());
						num3 = num1 * num2;
						$(".result").html(num3.toString(16));
						$("#resultCC option[class='16']").prop("selected", true);
						lastNumberSystem = 16;
				} 
				
				else if(numberSystem1 == 10 && (isNumeric($("#num1").val()) == true)){
						num1 = parseInt($("#num1").val());
						num2 = fromRoman($("#num2").val());
						num3 = num1 * num2;
						$(".result").html(num3);
						$("#resultCC option[class='10']").prop("selected", true);
						lastNumberSystem = 10;
				} 

				else if(numberSystem1 != 16 && (isNumeric($("#num1").val()) == true)){
						num1 = parseInt($("#num1").val(),numberSystem1);
						num2 = fromRoman($("#num2").val());
						num3 = num1 * num2;
						$(".result").html(num3.toString(numberSystem1));
						$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
						lastNumberSystem = numberSystem1;		
				} else{
					$(".result").html("Введите корректные числа!");
				}
		}

		//Произведение римской и не римской систем счисления

		else if(($("#choose1 option:selected").attr("class") == "rim") && ($("#choose2 option:selected").attr("class") != "rim")){

			if(numberSystem2 == 16 && (cheak($("#num2").val()) == true)){	
				num1 = fromRoman($("#num1").val());
				num2 = parseInt($("#num2").val(), 16);
				num3 = num1 * num2;
				$(".result").html(toRoman(num3));
				$("#resultCC option[class='rim']").prop("selected", true);
				lastNumberSystem = "rim";
			} 

			else if(numberSystem2 == 10 && (isNumeric($("#num2").val()) == true)){
				num1 = fromRoman($("#num1").val());
				num2 = parseInt($("#num2").val());
				num3 = num1 * num2;
				$(".result").html(toRoman(num3));
				$("#resultCC option[class='rim']").prop("selected", true);
				lastNumberSystem = "rim";
			} 

			else if(numberSystem2 != 16 && (isNumeric($("#num2").val()) == true)){
				num1 = fromRoman($("#num1").val());
				num2 = parseInt($("#num2").val(),numberSystem2);
				num3 = num1 * num2;
				$(".result").html(toRoman(num3));
				$("#resultCC option[class='rim']").prop("selected", true);
				lastNumberSystem = "rim";		
			} else {
				$(".result").html("Введите корректные числа!");
			}

		}

		//Произведение римских систем счисления

		else if(($("#choose1 option:selected").attr("class") == "rim") && ($("#choose2 option:selected").attr("class") == "rim")){
			num1 = fromRoman($("#num1").val());
			num2 = fromRoman($("#num2").val());
			num3 = num1 * num2;
			$(".result").html(toRoman(num3));
			$("#resultCC option[class='rim']").prop("selected", true);
			lastNumberSystem = "rim";
		} else{
			$(".result").html("Введите корректные числа");
		}

		//Произведение не римских систем счисления

		if(($("#choose1 option:selected").attr("class") != "rim") && ($("#choose2 option:selected").attr("class") != "rim")){

			if(numberSystem1 == 16 && numberSystem2 == 16){
				if((cheak($("#num1").val()) == true && cheak($("#num2").val()) == true)){
					num1 = parseInt($("#num1").val(), 16);
					num2 = parseInt($("#num2").val(), 16);
					num3 = num1 * num2;
					$(".result").html(num3.toString(16));
					$("#resultCC option[class='16']").prop("selected", true);
					lastNumberSystem = 16;
				} else{
					$(".result").html("Введите корректные числа!");
				}
			}

			if(numberSystem1 == 16 && numberSystem2 != 16){
				if((cheak($("#num1").val()) == true && isNumeric($("#num2").val()) == true)){
					if(numberSystem2 == 10){
						num1 = parseInt($("#num1").val(),16);
						num2 = num1 * +$("#num2").val();
						$(".result").html(num2.toString(16));
						$("#resultCC option[class='" + 16 + "']").prop("selected", true);
						lastNumberSystem = 16;
					}
					if(numberSystem2 != 10){
						num1 = parseInt($("#num1").val(), 16);
						num2 = parseInt($("#num2").val(), numberSystem2);
						num3 = num1 * num2;
						$(".result").html(num3.toString(16));
						$("#resultCC option[class='16']").prop("selected", true);
						lastNumberSystem = 16;
					}
				} else {
					$(".result").html("Введите корректные числа!");
				}
			} 

			if(numberSystem1 != 16 && numberSystem2 == 16){
				if((isNumeric($("#num1").val()) == true && cheak($("#num2").val()) == true)){
					if(numberSystem1 == 10){
						num2 = parseInt($("#num2").val(),16);
						num3 = +$("#num1").val() * num2;
						$(".result").html(num3);
						$("#resultCC option[class='10']").prop("selected", true);
						lastNumberSystem = 10;
					}
					if(numberSystem1 != 10){
						num1 = parseInt($("#num1").val(), numberSystem1);
						num2 = parseInt($("#num2").val(), numberSystem2);
						num3 = num1 * num2;
						$(".result").html(num3.toString(numberSystem1));
						$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
						lastNumberSystem = numberSystem1;
					}
				} else {
					$(".result").html("Введите корректные числа!");
				}
			}

			if(numberSystem1 != 16 && numberSystem2 != 16){
				if(isNumeric($("#num1").val()) == true && isNumeric($("#num2").val()) == true){
					if(numberSystem1 == numberSystem2){
						if(numberSystem1 == 10){
							num1 = +$("#num1").val() * +$("#num2").val();
							$(".result").html(num1);
							$("#resultCC option[class='10']").prop("selected", true);
							lastNumberSystem = 10;
						}
						if(numberSystem1 != 10){
							num1 = parseInt($("#num1").val(),numberSystem1);
							num2 = parseInt($("#num2").val(),numberSystem2);
							num3 = num1 * num2;
							$(".result").html(num3.toString(numberSystem1));
							$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
							lastNumberSystem = numberSystem1;
						}	
					}
					if(numberSystem1 == 10 && numberSystem2 != 10){
						num1 = +$("#num1").val();
						num2 = parseInt($("#num2").val(),numberSystem2);
						num3 = num1 * num2;
						$(".result").html(num3);
						$("#resultCC option[class='10']").prop("selected", true);
						lastNumberSystem = 10;
					}
					if(numberSystem1 != 10 && numberSystem2 == 10){
						num1 = parseInt($("#num1").val(),numberSystem1);
						num2 = num1 * +$("#num2").val();
						$(".result").html(num2.toString(numberSystem1));
						$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
						lastNumberSystem = numberSystem1;
					}
					if(numberSystem1 != 10 && numberSystem2 != 10 && numberSystem1 != numberSystem2){
						num1 = parseInt($("#num1").val(), numberSystem1);
						num2 = parseInt($("#num2").val(), numberSystem2);
						num3 = num1 * num2;
						$(".result").html(num3.toString(numberSystem1));
						$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
						lastNumberSystem = numberSystem1;
					}	
				} else{
					$(".result").html("Введите корректные числа!");
				}
			}

		}
	
	} 

	//Деление

	else if(transform == "split"){

		if($("#num2").val() != "0"){

			//Деление не римской и римской системы счисления

			if(($("#choose1 option:selected").attr("class") != "rim") && ($("#choose2 option:selected").attr("class") == "rim")){
				
				if(numberSystem1 == 16 && cheak($("#num1").val()) == true){
						num1 = parseInt($("#num1").val(), 16);
						num2 = fromRoman($("#num2").val());
						num3 = num1 / num2;
						$(".result").html(num3.toString(16));
						$("#resultCC option[class='16']").prop("selected", true);
						lastNumberSystem = 16;
				} 
				
				else if(numberSystem1 == 10 && (isNumeric($("#num1").val()) == true)){
						num1 = parseInt($("#num1").val());
						num2 = fromRoman($("#num2").val());
						num3 = num1 / num2;
						$(".result").html(num3);
						$("#resultCC option[class='10']").prop("selected", true);
						lastNumberSystem = 10;
				} 

				else if(numberSystem1 != 16 && (isNumeric($("#num1").val()) == true)){
						num1 = parseInt($("#num1").val(),numberSystem1);
						num2 = fromRoman($("#num2").val());
						num3 = num1 / num2;
						$(".result").html(num3.toString(numberSystem1));
						$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
						lastNumberSystem = numberSystem1;		
				} else{
					$(".result").html("Введите корректные числа!");
				}
			}

			//Деление римской и не римской систем счисления

			else if(($("#choose1 option:selected").attr("class") == "rim") && ($("#choose2 option:selected").attr("class") != "rim")){

				if(numberSystem2 == 16 && (cheak($("#num2").val()) == true)){	
					num1 = fromRoman($("#num1").val());
					num2 = parseInt($("#num2").val(), 16);
					num3 = num1 / num2;
					$(".result").html(toRoman(num3));
					$("#resultCC option[class='rim']").prop("selected", true);
					lastNumberSystem = "rim";
				} 

				else if(numberSystem2 == 10 && (isNumeric($("#num2").val()) == true)){
					num1 = fromRoman($("#num1").val());
					num2 = parseInt($("#num2").val());
					num3 = num1 / num2;
					$(".result").html(toRoman(num3));
					$("#resultCC option[class='rim']").prop("selected", true);
					lastNumberSystem = "rim";
				} 

				else if(numberSystem2 != 16 && (isNumeric($("#num2").val()) == true)){
					num1 = fromRoman($("#num1").val());
					num2 = parseInt($("#num2").val(),numberSystem2);
					num3 = num1 / num2;
					$(".result").html(toRoman(num3));
					$("#resultCC option[class='rim']").prop("selected", true);
					lastNumberSystem = "rim";		
				} else {
					$(".result").html("Введите корректные числа!");
				}

			}

			//Деление римских систем счисления

			else if(($("#choose1 option:selected").attr("class") == "rim") && ($("#choose2 option:selected").attr("class") == "rim")){
				num1 = fromRoman($("#num1").val());
				num2 = fromRoman($("#num2").val());
				num3 = num1 / num2;
				$(".result").html(toRoman(num3));
				$("#resultCC option[class='rim']").prop("selected", true);
				lastNumberSystem = "rim";
			} else{
				$(".result").html("Введите корректные числа!");
			}

			//Деление не римских систем счисления

			if(($("#choose1 option:selected").attr("class") != "rim") && ($("#choose2 option:selected").attr("class") != "rim")){

				if(numberSystem1 == 16 && numberSystem2 == 16){
					if((cheak($("#num1").val()) == true && cheak($("#num2").val()) == true)){
						num1 = parseInt($("#num1").val(), 16);
						num2 = parseInt($("#num2").val(), 16);
						num3 = num1 / num2;
						$(".result").html(num3.toString(16));
						$("#resultCC option[class='16']").prop("selected", true);
						lastNumberSystem = 16;
					} else{
						$(".result").html("Введите корректные числа!");
					}
				}

				if(numberSystem1 == 16 && numberSystem2 != 16){
					if((cheak($("#num1").val()) == true && isNumeric($("#num2").val()) == true)){
						if(numberSystem2 == 10){
							num1 = parseInt($("#num1").val(),16);
							num2 = num1 / +$("#num2").val();
							$(".result").html(num2.toString(16));
							$("#resultCC option[class='" + 16 + "']").prop("selected", true);
							lastNumberSystem = 16;
						}
						if(numberSystem2 != 10){
							num1 = parseInt($("#num1").val(), 16);
							num2 = parseInt($("#num2").val(), numberSystem2);
							num3 = num1 / num2;
							$(".result").html(num3.toString(16));
							$("#resultCC option[class='16']").prop("selected", true);
							lastNumberSystem = 16;
						}
					} else {
						$(".result").html("Введите корректные числа!");
					}
				} 

				if(numberSystem1 != 16 && numberSystem2 == 16){
					if((isNumeric($("#num1").val()) == true && cheak($("#num2").val()) == true)){
						if(numberSystem1 == 10){
							num2 = parseInt($("#num2").val(),16);
							num3 = +$("#num1").val() / num2;
							$(".result").html(num3);
							$("#resultCC option[class='10']").prop("selected", true);
							lastNumberSystem = 10;
						}
						if(numberSystem1 != 10){
							num1 = parseInt($("#num1").val(), numberSystem1);
							num2 = parseInt($("#num2").val(), numberSystem2);
							num3 = num1 / num2;
							$(".result").html(num3.toString(numberSystem1));
							$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
							lastNumberSystem = numberSystem1;
						}
					} else {
						$(".result").html("Введите корректные числа!");
					}
				}

				if(numberSystem1 != 16 && numberSystem2 != 16){
					if(isNumeric($("#num1").val()) == true && isNumeric($("#num2").val()) == true){
						if(numberSystem1 == numberSystem2){
							if(numberSystem1 == 10){
								num1 = +$("#num1").val() / +$("#num2").val();
								$(".result").html(num1);
								$("#resultCC option[class='10']").prop("selected", true);
								lastNumberSystem = 10;
							}
							if(numberSystem1 != 10){
								num1 = parseInt($("#num1").val(),numberSystem1);
								num2 = parseInt($("#num2").val(),numberSystem2);
								num3 = num1 / num2;
								$(".result").html(num3.toString(numberSystem1));
								$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
								lastNumberSystem = numberSystem1;
							}	
						}
						if(numberSystem1 == 10 && numberSystem2 != 10){
							num1 = +$("#num1").val();
							num2 = parseInt($("#num2").val(),numberSystem2);
							num3 = num1 / num2;
							$(".result").html(num3);
							$("#resultCC option[class='10']").prop("selected", true);
							lastNumberSystem = 10;
						}
						if(numberSystem1 != 10 && numberSystem2 == 10){
							num1 = parseInt($("#num1").val(),numberSystem1);
							num2 = num1 / +$("#num2").val();
							$(".result").html(num2.toString(numberSystem1));
							$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
							lastNumberSystem = numberSystem1;
						}
						if(numberSystem1 != 10 && numberSystem2 != 10 && numberSystem1 != numberSystem2){
							num1 = parseInt($("#num1").val(), numberSystem1);
							num2 = parseInt($("#num2").val(), numberSystem2);
							num3 = num1 / num2;
							$(".result").html(num3.toString(numberSystem1));
							$("#resultCC option[class='" + numberSystem1 + "']").prop("selected", true);
							lastNumberSystem = numberSystem1;
						}	
					} 
				}
			}
		} else{
			$(".result").html("Такой умный?");
		}
	}
		
});
	
});