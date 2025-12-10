import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";


export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        if (source == null) {
	        throw new IllegalArgumentException("source must not be null or undefined");
	    }
        this.components = source.map(c => {
        	if (c == null) {
                throw new IllegalArgumentException("Component must not be null or undefined");
            }
        	return this.unescape(c, this.delimiter);
        });
    }


    public asString(delimiter: string = this.delimiter): string {
		if (delimiter == null || delimiter.length != 1){
			throw new IllegalArgumentException("Delimiter must be a single character");
		}
        return this.components.join(delimiter);
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
 		if (i < 0 || i >= this.components.length) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        let comp = this.components[i];
        if (comp == null){
        	throw new InvalidStateException("Component must not be null or undefined");
        }
        return comp;	   
    }

    public setComponent(i: number, c: string): Name {
		if (c == null){
        	throw new IllegalArgumentException("Component must not be null or undefined");
        }
    	this.checkMaskingOfOneComponent(c);
        const clone = this.deepclone();
    	c = clone.unescape(c, clone.delimiter);
    	if (i < 0 || i >= this.components.length) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        
        clone.components[i] = c;
        if (clone.components[i] == undefined || clone.components[i] !== c){
        	throw new MethodFailedException("setComponent failed");
        }
        return clone;
    }

    public insert(i: number, c: string): Name {
		if (c == null){
        	throw new IllegalArgumentException("Component must not be null or undefined");
        }
    	this.checkMaskingOfOneComponent(c);
        const clone = this.deepclone();
    	c = clone.unescape(c, this.delimiter);
    	let length = clone.getNoComponents();
        if (i < 0 || i >= length) {
        	throw new IllegalArgumentException("Index out of bounds");
        }
        
        clone.components.splice(i, 0, c);
        if (clone.components[i] == null || clone.components[i] == undefined
        || clone.components[i] !== c || clone.getNoComponents() !== length + 1){
        	throw new MethodFailedException("insert failed");
        }
        return clone;
    }

    public append(c: string): Name {
		if (c == null){
    		throw new IllegalArgumentException("Component must not be null or undefined");
    	}
    	this.checkMaskingOfOneComponent(c);
        const clone = this.deepclone();
    	c = clone.unescape(c, this.delimiter);
    	let length = this.getNoComponents();
    	
        clone.components.push(c);
        if(clone.components[length] == null
        || clone.components[length] == undefined
        || clone.components[length] !== c
        || clone.getNoComponents() !== length + 1){
        	throw new MethodFailedException("append failed");
        }
        return clone;
    }

    public remove(i: number): Name {
    	let length = this.getNoComponents();
        if (i < 0 || i >= this.components.length) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        const clone = this.deepclone();
        clone.components.splice(i, 1);
        if (clone.getNoComponents() !== length - 1){
        	throw new MethodFailedException("remove failed");
        }
        return clone;
    }

    public clone(): Name {
        let clone = Object.create(StringArrayName.prototype);
        clone.delimiter = this.delimiter;
        clone.components = [...this.components]; 
        return clone;
    }

    private deepclone(): StringArrayName {
        let clone = structuredClone(this);
        Object.setPrototypeOf(clone, StringArrayName.prototype);
        return clone;
    }

}
