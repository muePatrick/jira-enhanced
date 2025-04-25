// ==UserScript==
// @name         Jira Enhanced
// @description  Some small - maybe niche - enhancements for Jira
// @author       muepatrick.dev
// @namespace    https://muepatrick.dev/
// @version      1.2
// @match        https://*.atlassian.net/jira/software/*
// @grant        none
// ==/UserScript==

// -- CONFIGURATION --
const config = {
    // Unlock the width of dialogs (e.g. ticket preview).
    // Useful on widescreen monitors and tickets with a lot of content.
    unlockDialogWidth: true,

    // Add a new button above the "Completed Issues" table in the "Status Report"
    // section of the "Sprint Report" page. When clicked the links to all the
    // completed tickets are copied to the clipboard as a link list which can
    // be pasted into Confluence pages, etc. (Confluence might need an unformatted
    // paste Ctrl-Shift-V, to not automatically format the linklist)
    addCopyLinkListButton: true,
}
// -- CONFIGURATION --


function waitForElement(querySelector) {
    return new Promise(resolve => {
        const element = document.querySelector(querySelector);
        if (element) return resolve(element);

        const observer = new MutationObserver(() => {
            const element = document.querySelector(querySelector);
            if (element) {
                observer.disconnect();
                resolve(element);
            }
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })
    })
}

function unlockDialogWidth() {
    let observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type == 'childList') {
                let sections = document.querySelectorAll('section[role="dialog"]');
                for (let i = 0; i < sections.length; i++) {
                    sections[i].style.width = '100%';
                }
            }
        }
    });
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
}

function addCopyLinkListButton() {
    const tableQuery = 'table[aria-label="Completed Issues"'
    waitForElement(tableQuery).then(e => {
        const handleClick = async () => {
            event.preventDefault();
            const linkElems = [...document.querySelector(tableQuery)?.querySelectorAll('a')];
            if (!linkElems?.length) return;
            const linkList = linkElems.map(a => {
                const href = a.getAttribute("href");
                if (!href) return '';
                return `${document.location.protocol}//${document.location.host}${href}`
            });
            await navigator.clipboard.writeText(linkList.join('\n'));
            document.getElementById('copy-button').textContent = '✅ Links copied!';

        }

        var button = document.createElement('button');
        button.id = 'copy-button';
        button.textContent = '🔗 Copy tickets as linklist';
        button.onclick = handleClick;
        document.querySelector(tableQuery).insertAdjacentElement('beforebegin', button);
    })
}

(async function() {
    'use strict';
    console.log('Jira Enhanced Script loaded')

    config.unlockDialogWidth && unlockDialogWidth();
    config.addCopyLinkListButton && addCopyLinkListButton();
})()
