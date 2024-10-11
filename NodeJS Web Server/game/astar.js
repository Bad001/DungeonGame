// A* Algorithm for Pathfinding based on game rules

// Node class to represent each cell in the grid
class Node {
    constructor(x, y, g, h, f, parent = null) {
        this.x = x; // x coordinate
        this.y = y; // y coordinate
        this.g = g; // cost from start to current node
        this.h = h; // heuristic cost to goal
        this.f = f; // total cost
        this.parent = parent; // parent node for path tracing
    }
}

// Heuristic function (Diagonal distance)
function heuristic(a, b) {
    const dx = Math.abs(a.x - b.x);
    const dy = Math.abs(a.y - b.y);
    return Math.max(dx, dy); // Chebyshev distance for diagonal movement
}

// Movement costs
const MOVEMENT_COSTS = {
    diagonal: 3,
    straight: 2
};

// Function to determine if a cell is walkable
function isWalkable(cell) {
    return cell === 0; // Adjust based on your representation of walkable cells
}

// Helper function to find an adjacent accessible cell
function findAdjacentAccessibleCell(grid, goal) {
    const neighbors = [
        [goal[0] - 1, goal[1]], // left
        [goal[0] + 1, goal[1]], // right
        [goal[0], goal[1] - 1], // up
        [goal[0], goal[1] + 1], // down
        [goal[0] - 1, goal[1] - 1], // top-left
        [goal[0] + 1, goal[1] - 1], // top-right
        [goal[0] - 1, goal[1] + 1], // bottom-left
        [goal[0] + 1, goal[1] + 1]  // bottom-right
    ];

    for (const [nx, ny] of neighbors) {
        if (nx >= 0 && ny >= 0 && nx < grid.length && ny < grid[0].length && isWalkable(grid[nx][ny])) {
            return [nx, ny]; // Return the first accessible neighbor
        }
    }

    return null; // No accessible neighbor found
}

// A* Pathfinding Algorithm
function astar(grid, start, goal, maxMovementPoints) {
    const openSet = [];
    const closedSet = new Set();

    // Check if the goal is walkable; if not, find an adjacent accessible cell
    if (!isWalkable(grid[goal[0]][goal[1]])) {
        const newGoal = findAdjacentAccessibleCell(grid, goal);
        if (newGoal) {
            goal = newGoal; // Adjust the goal to the nearest accessible cell
        } else {
            return { path: [], totalMovementCost: 0 }; // If no accessible cell found, return empty
        }
    }

    const startNode = new Node(start[0], start[1], 0, heuristic(start, goal), 0);
    startNode.f = startNode.g + startNode.h;
    openSet.push(startNode);

    let totalMovementCost = 0; // Initialize total movement cost
    let closestPoint = null; // Track the closest reachable point
    let minDistanceToGoal = Infinity; // Initialize minimum distance to goal

    while (openSet.length > 0) {
        // Sort openSet by f value and get the node with the lowest f
        openSet.sort((a, b) => a.f - b.f);
        const current = openSet.shift();

        // Calculate the distance to the goal
        const distanceToGoal = heuristic(current, { x: goal[0], y: goal[1] });

        // Update closest point if current is closer to goal
        if (distanceToGoal < minDistanceToGoal) {
            minDistanceToGoal = distanceToGoal;
            closestPoint = current; // Track the closest point reached
        }

        // If we've reached the goal, reconstruct the path
        if (current.x === goal[0] && current.y === goal[1]) {
            const path = [];
            let temp = current;
            while (temp) {
                path.push([temp.x, temp.y]);
                temp = temp.parent;
            }
            path.reverse(); // Return reversed path

            // Calculate the total movement cost of the followed path
            for (let i = 0; i < path.length - 1; i++) {
                const [x1, y1] = path[i];
                const [x2, y2] = path[i + 1];

                // Determine if the movement is diagonal or straight
                if (Math.abs(x2 - x1) === 1 && Math.abs(y2 - y1) === 1) {
                    totalMovementCost += MOVEMENT_COSTS.diagonal; // Diagonal movement
                } else {
                    totalMovementCost += MOVEMENT_COSTS.straight; // Straight movement
                }
            }

            return { path: path, totalMovementCost }; // Return path and total movement cost
        }

        closedSet.add(`${current.x},${current.y}`);

        // Get neighbors (8 directions)
        const neighbors = [
            [current.x - 1, current.y], // left
            [current.x + 1, current.y], // right
            [current.x, current.y - 1], // up
            [current.x, current.y + 1], // down
            [current.x - 1, current.y - 1], // top-left
            [current.x + 1, current.y - 1], // top-right
            [current.x - 1, current.y + 1], // bottom-left
            [current.x + 1, current.y + 1]  // bottom-right
        ];

        for (const [nx, ny] of neighbors) {
            // Check bounds and if the node is walkable
            if (nx >= 0 && ny >= 0 && nx < grid.length && ny < grid[0].length && isWalkable(grid[nx][ny])) {
                const neighborKey = `${nx},${ny}`;
                if (closedSet.has(neighborKey)) continue; // Ignore already evaluated nodes

                // Determine the movement cost
                const gScore = current.g + ((Math.abs(nx - current.x) === 1 && Math.abs(ny - current.y) === 1) 
                    ? MOVEMENT_COSTS.diagonal 
                    : MOVEMENT_COSTS.straight);
                const hScore = heuristic({ x: nx, y: ny }, { x: goal[0], y: goal[1] });
                const fScore = gScore + hScore;

                // Check if the movement exceeds the maximum movement points
                if (gScore > maxMovementPoints) continue; // Ignore neighbors that exceed movement limit

                // Check if the neighbor is already in openSet
                const existingNode = openSet.find(node => node.x === nx && node.y === ny);
                if (!existingNode || fScore < existingNode.f) {
                    const newNode = new Node(nx, ny, gScore, hScore, fScore, current);
                    if (!existingNode) {
                        openSet.push(newNode);
                    } else {
                        existingNode.g = gScore;
                        existingNode.h = hScore;
                        existingNode.f = fScore;
                        existingNode.parent = current;
                    }
                }
            }
        }
    }

    // If the goal was not reached, return the closest point path
    if (closestPoint) {
        const path = [];
        let temp = closestPoint;
        while (temp) {
            path.push([temp.x, temp.y]);
            temp = temp.parent;
        }
        path.reverse(); // Return reversed path

        // Calculate the total movement cost for the path to the closest point
        for (let i = 0; i < path.length - 1; i++) {
            const [x1, y1] = path[i];
            const [x2, y2] = path[i + 1];

            // Determine if the movement is diagonal or straight
            if (Math.abs(x2 - x1) === 1 && Math.abs(y2 - y1) === 1) {
                totalMovementCost += MOVEMENT_COSTS.diagonal; // Diagonal movement
            } else {
                totalMovementCost += MOVEMENT_COSTS.straight; // Straight movement
            }
        }

        return { path: path, totalMovementCost }; // Return path and total movement cost to the closest point
    }

    return { path: [], totalMovementCost: 0 }; // Return empty path and 0 cost if no path is found
}

module.exports = { astar };
