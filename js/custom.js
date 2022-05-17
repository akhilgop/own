// ---------------------------------------------------------------------Navbar------------------------------------------------------------------
const showAnim = gsap.from('.nb', {
    yPercent: -100,
    paused: true,
    duration: 0.2
}).progress(1);

ScrollTrigger.create({
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse()
    }
});


//---------------------------------------------------------------------Animate on Scroll------------------------------------------------------------------
function animateFrom(elem, direction) {
    'use strict';
    direction = direction || 1;
    var x = 0,
        y = direction * 100;
    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(elem, { x: x, y: y, autoAlpha: 0 }, {
        duration: 1.25,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "expo",
        overwrite: "auto"
    });
}

function hide(elem) {
    gsap.set(elem, { autoAlpha: 0 });
}

document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".gs_reveal").forEach(function (elem) {
        hide(elem); // assure that the element is hidden when scrolled into view

        ScrollTrigger.create({
            trigger: elem,
            onEnter: function () { animateFrom(elem) },
            onEnterBack: function () { animateFrom(elem, -1) },
            onLeave: function () { hide(elem) } // assure that the element is hidden when scrolled into view
        });
    });
});


// ---------------------------------------------------------------------Image Reveal---------------------------------------------------------------
gsap.registerPlugin(ScrollTrigger);

let revealContainers = document.querySelectorAll(".reveal");

revealContainers.forEach((container) => {
    let image = container.querySelector("img");
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            toggleActions: "restart none none reset"
        }
    });

    tl.set(container, { autoAlpha: 1 });
    tl.from(container, 1.5, {
        xPercent: -100,
        ease: Power2.out
    });
    tl.from(image, 1.5, {
        xPercent: 100,
        scale: 1.3,
        delay: -1.5,
        ease: Power2.out
    });
});

// ---------------------------------------------------------------------Cursor------------------------------------------------------------------
const updateProperties = (elem, state) => {
    elem.style.setProperty('--x', `${state.x}px`)
    elem.style.setProperty('--y', `${state.y}px`)
    elem.style.setProperty('--width', `${state.width}px`)
    elem.style.setProperty('--height', `${state.height}px`)
    elem.style.setProperty('--radius', state.radius)
    elem.style.setProperty('--scale', state.scale)
}

document.querySelectorAll('.cursor').forEach(cursor => {
    let onElement

    const createState = e => {
        const defaultState = {
            x: e.clientX,
            y: e.clientY,
            width: 40,
            height: 40,
            radius: '50%'
        }

        const computedState = {}

        if (onElement != null) {
            const { top, left, width, height } = onElement.getBoundingClientRect()
            const radius = window.getComputedStyle(onElement).borderTopLeftRadius

            computedState.x = left + width / 2
            computedState.y = top + height / 2
            computedState.width = width
            computedState.height = height
            computedState.radius = radius
        }

        return {
            ...defaultState,
            ...computedState
        }
    }

    document.addEventListener('mousemove', e => {
        const state = createState(e)
        updateProperties(cursor, state)
    })

    // document.querySelectorAll('a, button').forEach(elem => {
    //     elem.addEventListener('mouseenter', () => (onElement = elem))
    //     elem.addEventListener('mouseleave', () => (onElement = undefined))
    // })
})

// ---------------------------------------------------------------------Locomotive Scroll--------------------------------------------------------------
window.addEventListener("load", function () {
    gsap.registerPlugin(ScrollTrigger);

    const pageContainer = document.querySelector(".scroll-wrapper");
    pageContainer.setAttribute("data-scroll-container", "");

    const scroller = new LocomotiveScroll({
        el: pageContainer,
        smooth: false,
        getDirection: true,
        getSpeed: 1
    });


    scroller.on("scroll", function (t) {
        document.documentElement.setAttribute("data-direction", t.direction);
    });

    scroller.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(pageContainer, {
        scrollTop(value) {
            return arguments.length ?
                scroller.scrollTo(value, 0, 0) :
                scroller.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                left: 0,
                top: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };

        },
        pinType: pageContainer.style.transform ? "transform" : "fixed"
    });


    // Pinning and horizontal scrolling

    let horizontalSections = document.querySelectorAll(".horizontal-scroll");

    horizontalSections.forEach(horizontalSection => {
        let pinWrap = horizontalSection.querySelector(".pin-wrap");
        let pinWrapWidth = pinWrap.offsetWidth;
        let horizontalScrollLength = pinWrapWidth - window.innerWidth;
        gsap.to(pinWrap, {
            scrollTrigger: {
                scroller: "[data-scroll-container]",
                scrub: true,
                trigger: horizontalSection,
                pin: true,
                start: "top top",
                end: () => `+=${pinWrapWidth}`,
                invalidateOnRefresh: true
            },

            x: -horizontalScrollLength,
            ease: "none"
        });

    });

    /* COLOR CHANGER */

    const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
    scrollColorElems.forEach((colorSection, i) => {
        const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
        const prevText = i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;

        ScrollTrigger.create({
            trigger: colorSection,
            scroller: "[data-scroll-container]",
            start: "top 50%",
            onEnter: () =>
                gsap.to("body", {
                    backgroundColor: colorSection.dataset.bgcolor,
                    color: colorSection.dataset.textcolor,
                    overwrite: "auto"
                }),

            onLeaveBack: () =>
                gsap.to("body", {
                    backgroundColor: prevBg,
                    color: prevText,
                    overwrite: "auto"
                })
        });


    });

    ScrollTrigger.addEventListener("refresh", () => scroller.update());

    ScrollTrigger.refresh();
});