// Global variables for health, energy, stress, average lifespan, age, and health reduction interval
let health = 100;
let energy = 0;
let stress = 0;
let avgLifeSpan = 0;
let age = 0;
let healthReductionInterval;
let lastSpawnTime = 0; // Track the last spawn time
const spawnCooldown = 20000; // Cooldown period in milliseconds (20 seconds)


let npcFishList = [];


// Fish stats with unique attributes, average lifespan, and speed
const fishOptions = {
    Trout: { health: 100, energy: 50, stress: 10, avgLifeSpan: 4, speed: 5 },
    Salmon: { health: 120, energy: 40, stress: 20, avgLifeSpan: 5, speed: 6 },
    Catfish: { health: 110, energy: 60, stress: 15, avgLifeSpan: 8, speed: 4 },
    Bass: { health: 90, energy: 70, stress: 25, avgLifeSpan: 15, speed: 7 },
    Carp: { health: 130, energy: 30, stress: 5, avgLifeSpan: 17, speed: 3 },
};

function updateBreedingChance() {
    const breedingChanceElement = document.getElementById("breedingChance");
    
    if (breedingChanceElement) { // Check if the element exists
        const chance = spawnChance(); // Get the current breeding chance
        breedingChanceElement.innerText = `Breeding Chance: ${chance}%`; // Update the display
    }
}


// Function to calculate spawn chance
function spawnChance() {
    const baseChance = 10; // Base chance (in percent)
    const ageModifier = age * 2; // Age adds 2% per year
    const energyModifier = Math.floor(energy / 10); // 1% chance per 10 energy
    const stressModifier = Math.max(0, 10 - Math.floor(stress / 20)); // Stress reduces the chance by up to 10%

    return baseChance + ageModifier + energyModifier - stressModifier;
}

/* // Function to spawn a new NPC fish
function spawnNewFish() {
    const currentTime = Date.now(); // Get current time
    if (currentTime - lastSpawnTime < spawnCooldown) {
        return; // If cooldown hasn't passed, exit
    }

    const shouldSpawn = Math.random() * 100 < spawnChance(); // Determine if a new fish should spawn
    if (shouldSpawn) {
        const newNpcFish = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * (window.innerHeight / 2), // Start position
            width: 40,
            height: 20,
            speed: 2,
            direction: "down", // Initial direction
        };

        npcFishList.push(newNpcFish); // Add the new fish to the NPC list
        changeNpcDirection(newNpcFish); // Start direction changes
        lastSpawnTime = currentTime; // Update the last spawn time
    }
}
 */


function createNpcFish() {
    return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * (window.innerHeight / 2),
        width: 40,
        height: 20,
        speed: 2,
        direction: "down",
        health: 100, // Ensure health is initialized
        energy: 50,
        stress: 30,
    };
}

// Create a new NPC fish and add it to the list

// Create NPC fish with a change direction function call
// Function to spawn a new fish with cooldown


function spawnNewFish() {
    const currentTime = Date.now(); // Get the current time
    if (currentTime - lastSpawnTime < spawnCooldown) {
        return; // If cooldown hasn't passed, exit the function
    }

    const spawn = Math.random() * 100 < spawnChance(); // Random spawn check
    if (spawn) {
        const npcFish = createNpcFish();

        const newFish = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * (window.innerHeight / 2),
            width: 40,
            height: 20,
            speed: 2,
            direction: "down", // Initial direction
        };


        npcFishList.push(npcFish); // Add the new fish to the NPC list
        //alert("A new fish has spawned!");
        changeNpcDirection(npcFish);
        lastSpawnTime = currentTime; // Update the last spawn time
    }
}


// Function to check if two fish have collided
function fishCollision(fish1, fish2) {
    return (
        fish1.x < fish2.x + fish2.width &&
        fish1.x + fish1.width > fish2.x &&
        fish1.y < fish2.y + fish2.height &&
        fish1.y + fish1.height > fish2.y
    );
}

// Function to select a fish and start the game
function selectFish(fishName) {
    const selectedFish = fishOptions[fishName];

    health = selectedFish.health;
    energy = selectedFish.energy;
    stress = selectedFish.stress;
    avgLifeSpan = selectedFish.avgLifeSpan;
    age = 0;



    fish.speed = selectedFish.speed; // Set the fish speed to the selected fish's speed

    // Initialize food properties
    food = {
        x: Math.random() * window.innerWidth,
        y: 0,
        speed: 3,
        width: 10,
        height: 10,
    };

    // Update displayed stats
    document.getElementById("health").innerText = health;
    document.getElementById("energy").innerText = energy;
    document.getElementById("stress").innerText = stress;
    document.getElementById("avgLifeSpan").innerText = avgLifeSpan;
    document.getElementById("age").innerText = age;
    document.getElementById("speed").innerText = fish.speed; // This should fix the error
    updateBreedingChance();


    document.getElementById("fishSelection").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    // Start the game loop
    requestAnimationFrame(gameLoop);
}

