const output = document.getElementById("output");

let token = "";

// LOGIN
document.getElementById("loginBtn").addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://127.0.0.1:8080/loan-mgt/api/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        console.log("Login response:", data); // 🔍 DEBUG

        if (data.status === 0) {
            const token = data.data;  // ✔ correct field
            localStorage.setItem("token", token);

            alert("Login successful!");
             // ✅ Redirect to dashboard
        window.location.href = "dashboard.html";
        } else {
            alert("Login failed: " + data.message);
        }

    } catch (error) {
        console.error(error);
       alert("Network or server error");
    }
});

// GET request
document.getElementById("loadBtn").addEventListener("click", async () => {
    try {
        
        const token = localStorage.getItem("token");
        console.log("Token being retrieved:", token);
        const response = await fetch("http://127.0.0.1:8080/loan-mgt/api/loan", {
        
            method: "GET",
            headers: {
                "memberToken":token   // 👈 important
            }
        });

        const data = await response.json();
        document.getElementById("output").textContent =
            JSON.stringify(data, null, 2);

    } catch (error) {
        console.error(error);
    }
});

// POST request
document.addEventListener("DOMContentLoaded", () => {
document.getElementById("apply").addEventListener("click", async () => {
    try {
      
        const action = "new";
        const loanId = document.getElementById("loanId").value;
        const loanName = document.getElementById("loanName").value;
        const memberNumber = document.getElementById("memberNumber").value;
        const loanStatus ="NEW";
        const loanAmount = document.getElementById("loanAmount").value;
        const period = document.getElementById("period").value;
    
        const token = localStorage.getItem("token");
        console.log("Token being retrieved:", token);

        const response = await fetch("http://localhost:8080/loan-mgt/api/loan", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                 "memberToken":token
            },
            body: JSON.stringify({
                action, loanId,loanName,memberNumber,loanStatus,loanAmount,period
            })
        });

         const data = await response.json();
        console.log("loan application response:", data);
        if (data.status === 0) {
                    alert(data.message);
        } else {
            alert("application failed: " + data.message);
        }

    } catch (error) {
        console.error(error);
        output.textContent = "Error sending data";
    }
});
});