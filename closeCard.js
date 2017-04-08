var clozeCard = function(text, cloze){

	this.text = text;
	this.cloze = cloze;
	this.parText = text.replace(cloze, "");
	this.parText2 = "..." + this.parText;
	this.clozeOnly = function(){
		console.log(cloze);
	};
	this.textOnly = function(){
		console.log(text);
	};
	this.partial = function(){

		if(this.parText === this.text){
			console.log("error");
		}else{
		// console.log(this.parText);

}

	}

}


module.exports = clozeCard;

