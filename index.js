var firstNum='';
var result='';
function calculator(){

//0-9数字的鼠标按下、离开效果；追加内容；如果默认是0，替换0再输入；
function number(x,y){
    $(x).mousedown(function (){
    	$(x).css('background-color','rgb(178,178,178)');
    		
    });	
    $(x).mouseup(function (){
    	$(x).css('background-color','rgb(224,224,224)');
    	});
    $(x).mouseout(function (){
        $(x).css('background-color','rgb(224,224,224)');
        });
    $(x).click(function (){

            $('#process').text(firstNum); 
        var num=document.getElementsByTagName('p')[0].innerHTML;
            if ((y=='0')&&(num==0)){
                $('#process').html('0');
            }else
            if (num==0){
                firstNum=firstNum+y;
                $('#process').html(y);
            }else {
                firstNum=firstNum+y;
                $('#process').text(firstNum);
            }; 
            console.log(firstNum);
    });
};
    		number('#nine','9');
    		number('#eight','8');
    		number('#seven','7');
    		number('#six','6');
    		number('#five','5');
    		number('#four','4');
    		number('#three','3');
    		number('#two','2');
    		number('#one','1');	
    		number('#zero','0');
    		number('#point','.');


//加减乘除的鼠标按下、离开效果；追加内容；
function operator(x,y){
    		$(x).mousedown(function (){
    			$(x).css({
    				'background-color': 'rgb(194,115,48)',
    				'color': '#866240',
    			});
                //当运算时，字符串最后一个字符和运算符相同时，不改变字符串
                //当运算时，字符串最后一个字符和运算符不相同，是其他运算符时，去除上一个运算符，连接第二次输入的运算符
                //当运算时，非以上两种情况，正常连接字符串
            {   var num=document.getElementsByTagName('p')[0].innerHTML;
                
                var array=firstNum.split('');
                var operator=array[array.length-1];
                if (operator==y){
                    firstNum=firstNum;
            }else if((firstNum=='')&&((y=='*')||(y=='/'))){
                firstNum=firstNum;
            }else
            if ((operator!=y)&&((operator=='+')||(operator=='-')||(operator=='*')||(operator=='/'))){
                firstNum=firstNum.substring(0,firstNum.length-1)+y;
            }else {
                firstNum=firstNum+y;
            };
                $('#process').text(firstNum); 
                $('#text').text('');
            console.log(firstNum);
        }});	
    		$(x).mouseup(function (){
    			$(x).css({
    				'background-color': 'rgb(245,146,41)',
    				'color': 'rgb(255,254,225)',
    			});
    		});	
}	
    	operator('#add','+');
    	operator('#minus','-');
    	operator('#multiply','*');
    	operator('#divided','/'); 
}
        //将数字和运算符定义在一个函数内，之后进行调用
        calculator();

//等于号
function equals(x){
    $(x).mousedown(function (){
                $(x).css({
                    'background-color': 'rgb(194,115,48)',
                    'color': '#866240',
                });{
            var num=document.getElementsByTagName('p')[0].innerHTML;
            
            $('#process').text(firstNum+'='); 
            result=eval(firstNum);
            firstNum=result+'';
            console.log(firstNum);
            if (num==0){
            }else{
                $('#text').text(result);
            };
        }});    
            $(x).mouseup(function (){
                $(x).css({
                    'background-color': 'rgb(245,146,41)',
                    'color': 'rgb(255,254,225)',
                });
            }); 
} 
        equals('#equals','=');

//AC清零
function number(x,y){
    $(x).mousedown(function (){
        $(x).css('background-color','rgb(178,178,178)');
            
    }); 
    $(x).mouseup(function (){
        $(x).css('background-color','rgb(224,224,224)');
        });
    $(x).mouseout(function () {
        $(x).css('background-color','rgb(214,214,214)');
        });
    $(x).click(function (){
            $('#process').text('');
            $('#text').text('0');
            firstNum='';
            console.log(firstNum);
    });
};
            number('#ac','0');
