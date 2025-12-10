import { ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";


export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;
    private empty: boolean = true;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        if (source == null){
        	throw new IllegalArgumentException("source must not be null or undefined");
        }
        this.name = source;
        this.empty = false;
        this.noComponents = this.splitStringName(this.name).length;
    }

    public asDataString(): string {
        return this.name;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.noComponents) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        let comps = this.splitStringName(this.name);
        let comp = comps[i];
        if (comp == null){
        	throw new InvalidStateException("Component must not be null or undefined");
        }
        return this.unescape(comp, this.delimiter);
    }

    public setComponent(i: number, c: string): Name {
		if (c == null){
	    	throw new IllegalArgumentException("Component must not be null or undefined");
	    }
		this.checkMaskingOfOneComponent(c);
        const clone = this.deepclone();
        if (i < 0 || i >= this.noComponents) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        
        let comps = clone.splitStringName(clone.name);
        comps[i] = c;
        clone.name = comps.join(clone.delimiter);
        let newComp = clone.getComponent(i);
        if (newComp == null || newComp !== c){
        	throw new MethodFailedException("setComponent failed");
        }
        return clone;
    }

    public insert(i: number, c: string): Name {
		if (c == null){
        	throw new IllegalArgumentException("Component must not be null or undefined");
        }
    	this.checkMaskingOfOneComponent(c);
        if (i < 0 || i >= this.noComponents) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        const clone = this.deepclone();
        let comps = clone.splitStringName(clone.name);
        comps.splice(i, 0, clone.escape(c, clone.delimiter));
        clone.name = comps.join(clone.delimiter);
        let newComp = clone.getComponent(i);
        if (newComp == null || newComp !== c){
        	throw new MethodFailedException("insert failed");
        } 
        clone.noComponents++;
        if (clone.getNoComponents() !== comps.length){
        	throw new MethodFailedException("insert failed")
        }
        clone.empty = false;
        return clone;
    }

    public append(c: string): Name {
		if (c == null){
    		throw new IllegalArgumentException("Component must not be null or undefined");
    	}
	
    	this.checkMaskingOfOneComponent(c);
    	const clone = this.deepclone();
        let comps = clone.splitStringName(clone.name);
        comps.push(clone.escape(c, clone.delimiter));
        clone.name = comps.join(clone.delimiter);
        clone.noComponents++;
        clone.empty = false;
        let lastComp = clone.getComponent(clone.noComponents - 1);
        if (lastComp == null || lastComp !== c){
        	throw new MethodFailedException("append failed");
        }
        if (clone.noComponents !== comps.length){
        	throw new MethodFailedException("append failed");
        }
        return clone;
    }

    public remove(i: number): Name {
        if (i < 0 || i >= this.noComponents) {
            throw new IllegalArgumentException("Index out of bounds");
        }
        const clone = this.deepclone();
        let comps = clone.splitStringName(clone.name);
        comps.splice(i, 1);
        clone.name = comps.join(clone.delimiter);
        clone.noComponents--;
        if (clone.noComponents !== comps.length){
        	throw new MethodFailedException("remove failed");	
        }
        if (clone.noComponents == 0){
        	clone.empty = true;
        }
        return clone;
    }

	public concat(other: Name): Name {
		const concat = super.concat(other);
		this.empty = false;
        return concat;
	}

	public clone(): Name {
	    return new StringName(this.name, this.delimiter);
	}

    private deepclone(): StringName {
        let clone = structuredClone(this);
        Object.setPrototypeOf(clone, StringName.prototype);
        return clone;
    }

    private splitStringName(s: string): string[] {
        if (s === "") {
            return [];
        }

        let components: string[] = [];
        let currentComponent: string = "";

        for (let i = 0; i < s.length; ) {

            if (s[i] === ESCAPE_CHARACTER && i + 1 < s.length && s[i + 1] === this.delimiter) {
                currentComponent += s[i];
                currentComponent += s[i+1];
                i += 2;
            } else if (s[i] === this.delimiter) {
                components.push(currentComponent);
                currentComponent = "";
                i++;
            } else {
                currentComponent += s[i];
                i++;
            }
        }
        components.push(currentComponent);
        return components;
    }

}
