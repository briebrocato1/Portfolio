(function () {
    const body = document.body; //toggle class on body
    const gate = document.getElementById('letter-content');
    const letterWrapper = gate ? gate.querySelector('.letter-wrapper') : null;  //clickable letter container
    const letterMessage = gate ? gate.querySelector('.letter-message') : null;
    const closeButton = gate ? gate.querySelector('.letter-close') : null;
    let isExpanded = false;
    

    

    // hides gate and reveals site
    function closeGate() {
        if (!gate)     //stop if no gate found
            return;

        isExpanded = false;
        gate.classList.remove('expanded');
        if (letterWrapper) 
            {
            letterWrapper.classList.remove('expanded');
            letterWrapper.setAttribute('role', 'button');
            letterWrapper.setAttribute('aria-haspopup', 'dialog');
            letterWrapper.setAttribute('aria-expanded', 'false');
            letterWrapper.removeAttribute('aria-modal');
            letterWrapper.setAttribute('tabindex', '0');
            }
        if (letterMessage) 
            {
            letterMessage.setAttribute('aria-hidden', 'true');
            }
        gate.classList.add('closing');  //css class

        setTimeout(() => {
            body.classList.remove('gate-active');  //site content will be visible
            gate.remove(); //remove from DOM                                   // Catch any errors (like if localStorage is disabled)
            }, 700);   //wait 0.7s(fade time)  
        }

    function expandLetter() {
        if (!gate || !letterWrapper || isExpanded)
            return;

        isExpanded = true;
        gate.classList.add('expanded');
        letterWrapper.classList.add('expanded');
        letterWrapper.setAttribute('role', 'dialog');
        letterWrapper.setAttribute('aria-modal', 'true');
        letterWrapper.setAttribute('aria-expanded', 'true');
        letterWrapper.removeAttribute('aria-haspopup');
        letterWrapper.setAttribute('tabindex', '-1');
        if (letterMessage) 
            {
            letterMessage.setAttribute('aria-hidden', 'false');
            }

        // focus close button for accessibility
        if (closeButton) 
            {
            setTimeout(() => closeButton.focus(), 50);
            }
        }


    function attatchHandlers() { //will close with keyboard
        if (!gate)
            return;

        if (letterWrapper) 
            {
            letterWrapper.addEventListener('click', (event) => {
                if (isExpanded)
                    return;
                event.preventDefault();
                expandLetter();
            });
            }

        if (closeButton) 
            {
            closeButton.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                closeGate();
            });
            }

        gate.setAttribute('tabindex', '0');

        gate.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') 
                {// If the user presses Enter or Spacebar
                e.preventDefault();
                if (!isExpanded) 
                    {
                    expandLetter();
                    } 
                else 
                    {
                    closeGate();
                    }
                }

            if (e.key === 'Escape' && isExpanded) {
                e.preventDefault();
                closeGate();
                }
                
            });
        }

    // runs when page loads
    function init() 
        {
        body.classList.add('gate-active');

        attatchHandlers();
        } 

    // run init when DOM is ready
    if (document.readyState === 'loading')
        {
         document.addEventListener('DOMContentLoaded', init);   
        }
    else 
        {
        init();
        }    
    
}
)();