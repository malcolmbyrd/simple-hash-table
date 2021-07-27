window.onload = function WindowLoad(event) {
    const ht = new HashTable();

    console.log("Adding France - 111")
    ht.set("France", 111);
    console.log("Adding Spain - 150")
    ht.set("Spain", 150);
    console.log("Adding ǻ - 192")
    ht.set("ǻ", 192);

    console.log('__________________________')
    ht.display();
    console.log('--------------------------')

    console.log(`Hash table size: ${ht.size}`);
    console.log("Removing Spain")
    ht.remove("Spain");

    console.log('__________________________')
    ht.display();
    console.log('--------------------------')
}

class HashTable {
    constructor() {
        this.table = new Array(127)
        this.size = 0
    }

    _hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i)
        }
        return hash % this.table.length
    }

    set(key, value) {
        const index = this._hash(key)
        if (this.table[index]) {
            for (let i = 0; i < this.table[index].length; i++) {
                // Find key/value pair
                if (this.table[index][i][0] === key) {
                    this.table[index][i][1] = value
                    return
                }
            }
            // Not found, push new key/value pair
            this.table[index].push([key, value])
        }
        else {
            this.table[index] = []
            this.table[index].push([key, value])
        }
        this.size++
    }

    get(key) {
        const target = this._hash(key)
        if (this.table[target]) {
            for (let i = 0; i < this.table.length; i++) {
                if (this.table[target][i][0] === key) {
                    return this.table[target][i][1]
                }
            }
        }
        return undefined
    }

    remove(key) {
        const index = this._hash(key)

        if (this.table[index] && this.table[index].length) {
            for (let i = 0; i < this.table.length; i++) {
                if (this.table[index][i][0] === key) {
                    this.table[index].splice(i, 1)
                    this.size--
                    return true
                }
            }
        }
        else {
            return false
        }
    }

    display() {
        this.table.forEach((values, index) => {
            const chainedValues = values.map(
                ([key, value]) => `[ ${key}: ${value} ]`
            )
            console.log(`${index}: ${chainedValues}`)
        })
    }
}
