import "./Footer.css";

function Footer(): JSX.Element {
  return (
    <div className="Footer">
      <p>Copyright - Daniel Zehavi © | {new Date().getFullYear()}</p>
    </div>
  );
}

export default Footer;
