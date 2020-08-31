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
const mailRoute = [
    "A's House", "Cabin", "A's House",
    "B's House", "Town Hall", "D's House",
    "E's House", "G's House", "Shop",
    "G's House", "Farm", "Marketplace",
    "Post Office"
]
// Creating class
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

function randomPick(array){
    let choice = Math.floor(Math.random()*array.length);
}

function randomRobot(state){
    return{direction: randomPick(roadGraph[state.place])};
}

function routeRobot(state,memory){
    if(memory.length == 0){
        memory = mailRoute;
    }
    return{direction: memory[0],memory: memory.slice(1)};
}

function runRobot(state,robot,memory){
    for(let turn=0;;turn++){
        if(state.parcels.length == 0){
            console.log(`Done in $(turn) turns`);
            break;
        }
        let action = robot(state,memory);
        state = state.move(action,direction);
        memory = action.memory;
        console.log(`Move to $(action.direction)`);
    }
}

VillageState.random = function(parcelCount = 5){
    let parcels = [];
    for(let i=0;i<parcelCount;i++){
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do{
            place = randomPick(Object.keys(roadGraph));
        }while(place == address);
    }
    return new VillageState("Post Office",parcels);
}
const roadGraph = buildGraph(roads);



let first = new VillageState(
    "Post Office",
    [{place: "Post Office", address: "A's House"}]
);
runRobot(VillageState.random(),randomRobot);