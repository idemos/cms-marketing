import SecureLs from 'secure-ls';

class MyStorage {

    constructor(normal,compress,type) {
        
        this.normal = normal;
        this.compress = compress;
        this.type = type;

        if(normal === true){
        	this.ls = LocalStorage;
        }else{
        	this.ls = new SecureLS({encodingType: type, isCompression: compress});
        }
        //encodingType: rc4,aes,Base64,Rabbit,DES
    }

    set(key,value){
    	
    	if(this.normal === true){
			this.ls[key] = JSON.stringify(value);
    	}else{
    		this.ls.set(key,value);
    	}
    }

    get(key){

    	if(this.normal === true){
			return JSON.parse(this.ls[key]);
    	}else{
			this.ls.get(key);
    	}
    }

}

export default (new MyStorage(false, true, 'Base64'));