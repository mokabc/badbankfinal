import React from "react";
import Card from "./card";

function Home() {
  return (
    <Card
    bgcolor="danger"
    txtcolor="white"
    header="Get 100$ upon creating an account"
    title="Welcome to the bank, where all your data is shared with everyone"
    body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />
  );
}

export default Home;