// Resize the canvas to fit the screen
function resizeCanvas() {
    const canvas = document.getElementById("gameCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initialize canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Fish properties
let fish = {
    x: window.innerWidth / 2,
    y: window.innerHeight - 30,
    width: 40,
    height: 20,
    speed: 0, // Default speed; set by selected fish
};



npcFishList.forEach((npcFish) => {
    moveNpcFish(npcFish); // Move each NPC fish
});

document.getElementById("speed").innerText = speed;
function changeNpcDirection(npcFish) {
    if (!npcFish) return; // Avoid undefined errors

    const directions = ["left", "right", "up", "down"];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)]; // Random new direction
    const randomDelay = Math.random() * 500 + 1500; // Random delay between 1 and 4 seconds

    // Schedule a direction change after the delay
    setTimeout(() => {
        npcFish.direction = randomDirection; // Assign the new direction
        changeNpcDirection(npcFish); // Schedule the next direction change
    }, randomDelay); // Use the random delay
}


let npcFish = {
    x: Math.random() * window.innerWidth,
    y: Math.random() * (window.innerHeight / 2),
    width: 40,
    height: 20,
    speed: 2,
    direction: "down",
    health: 100, // Ensure health is initialized
    energy: 50,
    stress: 30,
};

// Add to the NPC fish list
npcFishList.push(npcFish);
changeNpcDirection(npcFish);

// Add NPC's attributes (similar to fishOptions)
const npcFishAttributes = {
    health: 100,
    energy: 50,
    stress: 30,
};

// Function to control NPC fish movement
// Function to move NPC fish based on the current direction
// Function to move each NPC fish
function moveNpcFish(npcFish) {
    if (!npcFish || typeof npcFish.direction === 'undefined') {
        return; // If npcFish is undefined, exit early
    }

    switch (npcFish.direction) {
        case "left":
            npcFish.x -= npcFish.speed;
            break;
        case "right":
            npcFish.x += npcFish.speed;
            break;
        case "up":
            npcFish.y -= npcFish.speed;
            break;
        case "down":
            npcFish.y += npcFish.speed;
            break;
    }

    // Keep NPC within canvas bounds
    npcFish.x = Math.max(0, Math.min(npcFish.x, canvas.width - npcFish.width));
    npcFish.y = Math.max(0, Math.min(npcFish.y, canvas.height - npcFish.height));
}
// Movement controls
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;

// Event listeners for keyboard controls
document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
        leftPressed = true;
    }
    if (e.code === "ArrowRight") {
        rightPressed = true;
    }
    if (e.code === "ArrowUp") {
        upPressed = true;
    }
    if (e.code === "ArrowDown") {
        downPressed = true;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft") {
        leftPressed = false;
    }
    if (e.code === "ArrowRight") {
        rightPressed = false;
    }
    if (e.code === "ArrowUp") {
        upPressed = false;
    }
    if (e.code === "ArrowDown") {
        downPressed = false;
    }
});

function npcFoodCollision(npcFish, food) {
    if (
        npcFish.x < food.x + food.width &&
        npcFish.x + npcFish.width > food.x &&
        npcFish.y < food.y + food.height &&
        npcFish.y + npcFish.height > food.y
    ) {
        const isMicroplastic = Math.random() < 0.5; // 20% chance of microplastic

        if (isMicroplastic) {
            npcFish.health -= 50; // Decrease health by 100 (or desired amount)
            npcFish.energy -= 10; // Decrease energy
            npcFish.stress += 15; // Increase stress
            console.log("Fish ate microplastic and health is now", npcFish.health);
        } else {
            npcFish.health += 5; // Non-microplastic food increases health
            npcFish.energy += 10; // Increase energy
            npcFish.stress -= 10; // Decrease stress
            fish.energy -= 5;
            fish.health -= 5;
            console.log("Fish ate food");
        }

        if (npcFish.health <= 0 || npcFish.stress >= 100) {
            // Ensure health is not below zero and remove fish if it dies
            const index = npcFishList.indexOf(npcFish);
            if (index > -1) {
                npcFishList.splice(index, 1); // Remove from the list
                console.log("Fish died");
                if (npcFishList.length < 1) {
                    alert("Game over, all other fish are dead"); // Signal game over
                    return; // Optionally, exit the function to end the game loop
                }
            }
        }


        resetFood(); // Reset food after collision
    }
}


// Decrease NPC health if the food reaches the bottom of the screen
function checkFoodTouchingBottom(food) {
    if (food.y > canvas.height) { // If food touches the bottom
        npcFishList.forEach((npcFish) => {
            npcFish.health -= 10; // Decrease health by 10
        });

        resetFood(); // Reset the food position
    }
}

