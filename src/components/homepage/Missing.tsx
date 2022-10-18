import React from "react";

export interface Props {
  message: string;
}

const Missing = ({ message }: Props) => {
  return (
    <main>
      <h1>{message}</h1>
    </main>
  );
};

export default Missing;
