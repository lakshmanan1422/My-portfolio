import * as THREE from "three";


// ========================================
// GSAP
// ========================================

gsap.registerPlugin(ScrollTrigger);


// ========================================
// THREE.JS
// ========================================

const canvas = document.querySelector("#webgl");

const scene = new THREE.Scene();


// CAMERA

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.z = 5;


// RENDERER

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


// ========================================
// PARTICLES
// ========================================

const particleCount = 1500;

const positions = new Float32Array(
    particleCount * 3
);

for (let i = 0; i < particleCount * 3; i++) {

    positions[i] =
        (Math.random() - 0.5) * 20;

}

const geometry =
    new THREE.BufferGeometry();

geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        positions,
        3
    )
);


const material =
    new THREE.PointsMaterial({

        color: 0xff0000,

        size: 0.025,

        transparent: true,

        opacity: 0.8

    });


const particles =
    new THREE.Points(
        geometry,
        material
    );

scene.add(particles);


// ========================================
// RED GLOW SPHERE
// ========================================

const sphereGeometry =
    new THREE.SphereGeometry(
        1.5,
        64,
        64
    );


const sphereMaterial =
    new THREE.MeshBasicMaterial({

        color: 0x660000,

        wireframe: true,

        transparent: true,

        opacity: 0.3

    });


const sphere =
    new THREE.Mesh(
        sphereGeometry,
        sphereMaterial
    );

sphere.position.z = -3;

scene.add(sphere);


// ========================================
// MOUSE
// ========================================

let mouseX = 0;
let mouseY = 0;

window.addEventListener(
    "mousemove",
    (event) => {

        mouseX =
            (event.clientX /
                window.innerWidth -
                0.5);

        mouseY =
            (event.clientY /
                window.innerHeight -
                0.5);

    }
);


// ========================================
// ANIMATION LOOP
// ========================================

function animate() {

    requestAnimationFrame(
        animate
    );


    particles.rotation.y += 0.0005;

    particles.rotation.x += 0.0002;


    sphere.rotation.x += 0.001;

    sphere.rotation.y += 0.002;


    camera.position.x +=
        (mouseX * 0.5 -
            camera.position.x) * 0.03;

    camera.position.y +=
        (-mouseY * 0.5 -
            camera.position.y) * 0.03;


    renderer.render(
        scene,
        camera
    );

}

animate();


// ========================================
// RESIZE
// ========================================

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);


// ========================================
// HERO ANIMATION
// ========================================

const heroTimeline =
    gsap.timeline();


heroTimeline
    .from(".eyebrow", {

        opacity: 0,

        y: 30,

        duration: 1

    })

    .from(".hero h1", {

        opacity: 0,

        scale: 1.5,

        duration: 1.5,

        ease: "power4.out"

    })

    .from(".hero-bottom", {

        opacity: 0,

        y: 40,

        duration: 1

    });


// ========================================
// ABOUT ANIMATION
// ========================================

gsap.from(
    ".about h2",
    {

        scrollTrigger: {

            trigger: ".about",

            start: "top 70%"

        },

        opacity: 0,

        y: 100,

        duration: 1.2

    }
);


// ========================================
// SKILLS ANIMATION
// ========================================

gsap.from(
    ".skill",
    {

        scrollTrigger: {

            trigger: ".skills-grid",

            start: "top 75%"

        },

        opacity: 0,

        y: 80,

        stagger: 0.1,

        duration: 0.8

    }
);


// ========================================
// PROJECT ANIMATION
// ========================================

gsap.from(
    ".project",
    {

        scrollTrigger: {

            trigger: ".project-list",

            start: "top 75%"

        },

        opacity: 0,

        x: -100,

        stagger: 0.2,

        duration: 1

    }
);


// ========================================
// TIMELINE ANIMATION
// ========================================

gsap.from(
    ".timeline div",
    {

        scrollTrigger: {

            trigger: ".timeline",

            start: "top 75%"

        },

        opacity: 0,

        x: -80,

        stagger: 0.2,

        duration: 0.8

    }
);


// ========================================
// THREE.JS SCROLL EFFECT
// ========================================

window.addEventListener(
    "scroll",
    () => {

        const scroll =
            window.scrollY /
            document.body.scrollHeight;

        particles.rotation.z =
            scroll * Math.PI * 2;

        sphere.rotation.z =
            scroll * Math.PI;

    }
);