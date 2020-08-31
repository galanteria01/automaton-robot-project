// District Anonymous
const roads = [
    "A's House-B's House" , "A's House-Cabin",
    "A's House-Post Office" , "B's House-Town Hall",
    "D's House-E's House" , "D's House-Town Hall",
    "E's House-G's House" , "G's House-Farm",
    "G's House-Shop" , "Marketplace-Farm",
    "Marketplace-Post Office" , "Marketplace-Shop",
    "Marketplace-Town Hall" , "Shop-Town Hall"
]



// To Create the graph
function buildGraph(edges){
    let graph = Object.create(null);
    function addEdge(from,to){
        if(graph[from] == null){
            graph[from] = [to];
        }else{
            graph[from].push(to);
        }
    }
    for(let [from,to] of edges.map(r => r.split("-"))){
        addEdge(from,to);
        addEdge(to,from);
    }
    return graph;
}
const roadGraph = buildGraph(roads);

class VillageState{
    constructor(place,parcels){
        this.place = place;
        this.parcels = parcels;
    }

    move(destination){
        if(!roadGraph[this.place].includes(destination)){
            return this;
        }else{
            let parcels = this.parcels.map(p => {
                if(p.place != this.place) return p;
                return {place: destination,address: p.address};

            }).filter(p => p.place != p.address);
            return new VillageState(destination,parcels);
        }
    }
}

let first = new VillageState(
    "Post Office",
    [{place: "Post Office", address: "A's House"}]
);
let next = first.move("A's House");

console.log(first.parcels);
console.log(next.parcels)