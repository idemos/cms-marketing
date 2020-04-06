import * as SecureLS from 'secure-ls';

class MyStorage {

    constructor(normal,compress,type) {
        
        this.normal = normal;
        this.compress = compress;
        this.type = type;

        if(normal === true){
        	//this.ls = LocalStorage;
        }else{
        	this.ls = new SecureLS({encodingType: type, isCompression: compress});
        }
        //encodingType: rc4,aes,Base64,Rabbit,DES
    }

    set(key,value){
    	
    	if(this.normal === true){
			try{
				localStorage.setItem(key, JSON.stringify(value));
				//localStorage[key] = JSON.stringify(value);
			}catch(error){
				console.error('catch',error);
			}
    	}else{
    		this.ls.set(key,value);
    	}
    }

    get(key){

    	if(this.normal === true){
			return JSON.parse(localStorage.getItem(key));

			//return (localStorage[key]!=''? JSON.parse(localStorage[key]) : '');
    	}else{
			return this.ls.get(key);
    	}
    }

	unset(key){

		if(this.normal === true){
	    	localStorage.removeItem(key);
	    }else{
			this.ls.removeAll();
    	}
	}
}

export default (new MyStorage(false, false, 'Base64'));