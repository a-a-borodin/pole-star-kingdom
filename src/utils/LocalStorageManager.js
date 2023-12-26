class LocalStorageManager {
	static set(name,value){
		if(typeof value == "object"){
			localStorage.setItem(name,JSON.stringify(value));
		}else{
			localStorage.setItem(name,value);
		}
	}
	
	static change(name,value){		
		if(typeof value == "object"){
			localStorage[name] = JSON.stringify(value);
		}else{
			localStorage[name] = value;
		}
	}
	
	static get(name){
		if(localStorage.getItem(name) === null){
			return null;
		}else{
			if(typeof JSON.parse(localStorage[name]) == "object"){
				return JSON.parse(localStorage[name]);
			}else{
				if(typeof +localStorage.getItem(name) == "number"){
					return +localStorage[name];
				}else{
					return localStorage[name];
				}
			}
		}
	}
	
	static clear(){
	    localStorage.clear();
	}
}

export default LocalStorageManager;