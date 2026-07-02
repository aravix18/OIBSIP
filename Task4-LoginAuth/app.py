from flask import Flask, render_template, request, redirect, session

app = Flask(__name__)
app.secret_key = "cinema_vault_key"

accounts = {
    "admin@gmail.com": "Cinema123!",
    "karthi@gmail.com": "Meiyazhagan2024!"
}

@app.route("/")
def home():
    return redirect("/login")

@app.route("/login", methods=["GET", "POST"])
def login():
    msg = request.args.get("msg", "")
    if request.method == "POST":
        email = request.form["email"]
        pwd = request.form["password"]
        
        if email in accounts and accounts[email] == pwd:
            session["user"] = email
            return redirect("/dashboard")
        else:
            return render_template("login.html", failed=True, msg="")
            
    return render_template("login.html", failed=False, msg=msg)

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        email = request.form["email"]
        pwd = request.form["password"]
        
        if "@" not in email or "." not in email:
            return render_template("register.html", alert="Please enter a valid email address (e.g. name@gmail.com)")
        
        if email in accounts:
            return render_template("register.html", alert="This email is already registered!")
            
        has_letter = any(c.isalpha() for c in pwd)
        has_number = any(c.isdigit() for c in pwd)
        has_symbol = any(c in "!@#$%^&*(),.?\":{}|<>_-" for c in pwd)
        
        if not (has_letter and has_number and has_symbol):
            return render_template("register.html", alert="Registration failed. Password must be Strong.")
            
        accounts[email] = pwd
        return redirect("/login?msg=success")
        
    return render_template("register.html", alert="")

@app.route("/dashboard")
def dashboard():
    if "user" not in session:
        return redirect("/login")
    return render_template("dashboard.html", current_user=session["user"])

@app.route("/logout")
def logout():
    session.pop("user", None)
    return redirect("/login")

if __name__ == "__main__":
    app.run(debug=True)