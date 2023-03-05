const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()

    //store for later use + take out hidden class
    deferredPrompt = event
    butInstall.classList.toggle('hidden', false)
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if ('deferredPrompt' in window) {
        const promptEvent = window.deferredPrompt
        //Show prompt
        promptEvent.prompt()

        //prompt is a one time use. This resets deferred prompt
        window.deferredPrompt = null
        butInstall.classList.toggle('hidden', true)
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log("Installed!")

    window.deferredPrompt = null
});
