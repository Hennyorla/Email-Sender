const form = document.getElementById("form");
const emailInput = document.getElementById("email-input");


const sendEmail = async(event) => {
    event.preventDefault();
    try{
        const email = emailInput.value;

        if (!email || email.trim().length === 0) {
            return alert("Please provide a valid email address");
        }

        const response = await fetch("http://localhost:3000/send-email",{
            method: "POST",
            headers: { "Content-Type": "application/json"},

            body: JSON.stringify({ email }),
        
        });

        const data = await response.json();

        console.log(data);

    } catch(error){
        console.log(error)

    }
};




form.addEventListener("submit", sendEmail);