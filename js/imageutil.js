/**
 * 
 */

var baseurl="";
function handleFileSelect (evt, img, quality) {
	  
		if(!arguments[2]){
			quality = 100;
		}
		var files = evt.target.files;
		for (var i = 0, f; f = files[i]; i++) {
 
	      // Only process image files.
		  if (!f.type.match('image.*')) {
			        continue;
	    }
 
	      var reader = new FileReader();
 
	      // Closure to capture the file information.
		  reader.onload = (function(theFile) {
		    return function(e) {
					  var i = document.getElementById(img);
					  var tmpImg = document.createElement("img");
					  tmpImg.src = e.target.result;
					  i.src = jic.compress(tmpImg,quality,"image/jpeg").src;
					  i.style.display = "block";
			        };
			      })(f);
		 
			      // Read in the image file as a data URL.
		      reader.readAsDataURL(f);
		    }
  }


function getBase64Image(img) {
	
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
       
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
         
        var dataURL = canvas.toDataURL("image/"+ext);
        if(dataURL.indexOf("data:image/png") == 0){
        	console.log("不支持 canvas.toDataURL");
        }
        return dataURL;
}


function handleFileSelectAjax (evt, img, quality,ifUrl,send) {
	 
		if(!arguments[2]){
			quality = 100;
		}
		var files = evt.target.files;
		for (var i = 0, f; f = files[i]; i++) {
 
	      // Only process image files.
		  if (!f.type.match('image.*')) {
			        continue;
	    }
       var dataObj = {};
	      var reader = new FileReader();
 
	      // Closure to capture the file information.
		  reader.onload = (function(theFile) {
		    return function(e) {
					  var i = document.getElementById(img);
					  var tmpImg = document.createElement("img");
					  tmpImg.src = e.target.result;
					  i.src = jic.compress(tmpImg,quality,"image/jpeg").src;
					 dataObj = {
					 	data:tmpImg.src.split(",")[1],
					 	regkey:localStorage.regkey
					 };
					 
					 $.ajax({
			          url : baseurl+ifUrl,
			          method:'POST',
			          data : dataObj,
			        
			          dataType : "text",
			           success : function(respData, textStatus, jqXHR) {
			           	var  res= JSON.parse(respData); 
				         if(res.result){
				         	if(send=='pic4'){
				         		localStorage.avatar=res.id;
				         	}
				         	$("#"+img).css("background-color","#387ef5");
				         	$("#"+send).val(res.id);
				         }else{
				         	
				         }
			         },
			    error : function(jqXHR, textStatus, errorThrown) {
				
		      	}
		       });
					 
			        };
			      })(f);
		 
			      // Read in the image file as a data URL.
		      reader.readAsDataURL(f);
		    }
  }

/**
 * 图片压缩
 * Edit by bin.20150804
 * source_img_obj：图片对象<img src=""/>
 * quality：质量，最大100
 * output_format：输出格式如：image/jpeg
 * maxWidth：压缩后的最大宽度
 * maxHeight：压缩后的最大高度
 * showWidth:非必填，实际显示时的宽度，目的是限制图片比例，有可能会截断图片
 * showHeight:非必填，实际显示时的高度，目的是限制图片比例，有可能会截断图片
 * type: 处理方理，"truncate" 截断，缩放
 */
var jic = {
        
   compress: function(source_img_obj, quality, output_format, maxWidth, maxHeight, showWidth, showHeight, type){
         /**
          * 参数处理
          */
         var mime_type = "image/jpeg";
         if(output_format!=undefined && output_format=="png"){
            mime_type = "image/png";
         } 
         if(!maxWidth){
         	maxWidth = 1280;
         }
         if(!maxHeight){
         	maxHeight = 720;
         }
         if(!showWidth){
         	showWidth = maxWidth;
         }
         if(!showHeight){
         	showHeight = maxHeight;
         }
          
         /*
          * 计算原图片调整比例之后的宽高度（压缩前）
          */
         var naturalWidth = source_img_obj.naturalWidth;//naturalWidth真实图片的宽度
         var naturalHeight = source_img_obj.naturalHeight;
         var width = naturalWidth;
         var height = naturalHeight;
         if (naturalWidth * showHeight != showWidth * naturalHeight){
         	width = naturalHeight * (showWidth/showHeight);
         	height = naturalHeight;
         	if (width > naturalWidth){
         		height = naturalWidth * (showHeight/showWidth)
         		width = naturalWidth;
         	}
         }
         
 
         var cvs = document.createElement('canvas');
         var ctx = null;
         
         /**
          * 计算最终宽度、高度，图象不超过maxWidth 和 maxHeight
          */
         var sxr = width / maxWidth;
         var syr = height / maxHeight;
         if (sxr <= 1 && syr <= 1 ){
         	cvs.width = width;
         	cvs.height = height;
         }else {
         	if (sxr >= syr){
         		cvs.width = maxWidth;
         		cvs.height = height / sxr;
         		
         	}else {
         		cvs.width = width / syr;
         		cvs.height = maxHeight;
         	}
         }
         
         
//        confirm("width:" + width + ",height:" + height + ",naturalWidth:" + naturalWidth + ",naturalHeight:" 
//        		+ naturalHeight + ",cvs.width:" + cvs.width + ",cvs.height:" + cvs.height);
//         $("textarea[name=introduction]").val("**:" + source_img_obj.src);
//         $("textarea[name=prohibited]").val("**:" + newImageData);
        /**
         *绘图 
         */
        if (type == 'truncate'){//截断
        	ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0, width, height, 0, 0, cvs.width,cvs.height);
        }else {//缩放
        	ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0, naturalWidth, naturalHeight, 0, 0, cvs.width,cvs.height);
        }
                 
        var newImageData = cvs.toDataURL(mime_type, quality/100);
        var result_image_obj = new Image();
        result_image_obj.src = newImageData;
        return result_image_obj;
         
    }
}