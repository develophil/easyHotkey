/************************************************************************
@Name 		:   easyHotkey - jQuery Plugin
@description:	쉬운 단축키 사용.
@Revison 	:   1.0
@Date 		: 	2015-08-31
@Author		:   Hong, Kwang Pil 
@use		:	
	$('*[onclick]').easyHotkey();
*************************************************************************/
(function($) {
	$.fn.easyHotkey = function(options) 
	{
		var sKeys = {
			"CTRL" : 17, "ALT" : 18, "SHIFT" : 16,
			"ENTER" : 13,
			"SPACE" : 32,
			"TAB" : 9,
			"ESC" : 27,
			"BACKSPACE" : 8,
			"N_1": 49, "N_2": 50, "N_3": 51, "N_4": 52, "N_5": 53, "N_6": 54, "N_7": 55, "N_8": 55, "N_9": 56,
			"A":65, "B":66, "C":67, "D":68, "E":69
		};
		
		var option = $.extend({
			
			cssKey : "hotkey_disp",
			shape : "circle",
			bgColor : "#ff0000",
			fontColor : "#ffffff",
			size : "20px",
			side : "left",
			
			getDiameter : function() {
				return parseInt(this.size);
			},
			getRadius : function() {
				return parseInt(this.size) / 2;
			}
		}, options);

		// 단축키 등록 타겟 엘리먼트 반환 - 추후 기능 확장을 위해 함수로 만들어놓음.
		var $root = $(this);
		var $target = function() {
			return $root;
		};
		
		// CSS 생성/등록
		var createCSS = function() {
			var css = "<style>."+option.cssKey+" {" +
			"position:absolute;" +
			"font-weight:bolder;" +
			"font-size: " + parseInt(option.getDiameter() * 2 / 3) + "px;" +
			"color:"+option.fontColor+";" +
			"text-align:center;" +
			"line-height:"+option.size+";" +
			"height: "+option.size+";" +
			"width: "+option.size+";" +
			"background-color: "+option.bgColor+";" +
			"-webkit-border-radius: "+option.getRadius()+"px;" +
			"-moz-border-radius: "+option.getRadius()+"px;  " +
			"border-radius: "+option.getRadius()+"px;" +
			"}</style> ";
			
			$('head').append(css);
		};
		
		// 단축키 엘리먼트 생성
		var makeHotkey = function(e, text) {
			var obj = e.offset();
			var width = e.width();
			var left = '';
			
			switch(option.side) {
			case 'left':
				if(width < option.getDiameter()) {
					left = (obj.left-option.getDiameter())+'px';
				} else {
					left = (obj.left-option.getRadius())+'px';
				}
				break;
			case 'right':

				if(width < option.getDiameter()) {
					left = (obj.left+width+option.getDiameter())+'px';
				} else {
					left = (obj.left+width+option.getRadius())+'px';
				}
				break;
			}
			
			return $('<div>',{   
				"class": option.cssKey,
				css: {
					"top": (obj.top-option.getRadius())+'px',
					"left": left
				},
				text: text
			});
		};
		
		// 단축키 생성/등록
		var createHotkeys = function() {
			var $hotkeys = $('.'+option.cssKey); 
			if($hotkeys.length) {
				$hotkeys.show();
			}else {
				createCSS();
				$target().each(function(i) {
					$('body').append(makeHotkey($(this), String.fromCharCode(sKeys.A+i)));
				});  
			}
		};
		
		// 단축키 숨김
		var hideHotkeys = function() {
			$('.'+option.cssKey).hide();
		};

		// 단축키 제거
		var removeHotkeys = function() {
			var $hotkeys = $('.'+option.cssKey); 
			if($hotkeys.length) $hotkeys.remove();
		};
		
		// 키를 누를때
		$('body').keydown(function( event ) {
			if( event.ctrlKey && event.altKey ) {

				createHotkeys();
				
				var indexCode = event.keyCode - sKeys.A;
				
				if(indexCode >= 0 && indexCode < $('.'+option.cssKey).length) {
					$target().eq(indexCode).click();
					hideHotkeys();
				}
				
				clearEvent(event);
			} 
		});

		// 키가 눌렀다 떨어질 때
		$('body').keyup(function( event ) {
			if( event.ctrlKey || event.altKey ) {
				hideHotkeys();
			}
		});
		
		// 창 크기 변경시 기존 등록된 단축키 제거
		window.onresize = function() {
			removeHotkeys();
		}
	};
})(jQuery);
