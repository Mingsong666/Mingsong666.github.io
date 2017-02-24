/*
 * 定义List类
 */
var List = function(){
    // 全部列表数据
    this.all = null;
    // 全部商区数据
    this.allDistrict = null;
    // 全部地铁数据
    this.allMetro = null;
	// 显示列表数据vue对象
	this.vueList = null;
	// 显示商区数据vue对象
	this.vueDistrict = null;
}

/**
 * 获取数据
 */
List.prototype.getData = function(){
	var self = this;

	$.ajax({
		url: 'data/list.json',
		success: function(response){
			self.all = response;
            self.showData(response);
		}
	});
}

/**
 * 显示数据
 */
List.prototype.showData = function(data){
	this.vueList = new Vue({
	el:'#shopList',
	data: {
		shopLists: data,
		// 1-券, 2-团
		tuan:['','ticket','groupBuying']
	},
	filters: {
		// star：评价星星数量过滤器
		starClass: function(val){
		var a = {
				'5': 'evalute-5',
				'4.5': 'evalute-4-1',
				'4': 'evalute-4',
				'3.5': 'evalute-3-1',
				'3': 'evalute-3',
				'2.5': 'evalute-2-1',
				'2': 'evalute-2',
				'1.5': 'evalute-1-1',
				'1': 'evalute-1'
			};
			return a[val];
		}
	}
});
}

/**
 * 筛选商家 
 */
List.prototype.filter = function (id){
	var all = this.all,
    		data = [];

    	if(id == 1666) {
    		data = all;
    	}else if(id.slice(2,4) == 00){
    		//全部大商区的id后两位都是00，该商区下的所有小商区前两位相同
    		for(var i = 0; i < all.length; i++) {
	    		if((all[i].district+'').slice(0, 2) == id.slice(0,2) ) {
	    			data.push(all[i]);
	    		}
	    	}
    	}else{
	    	for(var i = 0; i < all.length; i++) {
	    		if(all[i].district == id) {
	    			data.push(all[i]);
	    		}else if (all[i].metro == id) {
	    			data.push(all[i]);
	    		}
	    	}
    	}

    	if(data.length < 1) {
    		alert('该商圈没有商家');
    	} else{
    		this.vueList.shopLists = data;
    	}
}

/**
 * 获取商圈、地铁列表
 */
List.prototype.getDistrictMetro = function(){
	var selfD = this;

	$.ajax({
		url: 'data/district.json',
		success: function(response){
            selfD.showDistrictMetro(response);
            selfD.allDistrict = response;
		}
	});

	$.ajax({
		url: 'data/metro.json',
		success: function(response){
			selfD.allMetro = response;
		}
	});
}

/**
 * 显示商区、地铁列表
 */
List.prototype.showDistrictMetro = function(dataDistrict){
	var self2 = this;

	this.vueDistrict = new Vue({
	el: '#menu',
	data: {
		ListBig: dataDistrict,
		ListBigSlect: dataDistrict.slice(0, 1)
	},
	methods: {
		clickAll: function (){
			$('#allDistrict').removeClass('displaynone');
		},
		clickFooter: function (){
			$('#allDistrict').addClass('displaynone');
		},
		//点击大区域
		clickBig: function(e){
			$('.bigList').children('li').css('background-color','rgb(245, 245, 245)');
			$(e.target).css('background-color','rgb(255, 255, 255)');
			$('.minList').children('div').children('span').removeClass('slectMin');
			//读取当前大商区的ID
			var idBigD = e.target.title;
			this.ListBigSlect = this.ListBig.slice(parseInt(idBigD.substr(3))-1, parseInt(idBigD.substr(3)));
		},
		//点击小区域
		clickMin: function (e){
			self2.filter(e.target.title);
			this.clickFooter();
			$('#all').html("<a href='#'>"+$(e.target).text()+"<span></span></a>");
			$('.minList').children('div').children('span').removeClass('slectMin');
			$(e.target).addClass('slectMin');
		},
		clickDistrict: function (){
			$('.metro').removeClass('slectStyle');
			$('.district').addClass('slectStyle');
			$('.minList').children('div').children('span').removeClass('slectMin');
			this.ListBig = self2.allDistrict;
			this.ListBigSlect = self2.allDistrict.slice(0, 1);
		},
		clickMetro: function (){
			$('.district').removeClass('slectStyle');
			$('.metro').addClass('slectStyle');
			$('.minList').children('div').children('span').removeClass('slectMin');
			this.ListBig = self2.allMetro;
			this.ListBigSlect = self2.allMetro.slice(0, 1);
		}
	}
	});
}

    var list = new List();
    list.getData();
	list.getDistrictMetro();

