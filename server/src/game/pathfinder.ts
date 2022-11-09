export class Node {
    public distanceFromStart = 0;
    public distanceFromEnd = 0;
    public weigth = 0;
    public parent: Node;

    constructor(
        public readonly row: number,
        public readonly col: number,
        public readonly walkable: boolean) {
        this.parent = this;
    }
}

export type Graph = Node[][];

export function getGraph(tiles: any): Graph {
    return tiles.reduce((graph: Graph, tile: any) => {
        if (!graph[tile.pos.x]) {
            graph[tile.pos.x] = [];
        }
        graph[tile.pos.x][tile.pos.y] = new Node(tile.pos.x, tile.pos.y, tile.walkable);
        return graph;
    }, []);
}

export class PathFinder {
    private static openList: Node[] = [];
    private static closeList: Node[] = [];

    public static findPath(graph: Graph, startNode: Node, endNode: Node) {
        const NODE_DISTANCE_VALUE = 100;
        this.openList = [];
        this.closeList = [];

        const finalPath: Node[] = [];
        let currentNode: Node | undefined = this.getCurrentNode();

        this.addToOpenList(startNode);
        while (this.openList.length) {
            currentNode = this.getCurrentNode();
            if (!currentNode || currentNode === endNode) {
                break;
            }
            this.addToCloseList(currentNode);

            const neighbours = this.getNeighbours(graph, currentNode);
            for (const node of neighbours) {
                if (this.closeList.includes(node) || !node.walkable) {
                    continue;
                }
                const distanceFromStart = node.parent.distanceFromStart + NODE_DISTANCE_VALUE;
                const distanceFromEnd = (Math.abs(endNode.row - node.row) + Math.abs(endNode.col - node.col)) * NODE_DISTANCE_VALUE;
                const weigth = distanceFromStart + distanceFromEnd;

                if (!this.openList.includes(node) || weigth < node.weigth) {
                    node.distanceFromStart = distanceFromStart;
                    node.distanceFromEnd = distanceFromEnd;
                    node.weigth = weigth;
                    node.parent = currentNode;
                    if (!this.openList.includes(node)) {
                        this.addToOpenList(node);
                    }
                }
            }
        }

        while (currentNode !== startNode) {
            finalPath.unshift(currentNode!);
            currentNode = currentNode!.parent;
        }
        return finalPath;
    }

    private static removeFromOpenList(node: Node) {
        const index = this.openList.indexOf(node);
        if (index >= 0) {
            return this.openList.splice(index, 1);
        }
    }

    private static removeFromCloseList(node: Node) {
        const index = this.closeList.indexOf(node);
        if (index >= 0) {
            return this.closeList.splice(index, 1);
        }
    }

    private static addToOpenList(node: Node) {
        this.removeFromCloseList(node);
        this.openList.push(node);
    }

    private static addToCloseList(node: Node) {
        this.removeFromOpenList(node);
        this.closeList.push(node);
    }

    private static getCurrentNode(): Node | undefined {
        return this.openList.reduce((prev: Node | undefined, curr: Node) => {
            return prev?.weigth || Infinity < curr.weigth ? prev: curr
        }, undefined);
    }

    private static getNeighbours(graph: Graph, node: Node): Node[] {
        const neighbours: Node[] = [];
        if (node.row > 0) {
            neighbours.push(graph[node.row - 1][node.col]);
        }
        if (node.row + 1 < graph.length) {
            neighbours.push(graph[node.row + 1][node.col]);
        }
        if (node.col > 0) {
            neighbours.push(graph[node.row][node.col - 1]);
        }
        if (node.col + 1 < graph[0].length) {
            neighbours.push(graph[node.row][node.col + 1]);
        }
        return neighbours;
    }
}