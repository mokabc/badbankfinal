import React from "react";
import UserContext from "./user-context";
import Card from "./card";


function CreateAccount() {
  const [showForm, setShowForm] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function validateEmail(field, users) {
    const foundValue = users.find(user => user.email === field);
    if (foundValue !== undefined) {
      setStatus("Email already exists");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function regName(){
    const reqName = /^[a-zA-Z]+ [a-zA-Z]+$/
  if (reqName.test(name)){
    return true;
  }
  setStatus(`Name must be composed of firstname and lastname`);
  setTimeout(() => setStatus(""), 3000);
  return false;
  }
  
  function emailFormula() {
   const reqFormula = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
  if (reqFormula.test(email)){
    return true;
  }
  setStatus(`Email must be valid address`);
  setTimeout(() => setStatus(""), 3000);
  return false;
  }
  
    function passwordEffective() {
      const minEffective = 10;
      if (password.length >= minEffective) {
          return true;
      }
      setStatus(`Password must contain ${minEffective} characters or more`);
      setTimeout(() => setStatus(""), 3000);
      return false;
  }
    

  function handleCreate() {
    let usersLocal = [];
    if (ctx.users !== undefined) {
      usersLocal = ctx.users;
    }
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validateEmail(email, usersLocal)) return;
    if (!validate(password, "password")) return;
    if (!regName()) return;
    if (!emailFormula()) return;
    if (!passwordEffective()) return;

    usersLocal.push({ name, email, password, balance: 0 });
    ctx.users = usersLocal;
    setShowForm(false);
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShowForm(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        showForm ? (
          <>
            Name
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <br />
            Email address
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleCreate}
            >
              Create Account
            </button>
          </>
        ) : (
            <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>
                Add another account
            </button>
            </>
          )
      }
    />
  );
}

export default CreateAccount;

