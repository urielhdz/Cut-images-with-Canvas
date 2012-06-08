var clsCut = (function(){
	var rect;
	function letsCut(cutBtn, endBtn,idImg,idContainer)
	{
		cutBtn = "#"+cutBtn;
		endBtn = "#"+endBtn;
		idImg = "#"+idImg;
		console.log(cutBtn);
		$(cutBtn).fadeOut();
		$(endBtn).fadeIn();
		$(idImg).fadeOut();
		var url = $(idImg).attr("src");
		var img = new Image();
		img.src = url;
		img.onload= function()
		{
			var imgWidth = this.width;
	        var imgHeight = this.height;
	    	var stage = new Kinetic.Stage({
				container: idContainer,
				width: imgWidth,
				height: imgHeight
			});
			var layer = new Kinetic.Layer();
			var image = new Kinetic.Image({
	            x: 0,
	            y: 0,
	            image: this,
	          });
			layer.add(image);
			stage.add(layer);
			drawCircles(stage,layer,cutBtn,endBtn);
		}
	}
	function drawCircles(stage,layer,cutBtn,endBtn)
	{
		var imgW,imgH;
		var circle = new Kinetic.Circle({
	        x: 20,
	        y: 20,
	        radius: 20,
	        fill: "black",
	        stroke: "white",
	        strokeWidth: 2,
	        draggable: true,
	    });
	    var circle4 = new Kinetic.Circle({
	        x: stage.getWidth()-20,
	        y: stage.getHeight()-20,
	        radius: 20,
	        fill: "black",
	        stroke: "white",
	        strokeWidth: 2,
	        draggable: true,
	    });
	    var shapes = [circle,circle4];
	    if(!rect)
		{
			imgW = shapes[0].getX() - shapes[1].getX();
		   	imgH = shapes[0].getY() - shapes[1].getY();
		    rect = new Kinetic.Rect({
		        x: shapes[0].getX(),
		        y: shapes[0].getY(),
		        width: -imgW,
		        height: -imgH,
		        fill: "rgba(0,0,0,0.5)",
		    });
		    layer.add(rect);
		    layer.draw();
		}
	    for (var i = 0; i <shapes.length; i++) {
	    	shapes[i].on("dragend",function(){
	    		if(rect) {layer.remove(rect);}
	            layer.draw();
		    	imgW = shapes[0].getX() - shapes[1].getX();
		    	imgH = shapes[0].getY() - shapes[1].getY();
		    	rect = new Kinetic.Rect({
		          x: shapes[0].getX(),
		          y: shapes[0].getY(),
		          width: -imgW,
		          height: -imgH,
		          fill: "rgba(0,0,0,0.5)",
		        });
		        layer.add(rect);
		        stage.add(layer);
		    });
	    }
	    $(endBtn).on("click",function(){
	    	layer.remove(circle);
	    	layer.remove(circle4);
	    	layer.remove(rect);
	    	layer.draw();
			var miCanvas = document.getElementsByTagName("canvas");
			var ctx = miCanvas[2].getContext("2d");
			var datosDeLaImagen = ctx.getImageData(rect.getX(),rect.getY(),-imgW,-imgH);
			var cF = miCanvas[3];
			var ctx2 = cF.getContext("2d");
			cF.height = datosDeLaImagen.height;
			cF.width = datosDeLaImagen.width;
			ctx2.putImageData(datosDeLaImagen,0,0);
			var dataURL = cF.toDataURL();
			window.open(dataURL);
			$(cutBtn).fadeIn();
		});
	    layer.add(circle);
	    layer.add(circle4);
	    stage.add(layer);
	}
	return {
		letsCut : letsCut
	}
})();