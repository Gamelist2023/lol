// modify this to change the total delay of all the clicking
const delay = 5;
// artificial slowing of the delay (in ms) to because Quizlet's timer starts late sometimes
const delayEpsilon = 10;

// a little function to allow the program to click on elements
function clickEvent(element) {
    let eve = new CustomEvent("pointerdown", { bubbles: true });
    element.dispatchEvent(eve);
}

function getTerms() {
    // eslint-disable-next-line no-undef
    let rawTerms = Quizlet.matchModeData.terms;
    let terms = {};
    for (const term of rawTerms) {
        terms[term.word] = term.definition;
    }
    return terms
}

// only works if 1 solve per load (which is true rn)
let solving = false;

// try to run on load or click
function solveMatch(terms) {
    // get all the nodes (and convert to array)
    let nodes = document.querySelector(".MatchModeQuestionGridBoard-tiles")?.childNodes;
    if (!nodes) {
        return;
    }
    // prevent multiple execution
    if (solving) {
        return;
    }
    solving = true;
    nodes = Array.from(nodes);
    const perElementDelay = ((delay * 1000) / nodes.length) + delayEpsilon;
    for (let i = 0, len = nodes.length; i < len; i += 1) {
        const node = nodes[i];
        // get term
        let search = node.firstChild?.firstChild?.firstChild?.firstChild?.innerHTML;
        // match with definition
        let dictionaryResult = terms[search];
        if (dictionaryResult) {
            // find term in nodes and send click events
            const targetNode = nodes.find((node) => node.innerHTML.includes(dictionaryResult));
            if (targetNode !== undefined) {
                setTimeout(() => {
                    clickEvent(node.firstChild);
                    clickEvent(targetNode.firstChild);
                }, perElementDelay * i);
            }
        }
    }
}


const terms = getTerms();

solveMatch(terms);
// probably really slow but who cares
let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (!mutation.addedNodes) {
            return;
        }
        solveMatch(terms);
    })
});

// tbd whether this is smart or just really dumb
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
});