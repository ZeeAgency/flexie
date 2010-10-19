/*
File: flexie.js

About: Version
	0.1 pre

Project: Flexie

Description:
	Legacy support for the CSS3 Flexible Box Model

*/

/*
Class: Flexie
	Scoped to the Flexie Global Namespace
*/
var Flexie = window.Flexie || (function() {
	var $self = this;
	
	$self.vars = {
		prefixes : " -o- -moz- -ms- -webkit- -khtml- ".split(" ")
	};
	
	$self.utils = {
		appendProperty : function(target, prop, value) {
			var prefixes = $self.vars.prefixes,
			    cssText = [];
			
			for (var i = 0, j = prefixes.length; i < j; i++) {
				cssText.push(prop + ":" + prefixes[i] + value);
			}
			
			target.style.cssText = cssText.join(";");
			return target;
		},
		
		applyBoxModel : function(target, children) {
			target.style.overflow = "hidden";
		},
		
		applyBoxOrient : function(target, children, orient) {
			switch (orient) {
				case "horizontal" :
				case "inline-axis" :
					
					for (var i = 0, j = children.length; i < j; i++) {
						var kid = children[i];
						kid.style.cssFloat = "left";
						kid.style.styleFloat = "left";
					}

				break;
				
				case "vertical" :
				case "block-axis":
				break;
			}
		},
		
		applyBoxAlign : function(target, children, align) {
			switch (align) {
				case "stretch" :
					
					for (var i = 0, j = children.length; i < j; i++) {
						var kid = children[i];
						kid.style.height = target.offsetHeight + "px";
					}

				break;
				
				case "start" :
				break;
				
				case "end" :
				break;
				
				case "center":
				break;
				
				case "baseline":
				break;
			}
		},
		
		applyBoxDirection : function(target, children, direction) {
			
		},
		
		applyBoxPack : function(target, children, pack) {
			
		},
		
		flexBoxSupported : function() {
			var dummy = document.createElement("div");
			this.appendProperty(dummy, "display", "box");
			return ((dummy.style.display).indexOf("box") !== -1) ? true : false;
		},
		
		boxModelRenderer : function(params) {
			var target = params.target,
			    nodes = target.childNodes,
			    children = [],
			    orient = params["box-orient"] || "horizontal",
			    align = params["box-align"] || "stretch",
			    direction = params["box-direction"] || "normal",
			    pack = params["box-pack"] || "start";
			
			for (var i = 0, j = nodes.length; i < j; i++) {
				if (nodes[i].nodeType === 1) {
					children.push(nodes[i]);
				}
			}
			
			this.applyBoxModel(target, children);
			this.applyBoxOrient(target, children, orient);
			this.applyBoxAlign(target, children, align);
			this.applyBoxDirection(target, children, direction);
			this.applyBoxPack(target, children, pack);
		}
	};
	
	$self.box = function(params) {
		var support = $self.utils.flexBoxSupported();
		
		if (!support) {
			$self.utils.boxModelRenderer(params);
		}
	};
	
	return $self;
})();
