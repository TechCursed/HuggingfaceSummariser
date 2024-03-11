let inputData = "";
let summarised = "";

//FUNCTION EXECUTION AFTER TEXT IS SUBMITTED 

document.getElementById("submitButton").addEventListener("click", async () => {
    const textInput = document.getElementById("textInput").value;
    inputData = textInput;

    // IF INPUT TEXT IS NOT EMPTY
    if (textInput.trim() !== "") {
        try {

            // LOADER UNTIL THE DATA IS BEING FETCHED
            const loadingMessage = document.createElement("p");
            loadingMessage.textContent = "Loading...";
          
            document.body.appendChild(loadingMessage);
            const response = await query({ inputs: textInput });
            console.log(JSON.stringify(response));

            summarised = JSON.stringify(response);
           let trimmedText = JSON.parse(summarised)[0].summary_text.trim();
          
            const h4 = document.createElement("h4");
            h4.textContent = trimmedText;

            //REMOVING THE LOADER TEXT AFTER GETTING THE RESPONSE
            document.body.removeChild(loadingMessage);

            // DISPLAYING THE RESPONSE ON THE HTML
            document.body.appendChild(h4);
        } catch (error) {
            console.error("Error:", error.message);
        }
    } else {
        console.log("Please enter some text");
    }
});

//FUNCTION FOR THE SUMMARISATION

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
            headers: { Authorization: "Bearer accesstokenhere" },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}