// If one fish eats food, apply a health penalty to the other fish
function applyHealthPenalty(food) {
    let foodEaten = false;

    npcFishList.forEach((npcFish) => {
        if (
            npcFish.x < food.x + food.width &&
            npcFish.x + npcFish.width > food.x &&
            npcFish.y < food.y + food.height &&
            npcFish.y + npcFish.height > food.y
        ) {
            foodEaten = true; // This fish ate the food
            npcFoodCollision(npcFish, food); // Handle food collision logic
        }
    });

    if (foodEaten) {
        npcFishList.forEach((npcFish) => {
            if (foodEaten) {
                npcFish.health -= 5; // Apply a health penalty to other NPCs
                console.log("Health penalty applied to NPC");
            }
        });

        resetFood(); // Reset the food position
    }
}



// Game loop
function gameLoop() {
    resizeCanvas(); // Ensure the canvas is resized
    var globHealthCap = health;
    //console.log(globHealthCap);
    moveNpcFish();


    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Horizontal movement
    if (leftPressed) {
        fish.x -= fish.speed; // Move based on fish speed
    }
    if (rightPressed) {
        fish.x += fish.speed; // Move based on fish speed
    }

    // Vertical movement
    if (upPressed) {
        fish.y -= fish.speed; // Move based on fish speed
    }
    if (downPressed) {
        fish.y += fish.speed; // Move based on fish speed
    }

    ctx.fillStyle = '#c2b280'; 

    // Define the sand layer's height
    const sandHeight = 40;
    
    // Draw the sand layer at the bottom, covering the entire width
    ctx.fillRect(0, canvas.height - sandHeight, canvas.width, sandHeight);

    ctx.fillStyle = "blue"; // Color for the fish
    ctx.fillRect(fish.x, fish.y, fish.width, fish.height); // Draw the fish
    ctx.fillStyle = "orange";
    ctx.fillRect(npcFish.x, npcFish.y, npcFish.width,  npcFish.height); // Draw the fish



    ctx.fillStyle = "green"; // Color for the food
    ctx.fillRect(200, canvas.height - sandHeight - 305, 15, sandHeight + 300);
    ctx.fillRect(350, canvas.height - sandHeight - 70, 8, sandHeight + 50);
    ctx.fillRect(1000, canvas.height - sandHeight - 160, 10, sandHeight + 150);

    // Move NPC fish and check collisions
    ctx.fillStyle = "orange"; // Color for NPCs
    npcFishList.forEach((npcFish) => {
        moveNpcFish(npcFish); // Ensure each NPC moves
        ctx.fillRect(npcFish.x, npcFish.y, npcFish.width, npcFish.height); // Draw each NPC fish

        if (fishCollision(fish, npcFish)) {
            spawnNewFish(); // Spawn a new fish based on chance and cooldown

        }
             // Check if NPC fish collide with food
        if (npcFoodCollision(npcFish, food)) {
                food.x = Math.random() * window.innerWidth; // Reset food position
                food.y = 0; // Reset food y-coordinate
       
        }
        
    });
   
    

    // Keep fish within canvas bounds
    fish.x = Math.max(0, Math.min(fish.x, canvas.width - fish.width));
    fish.y = Math.max(0, Math.min(fish.y, canvas.height - fish.height));

    // Move the food downward
    food.y += food.speed;



    // Reset the food position if it reaches the bottom
    if (food.y > canvas.height) {
        resetFood();
        health -= 10; // Reduce health
        stress += 5;
        energy -= 5;
        
    }

    // Check if the food is touching the fish (collision)
    if (
        food.y + food.height >= fish.y &&
        food.x + food.width >= fish.x &&
        food.x <= fish.x + fish.width &&
        food.y <= fish.y + fish.height
    ) {
        if (Math.random() < 0.3) { // 30% chance of microplastic
            health -= 10;
            energy -= 10;
            stress += 10;
        } else {
            health += 5;
                

            energy += 10;

            if (energy >= 100) {
                age += 1; // Increase age when energy is full
                energy = 0;
            }

            if(energy < 0){
                energy = 0;
            }



            stress -= 5; // Reduce stress
            if (stress < 0) {
                stress = 0;
            }
        }

        resetFood(); // Reset the food position after being eaten
    }








    ctx.fillStyle = "green"; // Color for the food
    ctx.fillRect(food.x, food.y, food.width, food.height); // Draw the food

    ctx.fillRect(30, canvas.height - sandHeight - 220, 20, sandHeight + 200);

    ctx.fillRect(700, canvas.height - sandHeight - 160, 10, sandHeight + 150);

    ctx.fillRect(800, canvas.height - sandHeight - 110, 13, sandHeight + 90);








    // Update the displayed stats
    document.getElementById("health").innerText = health;
    document.getElementById("energy").innerText = energy;
    document.getElementById("stress").innerText = stress;
    document.getElementById("age").innerText = age;
    updateBreedingChance();


    if (health <= 0) {
        alert("You died"); // End the game
        return;
    }

    if (stress >= 100) {
        alert("You died from stress"); // End the game
        return;
    }

    requestAnimationFrame(gameLoop); // Continue the game loop
}

// Reset the food position
function resetFood() {
    food.x = Math.random() * window.innerWidth;
    food.y = 0; // Reset the food's y-coordinate
}


