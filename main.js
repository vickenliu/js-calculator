$('td').mousedown(function(){
	$(this).css('opacity',0.5);
}).mouseup(function(){
	$(this).css('opacity',1);
});
var show=[],newRound=false;
$('td').click(function(){
	var content=$(this).text(),fun=$(this).data('function');
	
	if(fun==='clear'){
		$('#display').empty();
		show=[];newRound=false;
	} else if(newRound && fun==='operator'){
		show=[];
		show.push($('#display').html(),content);
		$('#display').html(show.join(''));
		newRound=false;
	}else if(newRound && fun!=='operator'&& fun!=='equal'){
			newRound=false;
			show=[];
			if(content==='CE'){
				show=($('#display').html()).split('');
				show=show.slice(0,-1);
			}else{
				show.push(content);
			}
			$('#display').html(show.join(''));
	} else{
				// to display typing
		if(fun!=='equal'&& fun!=='clear'){
			if(content==='CE'){
				show=show.slice(0,-1);
			}else{
				show.push(content);
			}
			$('#display').html(show.join(''));
		}else{  //caculating
			$('#display').html(sum(show));
			newRound=true;
		}
	}
})

function sum(arr){
	var str=[],temp='';
	for(var j=0;j<arr.length;j++){
		if(arr[j]!=='/' && arr[j]!=='*' && arr[j]!=='%' && arr[j]!=='+' && arr[j]!=='-'){
			temp+=arr[j];
			if(j===(arr.length-1)){
				str.push(parseFloat(temp));
			}
		}else{
			if(j===0){
				str.push(0,arr[j]);
			}else{
				str.push(parseFloat(temp),arr[j]);
				temp='';
			}
		}
	}
		console.log(str);

	var pulsArr=getPlus(str);
	if(pulsArr.length===1){
		return pulsArr[0];
	}
	// console.log(pulsArr);
	var result=pulsArr[0];
	for(var i=1;i<pulsArr.length;){
			switch(pulsArr[i]){
				case '+':
					result+=pulsArr[i+1];
					i+=2;
					break;
				case '-':
					result-=pulsArr[i+1];
					i+=2;
					break;
			}
	}
	return result;
}

function getPlus(_arr){ //  finished all the * % / operations
	var numArr=[],count=false;
	for(var i=1,l=_arr.length;i<l;){
		if(count){  // after the */%,the rest push into array for next round
			numArr.push(_arr[i]);
			i++;
		}else{
			if(_arr[i]==='+'|| _arr[i]==='-'){  //push no prioroty into array
				numArr.push(_arr[i-1],_arr[i]);
				if((i+2)===l){
					numArr.push(_arr[i+1]);
				}
				i+=2;
			}else if(_arr[i]==='*'){  // excute left-most prioroty one, and set count true to stop for the next round
				numArr.push(_arr[i-1]*_arr[i+1]);
				count=true;
				i+=2;
			}else if(_arr[i]==='%'){
				numArr.push(_arr[i-1]%_arr[i+1]);
				count=true;
				i+=2;
			}else if(_arr[i]==='/'){
				numArr.push(_arr[i-1]/_arr[i+1]);
				count=true;
				i+=2;
			}
		}

	}
	if(numArr.indexOf('*')>-1 || numArr.indexOf('/')>-1 || numArr.indexOf('%')>-1){   // check if there is */% left
		numArr=getPlus(numArr);
	}
	return numArr;
}