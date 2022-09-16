export default function Heading({ text, addSub = true }) {
  return (
    <>
      <h1 className="main-heading">
        {text}
        <sub>
          <small style={{ fontSize: "10" }} hidden={!addSub}>
            By clockwatch
          </small>
        </sub>
      </h1>
      <hr />
    </>
  );
}
