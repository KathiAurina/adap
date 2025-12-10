import { describe, it, expect, beforeEach } from "vitest";

import { Name } from "../../../src/adap-b06/names/Name";
import { StringName } from "../../../src/adap-b06/names/StringName";
import { StringArrayName } from "../../../src/adap-b06/names/StringArrayName";

import { IllegalArgumentException } from "../../../src/adap-b06/common/IllegalArgumentException";
import { InvalidStateException } from "../../../src/adap-b06/common/InvalidStateException";
import { MethodFailedException } from "../../../src/adap-b06/common/MethodFailedException";


describe("StringArrayName Tests", () => {
	let n: Name;
	beforeEach(() => {
		n = new StringArrayName(["oss", "fau", "de"]);
	}); 

	it("constructor with null", () => {
		expect(() => new StringArrayName(["oss", null] as any)).toThrow(IllegalArgumentException);
	});
	
	it("constructor with undefined", () => {
		expect(() => new StringArrayName(["oss", undefined] as any)).toThrow(IllegalArgumentException);
	});
	
	it("constructor with valid expressions", () => {
		expect(n.getNoComponents()).toBe(3);
		expect(n.asString(".")).toBe("oss.fau.de");
	});
	
	it("clone", () => {
		let clone = n.clone() as Name;
		expect(clone.getNoComponents()).toBe(3);
		expect(clone.asString(".")).toBe("oss.fau.de");
		expect(clone).not.toBe(n);
		expect(clone).toEqual(n);
	});
	
	it("asString with delimiter null", () => {
		expect(() => n.asString(null as any)).toThrow(IllegalArgumentException);
	});
	
	it("asString with valid expressions", () => {
		expect(n.asString("#")).toBe("oss#fau#de");
	});
	
	it.each([
		{method: 'getComponent', action: () => n.getComponent(-1) },
		{method: 'setComponent', action: () => n.setComponent(-1, "cs") },
		{method: 'insert', action: () => n.insert(-1, "cs") },
		{method: 'remove', action: () => n.remove(-1) }
	])("negative Index should throw IllegalArgumentException", ({ action }) => {		
		expect(action).toThrow(IllegalArgumentException);
	});
	
	it.each([
			{method: 'getComponent', action: () => n.getComponent(5) },
			{method: 'setComponent', action: () => n.setComponent(5, "cs") },
			{method: 'insert', action: () => n.insert(5, "cs") },
			{method: 'remove', action: () => n.remove(5) }
		])("too high Index should throw IllegalArgumentException", ({ action }) => {		
			expect(action).toThrow(IllegalArgumentException);
	});
	
	it("manipulation methods with null component should throw IAE", () => {
	    expect(() => n.insert(0, null as any)).toThrow(IllegalArgumentException);
	    expect(() => n.setComponent(0, null as any)).toThrow(IllegalArgumentException);
	    expect(() => n.append(null as any)).toThrow(IllegalArgumentException);
	});
	
	it("manipulation methods with undefined component should throw IAE", () => {
	    expect(() => n.insert(0, undefined as any)).toThrow(IllegalArgumentException);
	    expect(() => n.setComponent(0, undefined as any)).toThrow(IllegalArgumentException);
	    expect(() => n.append(undefined as any)).toThrow(IllegalArgumentException);
    });	

	it("getComponent with valid expressions", () => {
        const newN0 = n.getComponent(0) ;
        const newN1 = n.getComponent(1) ;
        const newN2 = n.getComponent(2) ;
		expect(newN0).toBe("oss");
		expect(newN1).toBe("fau");
		expect(newN2).toBe("de");
	});
	
	it("setComponent with valid expressions", () => {
		const newN = n.setComponent(0, "cs");
		expect(newN.asString(".")).toBe("cs.fau.de");
	});

	it("insert with valid expressions", () => {
		const newN = n.insert(1, "cs");
		expect(newN.asString(".")).toBe("oss.cs.fau.de");
	});

	it("remove with valid expressions", () => {
		const newN = n.remove(1);
		expect(newN.asString(".")).toBe("oss.de");
	});

	it("append with valid expressions", () => {
		const newN = n.append("xyz");
		expect(newN.asString(".")).toBe("oss.fau.de.xyz");
	});

});

