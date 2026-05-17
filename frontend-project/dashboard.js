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
        console.log("Page loaded");
        console.log("TableBody:", document.getElementById("loanTableBody"));

        const loans = data.data || data;

        const tableBody = document.getElementById("loanTableBody");
        if (!tableBody) {
            console.error("loanTableBody not found!");
            return;
        }
        tableBody.innerHTML = ""; // clear old data

        loans.forEach(loan => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${loan.loanId || ""}</td>
                <td>${loan.loanName || ""}</td>
                <td>${loan.memberNumber || ""}</td>
                <td>${loan.loanAmount || ""}</td>
                <td>${loan.period || ""}</td>
                <td>${loan.loanStatus || ""}</td>
            `;

            tableBody.appendChild(row);
        });

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