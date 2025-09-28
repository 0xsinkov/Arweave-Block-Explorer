// Minimal Arweave Block Explorer - Performance Optimized
let scene, camera, renderer;
let monolith;
let blockCount = 0;

// Wait for THREE.js to load
function waitForTHREE() {
    if (typeof THREE !== 'undefined') {
        setup();
    } else {
        console.log('Waiting for THREE.js to load...');
        setTimeout(waitForTHREE, 100);
    }
}

// Initialize Three.js scene
function setup() {
    console.log('Initializing minimal scene...');
    
    try {
        // Scene setup
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);
        
        // Camera setup
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 50);
        
        // Renderer setup
        renderer = new THREE.WebGLRenderer({ antialias: false }); // Disable antialiasing for performance
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = false; // Disable shadows for performance
        
        const container = document.getElementById('three-container');
        if (container) {
            container.appendChild(renderer.domElement);
        }
        
        // Create monolith container
        monolith = new THREE.Group();
        scene.add(monolith);
        
        // Add basic lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);
        
        // Add basic controls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        
        console.log('Scene initialized successfully');
        
        // Update status immediately
        const statusElement = document.getElementById('latest-data');
        if (statusElement) {
            statusElement.innerHTML = 'Initializing 3D scene...';
        }
        
        // Add a single test block immediately
        addSingleTestBlock();
        
        // Start animation loop
        animate();
        
    } catch (error) {
        console.error('Error initializing scene:', error);
        const statusElement = document.getElementById('latest-data');
        if (statusElement) {
            statusElement.innerHTML = 'Error initializing 3D scene';
        }
    }
}

function addSingleTestBlock() {
    console.log('Adding single test block...');
    
    try {
        // Create a simple cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        
        cube.position.set(0, 0, 0);
        cube.userData = {
            blockHeight: 1343541,
            transactions: [{
                id: 'test-tx-1',
                data_size: 1000,
                tags: { 'Content-Type': 'text/plain' }
            }]
        };
        
        monolith.add(cube);
        blockCount = 1;
        
        // Update status message immediately
        const statusElement = document.getElementById('latest-data');
        if (statusElement) {
            statusElement.innerHTML = 'Minimal 3D Explorer - Test block loaded successfully';
        }
        console.log('Test block added successfully');
        
    } catch (error) {
        console.error('Error adding test block:', error);
        document.getElementById('latest-data').innerHTML = 'Error loading test block';
    }
}

function animate() {
    try {
        // Simple rotation animation
        if (monolith) {
            monolith.rotation.y += 0.005;
        }
        
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    } catch (error) {
        console.error('Animation error:', error);
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// Initialize when page loads
window.addEventListener('load', waitForTHREE);

console.log('Minimal sketch loaded');
