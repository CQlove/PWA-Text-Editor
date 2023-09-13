const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    // waittng for the even triggered later
    window.deferredPrompt = event;
    // remove hidden class in button 
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    // if no event
    if (!promptEvent) {
        return;
    }
    // if prompt exist, show prompt
    promptEvent.prompt();
    // deferred prompt can be called once ,then reset variable
    window.deferredPrompt = null;
    // let button hid again
    butInstall.classList.toggle('hidden', true);
});


window.addEventListener('appinstalled', (event) => { window.deferredPrompt = null; });
