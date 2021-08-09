class Node {
    /** @type {AudioNode} */
    #node;

    /** @param {AudioNode} node */
    constructor(node) {
        this.#node = node;
    }

    /** @param {...AudioNode|Node} */
    add(/* args */) {
        for (const arg of arguments)
            arg.connect(this.#node);

        return this;
    }

    /** @param {...AudioNode|Node} */
    remove(/* args */) {
        for (const arg of arguments)
            arg.disconnect(this.#node);

        return this;
    }

    /** @param {AudioDestinationNode} dest */
    connect(dest) {
        this.#node.connect(dest);

        return this;
    }

    /** @param {AudioDestinationNode} dest */
    disconnect(dest) {
        this.#node.disconnect(dest);

        return this;
    }
}
