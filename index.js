var postCard = document.getElementById("postCard"),
	postCardD = document.getElementById("postCardD"),
	gallery = document.getElementById("gallery"),
	galleryD = document.getElementById('galleryD'),
	cardControl = document.getElementById("cardControl"),
	to = document.getElementById('To'),
	from = document.getElementById('From'),
	dBody = document.getElementById('Body'),
	cardBg = document.getElementById('cardBg'),
	cardTo = document.getElementById('cardTo'),
	cardBody = document.getElementById('cardBody'),
	cardFrom = document.getElementById('cardFrom'),
	gScreen = document.getElementById('galleryScreen'),
	addG = document.getElementById('addGallery'),
	sOnline = document.getElementById('saveOnline'),
	cardBg = document.getElementById('cardBg'),
	cardTo = document.getElementById('cardTo'),
	cardBody = document.getElementById('cardBody'),
	cardFrom = document.getElementById('cardFrom'),
	bb_cardBg = document.getElementById('bb_cardBg'),
	bb_cardTo = document.getElementById('bb_cardTo'),
	bb_cardFrom = document.getElementById('bb_cardFrom'),
	bb_cardBody = document.getElementById("bb_cardBody"),
	bb_control = document.getElementById('bb_control'),
	theTo ='',
	theFrom = '',
	theBody = '',
	theBg = '',
	mTo = '',
	mB = '',
	mFrom = '',
	bgImg = '',
	lis = [];
		
function makeDict(){
	var obj ={
		bgimg:bgImg,
		mto:mTo,
		mbody:mB,
		mfrom:mFrom
	};
	lis.push(obj);
	console.log(lis);
}

postCard.addEventListener('click',function(){
	postCardD.style.display = 'block';
	galleryD.style.display = 'none';
	gScreen.style.display = 'none';
})

gallery.addEventListener('click',function(){
	postCardD.style.display = 'none';
	galleryD.style.display = 'block';
	
	
})

addG.addEventListener('click',function(){
	postCardD.style.display = 'none';
	gScreen.style.display = 'block';
	gScreen.innerHTML = ''
	for(var i=0;i< lis.length;i++){
		var new_p = document.createElement('div'),
			new_to = document.createElement('div'),
			new_from = document.createElement('div'),
			new_body = document.createElement('div');

		new_p.className = 'new_post';
		new_to.className = 'new_t';
		new_body.className = 'new_b';
		new_from.className = 'new_f';
		
		console.log(lis[i].bgimg);
		
		new_body.style.cssText = "background-image:"+lis[i].bgimg+";position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: auto;width: 50%;height: 90%;";


		new_to.innerHTML = lis[i].mto;
		new_body.innerHTML = lis[i].mbody;
		new_from.innerHTML = lis[i].mfrom;

		new_p.appendChild(new_to);
		new_p.appendChild(new_from);
		new_p.appendChild(new_body);
		gScreen.appendChild(new_p);
		
		new_p.addEventListener('click',function(){
			new_to.innerHTML = theTo;
			new_from.innerHTML = theFrom;
			new_body.innerHTML = theBody;
			new_body.style.backgroundImage = 'url('+theBg+')';
			bb_control.style.display='block';
		})
	}
})

dBody.addEventListener("click",function(){
	cardControl.style.display = 'block';
	cardBg.style.display = 'block';
	cardBody.style.display = 'block';
	cardTo.style.display = 'none';
	cardFrom.style.display = 'none';
})

to.addEventListener('click',function(){
	cardControl.style.display = 'block';
	cardBg.style.display = 'none';
	cardBody.style.display = 'none';
	cardTo.style.display = 'block';
	cardFrom.style.display = 'none';
})

from.addEventListener('click',function(){
	cardControl.style.display = 'block';
	cardBg.style.display = 'none';
	cardBody.style.display = 'none';
	cardTo.style.display = 'none';
	cardFrom.style.display = 'block';
})

cardBg.addEventListener('keyup',function(ev){
	bgImg = 'url('+this.value+')';
	if (ev.keyCode == 13){
		makeDict();
		cardControl.style.display = 'none';

	};
})

cardTo.addEventListener('keyup',function(ev){
	mTo = this.value;
	if (ev.keyCode == 13){
		makeDict();
		cardControl.style.display = 'none';
	};
})

cardBody.addEventListener('keyup',function(ev){
	mB = this.value;
	if (ev.keyCode == 13){
		makeDict();
		cardControl.style.display = 'none';
	};
})

cardFrom.addEventListener('keyup',function(ev){
	mFrom = this.value;
	if (ev.keyCode == 13){
		makeDict();
		cardControl.style.display = 'none';
	};
})

saveOnline.addEventListener('click',function(){
	console.log(lis[0]);
	
	
	fetch('http://forcitpurposes.herokuapp.com/sendCard', {
		method:'post',
		body:JSON.stringify(lis[0]),
		headers:{
			"content-Type":"application/json"
		}
		
		
	}).then(function(resp){
		return resp.json();
	}).then(function(json){
		console.log('160',json);
	});
	
	
})

loadOnline.addEventListener('click',function(){
	var times = 0;
	//setInterval(function(){
		
		gScreen.innerHTML='';
		fetch("http://forcitpurposes.herokuapp.com/getCards").then(function(resp){
			return resp.json();

		}).then(function(json){
			console.log(json);
			gScreen.innerHTML = "";
			for(var i=0;i<json.length;i++){
				var new_p = document.createElement('div'),
					new_to = document.createElement('div'),
					new_from = document.createElement('div'),
					new_body = document.createElement('div');

				new_p.className = 'new_post';
				new_to.className = 'new_t';
				new_body.className = 'new_b';
				new_from.className = 'new_f';

				//console.log(lis[i].dict_bg);

				new_body.style.cssText = "background-image:"+json[i].bgimg+";position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: auto;width: 50%;height: 90%;";


				new_to.innerHTML = json[i].mto;
				new_body.innerHTML = json[i].mbody;
				new_from.innerHTML = json[i].mfrom;

				new_p.appendChild(new_to);
				new_p.appendChild(new_from);
				new_p.appendChild(new_body);
				gScreen.appendChild(new_p);

				};
		});
		times ++;
		console.log('fetch:',times,'times');
	//},5000);
	//},1500000);
})

bb_cardBg.addEventListener('keyup',function(){
	theBg = this.value;
})

bb_cardTo.addEventListener('keyup',function(){
	theTo = this.value;
})

bb_cardFrom.addEventListener('keyup',function(){
	theFrom = this.value;
})

bb_cardBody.addEventListener('keyup',function(){
	theBody = this.value;
})

