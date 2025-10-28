(function () {
    const body = document.body; //toggle class on body
    const gate = document.getElementById('letter-content');
    const letter = gate ? gate.querySelector('.letter-wrapper') : null;  //clickable letter container
    // const SKIP_KEY = 'letterOpened';  //tracks if it has been opened

    

    // hides gate and reveals site
    function closeGate() {
        if (!gate)     //stop if no gate found
            return;
        gate.classList.add('closing');  //css class

        setTimeout(() => {
            body.classList.remove('gate-active');  //site content will be visible
            gate.remove(); //remove from DOM                                   // Catch any errors (like if localStorage is disabled)
            }, 700);   //wait 0.7s(fade time)  
        }

    function attatchHandlers() { //will close with keyboard
        if (!gate)
            return;

        (letter || gate).addEventListener('click', closeGate);  //when click on letter closeGate() runs
        gate.setAttribute('tabindex', '0'); 
        gate.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {// If the user presses Enter or Spacebar
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