describe("StringName Tests", () => {
	let n: Name;
	beforeEach(() => {
		n = new StringName("oss.fau.de");
	}); 

	it("constructor with null", () => {
		expect(() => new StringName(null as any)).toThrow(IllegalArgumentException);
	});
	
	it("constructor with undefined", () => {
		expect(() => new StringName(undefined as any)).toThrow(IllegalArgumentException);
	});
	
	it("constructor with valid expressions", () => {
		expect(n.getNoComponents()).toBe(3);
		expect(n.asDataString()).toBe("oss.fau.de");
		expect(n.isEmpty()).toBe(false);
	});
	
	it("clone", () => {
		let clone = n.clone() as Name;
		expect(clone.getNoComponents()).toBe(3);
		expect(clone.asDataString()).toBe("oss.fau.de");
		expect(clone).not.toBe(n);
		expect(clone).toEqual(n);
	});
		
	it.each([
		{method: 'getComponent', action: () => n.getComponent(-1) },
		{method: 'setComponent', action: () => n.setComponent(-1, "cs") },
		{method: 'insert', action: () => n.insert(-1, "cs") },
		{method: 'remove', action: () => n.remove(-1) }
	])("negative Index should throw IllegalArgumentException", ({ action }) => {		
		expect(action).toThrow(IllegalArgumentException);
	});
	
	it.each([
			{method: 'getComponent', action: () => n.getComponent(5) },
			{method: 'setComponent', action: () => n.setComponent(5, "cs") },
			{method: 'insert', action: () => n.insert(5, "cs") },
			{method: 'remove', action: () => n.remove(5) }
		])("too high Index should throw IllegalArgumentException", ({ action }) => {		
			expect(action).toThrow(IllegalArgumentException);
	});
	
	it("manipulation methods with null component should throw IAE", () => {
	    expect(() => n.insert(0, null as any)).toThrow(IllegalArgumentException);
	    expect(() => n.setComponent(0, null as any)).toThrow(IllegalArgumentException);
	    expect(() => n.append(null as any)).toThrow(IllegalArgumentException);
	});
	
	it("manipulation methods with undefined component should throw IAE", () => {
	    expect(() => n.insert(0, undefined as any)).toThrow(IllegalArgumentException);
	    expect(() => n.setComponent(0, undefined as any)).toThrow(IllegalArgumentException);
	    expect(() => n.append(undefined as any)).toThrow(IllegalArgumentException);
    });	

	it("getComponent with valid expressions", () => {
        const newN0 = n.getComponent(0) ;
        const newN1 = n.getComponent(1) ;
        const newN2 = n.getComponent(2) ;
		expect(newN0).toBe("oss");
		expect(newN1).toBe("fau");
		expect(newN2).toBe("de");
	});
	
	it("setComponent with valid expressions", () => {
		const newN = n.setComponent(0, "cs");
		expect(newN.asDataString()).toBe("cs.fau.de");
	});

	it("insert with valid expressions", () => {
		const newN = n.insert(1, "cs");
		expect(newN.asDataString()).toBe("oss.cs.fau.de");
	});

	it("remove with valid expressions", () => {
		const newN1 = n.remove(1);
		expect(newN1.asDataString()).toBe("oss.de");
		const newN2 = newN1.remove(1);
		expect(newN2.asDataString()).toBe("oss");
		const newN3 = newN2.remove(0);
		expect(newN3.asDataString()).toBe("");
		expect(newN3.isEmpty()).toBe(true);
	});

	it("append with valid expressions", () => {
		const newN = n.append("xyz");
		expect(newN.asDataString()).toBe("oss.fau.de.xyz");
	});

	it("escape, delimiter, masking", () => {
		const newN = n.append("cs.cip");
		expect(newN.getNoComponents()).toBe(4);
		expect(newN.getComponent(3)).toBe("cs.cip");
		expect(newN.asDataString()).toBe("oss.fau.de.cs\\.cip");
	});


}); 

describe("Shared Methods from AbstractName Tests", () => {
    
    it("isEqual", () => {
        const n1 = new StringArrayName(["oss", "fau", "de"]);
        const n2 = new StringArrayName(["oss", "fau", "de"]);
        const n3 = new StringArrayName(["oss", "other"]);

        expect(n1.isEqual(n2)).toBe(true);
        expect(n1.isEqual(n3)).toBe(false);
        expect(n1.getHashCode()).toBe(n2.getHashCode());
        expect(n1.getHashCode()).not.toBe(n3.getHashCode());
    });

    it("concat", () => {
        const n1 = new StringArrayName(["oss"]);
        const n2 = new StringArrayName(["fau", "de"]);

        const result = n1.concat(n2);
        expect(result.asString(".")).toBe("oss.fau.de");
        expect(n1.asString(".")).toBe("oss");
    });

    it("getHashCode", () => {
        const n1 = new StringArrayName(["oss", "fau", "de"]);
		const n2 = new StringName("oss.fau.de");
		
		const hashA = n1.getHashCode();
		const hashB = n1.getHashCode();

        expect(hashA).toBe(hashB); 
		expect(n2.getHashCode()).toBe(n1.getHashCode());        
    });
    
});
