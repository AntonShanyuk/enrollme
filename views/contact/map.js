function(doc){
	if(doc.type == 'contact'){
		var symbolKeys = doc.name.split(/[^A-Za-z0-9А-ЯЄIа-яєi]/gi);
		for(var i = 0; i< symbolKeys.length;i++){
			if(symbolKeys[i]){
				emit([symbolKeys[i], doc._id], doc);
			}
		}
		var nonSymbolKeys = doc.name.split(/[A-Za-z0-9А-ЯЄIа-яєi]/gi);
		for(var i = 0; i< nonSymbolKeys.length;i++){
			if(nonSymbolKeys[i]){
				emit([nonSymbolKeys[i], doc._id], doc);
			}
		}
		
		emit([doc.name, doc._id], doc);
	}
}