/* =========================
   SCROLL REVEAL
========================= */

const reveals = document.querySelectorAll(".reveal");


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.15
    }
);


reveals.forEach((element) => {

    observer.observe(element);

});



/* =========================
   NUMBER COUNTER
========================= */

const counters = document.querySelectorAll("[data-target]");

let counterStarted = false;


function startCounters() {

    if (counterStarted)
        return;

    counterStarted = true;


    counters.forEach((counter) => {

        const target =
            Number(counter.dataset.target);

        let current = 0;


        const increment =
            target / 100;


        function updateCounter() {

            current += increment;


            if (current < target) {

                counter.innerText =
                    Math.floor(current).toLocaleString() + "+";

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText =
                    target.toLocaleString() + "+";

            }

        }


        updateCounter();

    });

}


/* Start counter when stats section appears */

const statsSection =
    document.querySelector(".stats");


const statsObserver =
    new IntersectionObserver(

        (entries) => {

            if (entries[0].isIntersecting) {

                startCounters();

            }

        },

        {
            threshold: .3
        }

    );


statsObserver.observe(statsSection);



/* =========================
   BEFORE / AFTER SLIDER
========================= */

const comparison =
    document.querySelector(".comparison");


const afterContainer =
    document.querySelector(".after-container");


const comparisonLine =
    document.querySelector(".comparison-line");


const comparisonButton =
    document.querySelector(".comparison-button");


let dragging = false;


function updateComparison(x) {

    const rect =
        comparison.getBoundingClientRect();


    let percentage =
        ((x - rect.left) / rect.width) * 100;


    percentage =
        Math.max(0, Math.min(100, percentage));


    afterContainer.style.width =
        (100 - percentage) + "%";


    comparisonLine.style.left =
        percentage + "%";


    comparisonButton.style.left =
        percentage + "%";

}


/* Mouse */

comparison.addEventListener(
    "mousedown",
    () => {

        dragging = true;

    }
);


document.addEventListener(
    "mouseup",
    () => {

        dragging = false;

    }
);


document.addEventListener(
    "mousemove",
    (event) => {

        if (!dragging)
            return;

        updateComparison(event.clientX);

    }
);


/* Touch */

comparison.addEventListener(
    "touchstart",
    () => {

        dragging = true;

    }
);


document.addEventListener(
    "touchend",
    () => {

        dragging = false;

    }
);


document.addEventListener(
    "touchmove",
    (event) => {

        if (!dragging)
            return;

        updateComparison(
            event.touches[0].clientX
        );

    }
);