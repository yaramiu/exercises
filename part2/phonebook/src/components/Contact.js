const Contact = ({ name, number, buttonHandler, id }) => (
  <p>
    {name} {number}{" "}
    <button onClick={() => buttonHandler(name, id)}>delete</button>
  </p>
);

export default Contact;
